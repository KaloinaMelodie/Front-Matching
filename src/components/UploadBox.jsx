import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UploadBox({ onFile }) {
  const onDrop = useCallback(
    (accepted) => {
      if (accepted?.length) onFile(accepted[0]);
    },
    [onFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <motion.div
      {...getRootProps()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition ${isDragActive ? 'bg-primary/10' : 'bg-white'}`}
    >
      <input {...getInputProps()} />
      <FileUp className="mx-auto text-primary" size={32} />
      <p className="mt-4 text-sm text-gray-600">Drag & drop a PDF or click to select</p>
    </motion.div>
  );
}
