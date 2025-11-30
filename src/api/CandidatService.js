// src/api/http.js
const API_BASE_URL = import.meta.env.VITE_BACKEND_API
  || "https://back-talentmatch-2-596715584253.us-central1.run.app";

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export const fetchCandidats = async () => {
    try {
    const response = await fetch(`${API_BASE_URL}/api/candidats`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des candidats :", error);
    throw error;
  }
};

function mergeSignals(userSignal) {
  // Permettre d’injecter un signal et quand même gérer un timeout interne
  const ctrl = new AbortController();
  const sub = (s) => s?.addEventListener?.('abort', () => ctrl.abort(s.reason || 'aborted'), { once: true });
  sub(userSignal);
  return { controller: ctrl, signal: ctrl.signal };
}

async function parseMaybeJson(res) {
  const ct = res.headers.get('content-type') || '';
  try {
    return ct.includes('application/json') ? await res.json() : await res.text();
  } catch {
    return await res.text().catch(() => '');
  }
}

export async function safeFetch(
  url,
  opts = {},
  {
    timeoutMs = 180_000,       // 3 min par défaut
    retries = 0,
    retryDelayMs = 1200,
  } = {}
) {
  const { signal: userSignal, ...rest } = opts;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const { controller, signal } = mergeSignals(userSignal);
    const timer = setTimeout(() => controller.abort('timeout'), timeoutMs);

    try {
      const res = await fetch(url, { ...rest, signal });
      clearTimeout(timer);

      if (res.ok) return res;

      const body = await parseMaybeJson(res);
      const msg =
        (body && typeof body === 'object' && (body.detail || body.message)) ||
        (typeof body === 'string' && body) ||
        `HTTP ${res.status} ${res.statusText}`;

      throw new Error(msg);
    } catch (e) {
      clearTimeout(timer);
      // Abort → remonter sans retry
      if (e.name === 'AbortError' || e.message === 'AbortError') throw e;
      if (attempt === retries) throw e;
      await sleep(retryDelayMs);
    }
  }
}

// Helpers JSON/Form unifiés sur safeFetch
async function jsonFetch(path, { method = "GET", body, headers, signal, timeoutMs, retries } = {}) {
  const res = await safeFetch(
    `${API_BASE_URL}${path}`,
    {
      method,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...(headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal,
    },
    { timeoutMs, retries }
  );
  return parseMaybeJson(res);
}

async function formFetch(path, formData, { method = "POST", headers, signal, timeoutMs, retries } = {}) {
  const res = await safeFetch(
    `${API_BASE_URL}${path}`,
    {
      method,
      headers: {
        "Accept": "application/json",
        ...(headers || {}),
      },
      body: formData,
      signal,
    },
    { timeoutMs, retries }
  );
  return parseMaybeJson(res);
}

// Exports “haut niveau”
export const api = {
  createCandidate(payload, { signal, timeoutMs, retries } = {}) {
    return jsonFetch("/api/candidats", { method: "POST", body: payload, signal, timeoutMs, retries });
  },

  async matchByCv(candidat, { top = 20, signal, timeoutMs = 900_000, retries = 0 } = {}) {  
    return jsonFetch(`/api/matching/cv?top_n=${top}`, { method: "POST", body: candidat});
  },

  extractText(file, { signal, timeoutMs, retries } = {}) {
    const fd = new FormData();
    fd.append("file", file);
    return formFetch("/api/extract-text", fd, { method: "POST", signal, timeoutMs, retries });
  },

  extractStructured(payload, { signal, timeoutMs, retries } = {}) {
    return jsonFetch("/api/extract-structured", { method: "POST", body: payload, signal, timeoutMs, retries });
  },

  // exemple list
  async fetchCandidats({ signal, timeoutMs, retries } = {}) {
    return jsonFetch("/api/candidats", { method: "GET", signal, timeoutMs, retries });
  },
};
