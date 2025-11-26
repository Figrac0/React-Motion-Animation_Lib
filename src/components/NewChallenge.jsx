import { useContext, useRef, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
    const title = useRef();
    const description = useRef();
    const deadline = useRef();

    const [scope, animate] = useAnimate();

    const [selectedImage, setSelectedImage] = useState(null);
    const { addChallenge } = useContext(ChallengesContext);

    function handleSelectImage(image) {
        setSelectedImage(image);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const challenge = {
            title: title.current.value,
            description: description.current.value,
            deadline: deadline.current.value,
            image: selectedImage,
        };

        if (
            !challenge.title.trim() ||
            !challenge.description.trim() ||
            !challenge.deadline.trim() ||
            !challenge.image
        ) {
            const invalid = [];

            if (!challenge.title.trim()) invalid.push("#title");
            if (!challenge.description.trim()) invalid.push("#description");
            if (!challenge.deadline.trim()) invalid.push("#deadline");
            if (!challenge.image) invalid.push("li"); // картинки

            animate(
                invalid.join(", "),
                {
                    x: [-10, 10, -6, 6, -2, 2, 0],
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        "0 0 0 rgba(255,0,0,0)",
                        "0 0 12px rgba(255,0,0,0.35)",
                        "0 0 6px rgba(255,0,0,0.25)",
                        "0 0 0 rgba(255,0,0,0)",
                    ],
                },
                {
                    duration: 0.35,
                    ease: "easeOut",
                }
            );

            return;
        }

        onDone();
        addChallenge(challenge);
    }

    return (
        <Modal title="New Challenge" onClose={onDone}>
            <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
                <p>
                    <label htmlFor="title">Title</label>
                    <input ref={title} type="text" name="title" id="title" />
                </p>

                <p>
                    <label htmlFor="description">Description</label>
                    <textarea
                        ref={description}
                        name="description"
                        id="description"
                    />
                </p>

                <p>
                    <label htmlFor="deadline">Deadline</label>
                    <input
                        ref={deadline}
                        type="date"
                        name="deadline"
                        id="deadline"
                    />
                </p>

                <motion.ul
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                    id="new-challenge-images">
                    {images.map((image) => (
                        <motion.li
                            variants={{
                                hidden: { opacity: 0, scale: 0.5, rotate: 45 },
                                visible: { opacity: 1, scale: 1, rotate: 0 },
                            }}
                            exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                            transition={{
                                type: "spring",
                                stiffness: 250,
                                damping: 30,
                                duration: 0.5,
                            }}
                            key={image.alt}
                            onClick={() => handleSelectImage(image)}
                            className={
                                selectedImage === image ? "selected" : undefined
                            }
                            whileHover={{
                                scale: 1.4,

                                transition: { duration: 0.2, ease: "easeOut" },
                            }}
                            whileTap={{ scale: 0.5 }}
                            style={{
                                cursor: "pointer",
                                display: "inline-block",
                            }}>
                            <img
                                {...image}
                                style={{
                                    borderRadius: "8px",
                                    transition: "filter 0.3s",
                                }}
                            />
                        </motion.li>
                    ))}
                </motion.ul>

                <p className="new-challenge-actions">
                    <button type="button" onClick={onDone}>
                        Cancel
                    </button>
                    <button>Add Challenge</button>
                </p>
            </form>
        </Modal>
    );
}
