import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import NewChallenge from "./NewChallenge.jsx";

export default function Header() {
    const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

    function handleStartAddNewChallenge() {
        setIsCreatingNewChallenge(true);
    }

    function handleDone() {
        setIsCreatingNewChallenge(false);
    }

    const navigate = useNavigate();

    return (
        <>
            <AnimatePresence>
                {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
            </AnimatePresence>

            <header id="main-header">
                <motion.h1
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}>
                    Your Challenges
                </motion.h1>
                <motion.button
                    onClick={handleStartAddNewChallenge}
                    className="button gradient-animate"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                    }}>
                    Add Challenge
                </motion.button>
            </header>
        </>
    );
}
