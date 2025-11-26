import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
    return createPortal(
        <>
            <motion.div
                className="backdrop"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            />
            <motion.dialog
                variants={{
                    hidden: { opacity: 0, scale: 0.85, y: -20 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                exit={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                    transition: {
                        duration: 0.25,
                        ease: "easeInOut",
                    },
                }}
                transition={{
                    type: "spring",
                    duration: 0.4,
                    damping: 25,
                    stiffness: 300,
                }}
                open
                className="modal">
                <h2>{title}</h2>
                {children}
            </motion.dialog>
        </>,
        document.getElementById("modal")
    );
}
