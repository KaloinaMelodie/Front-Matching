import { motion } from "framer-motion";
import { useState } from "react";
import DetailsMatch from "./DetailsMatch";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function MatchListOffers({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Les matchs</h2>
      <ul className="space-y-4">
        {items.map((it, idx) => (
          <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={it.candidat.id}
            className="p-4 bg-white shadow rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div>
              <p className="font-medium text-primary">
                {it.candidat.informations_personnelles.prenom}{" "}
                {it.candidat.informations_personnelles.nom}
              </p>
              <p className="text-sm text-gray-600">
                {it.candidat.adresse} — {it.candidat.email}
              </p>
            </div>
            <div>
              <p className="text-end m-2">{(it.score * 100).toFixed(2)}%</p>

              <button
                onClick={() => {
                  handleOpen();
                  setSelectedItem(it);
                }}
                variant="gradient"
                className="btn-primary self-start sm:self-auto"
              >
                Détails
              </button>
              {/* <button className="btn-secondary self-start sm:self-auto" onClick={()=>setSelectedItem(it)}>Details</button> */}
            </div>
          </motion.li>
        ))}
      </ul>
      {selectedItem && (
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className="justify-between">
            <p>Details</p>
            <p className=" text-end m-2">
              {(selectedItem.score * 100).toFixed(2)}%
            </p>
          </DialogHeader>
          <DialogBody className="overflow-y-auto max-h-[400px]">
            <DetailsMatch item={selectedItem} />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => {
                setSelectedItem(null);
                handleOpen();
              }}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
}
