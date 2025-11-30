import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Briefcase, Sparkles } from "lucide-react";
import OffersList from "../components/Offers/OffersList";

const bgURL =
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80";

export default function Home() {
  return (
    <>
      <section
        className="relative h-[90vh] w-full bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${bgURL})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

        <div className="relative z-10 text-center px-6 max-w-2xl space-y-8">
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles size={36} className="text-accent drop-shadow" />
            Find&nbsp;the&nbsp;perfect&nbsp;match
          </motion.h1>

          <motion.p
            className="text-lg text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Upload a CV or a job description &amp; watch the magic happen.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Link
              to="/candidate"
              className="btn-primary px-8 py-3 text-lg font-semibold shadow-lg shadow-black/30 inline-flex items-center gap-2"
            >
              <User size={20} /> I am a Candidate
            </Link>
            <Link
              to="/offer"
              className="btn-secondary px-8 py-3 text-lg font-semibold shadow-lg shadow-black/30 inline-flex items-center gap-2"
            >
              <Briefcase size={20} /> I am a Recruiter
            </Link>
          </motion.div>
        </div>
      </section>
      {/* <section className="mt-40">
        <OffersList/>
      </section> */}
    </>
  );
}
