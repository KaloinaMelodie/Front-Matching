import { motion } from "framer-motion";

export default function MatchList({ items, type, onOpen }) {
  if (!items?.length) return null;
  const isOffer = type === "offer";

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Matches</h2>
      <ul className="space-y-4">
        {items.map((it, idx) => (
          <motion.li
            key={it.id || idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 bg-white shadow rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div>
              <p className="font-medium text-primary">
                {isOffer ? it.title : it.fullName}{" "}
                {typeof it.score === "number" && (
                  <span className="ml-2 text-xs text-gray-500">
                    {(it.score * 100).toFixed(0)}%
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-600">
                {isOffer ? it.company : it.skills} — {it.location}
              </p>
            </div>

            <button
              className="btn-secondary self-start sm:self-auto"
              onClick={() => onOpen?.(it)}
            >
              Détails
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
