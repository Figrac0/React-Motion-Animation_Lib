import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import ChallengeItem from "./ChallengeItem.jsx";
import ChallengeTabs from "./ChallengeTabs.jsx";

const listVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.35,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.06,
        },
    },
    exit: {
        opacity: 0,
        y: -15,
        scale: 0.98,
        transition: {
            duration: 0.25,
            ease: "easeIn",
        },
    },
};

export default function Challenges() {
    const { challenges } = useContext(ChallengesContext);
    const [selectedType, setSelectedType] = useState("active");
    const [expanded, setExpanded] = useState(null);

    function handleSelectType(newType) {
        setSelectedType(newType);
        setExpanded(null);
    }

    function handleViewDetails(id) {
        setExpanded((prevId) => (prevId === id ? null : id));
    }

    const filteredChallenges = {
        active: challenges.filter((challenge) => challenge.status === "active"),
        completed: challenges.filter(
            (challenge) => challenge.status === "completed"
        ),
        failed: challenges.filter((challenge) => challenge.status === "failed"),
    };

    const displayedChallenges = filteredChallenges[selectedType];

    return (
        <div id="challenges">
            <ChallengeTabs
                challenges={filteredChallenges}
                onSelectType={handleSelectType}
                selectedType={selectedType}>
                <AnimatePresence mode="wait">
                    {displayedChallenges.length > 0 ? (
                        <motion.ol
                            key={selectedType}
                            className="challenge-items"
                            variants={listVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            <AnimatePresence>
                                {displayedChallenges.map((challenge) => (
                                    <ChallengeItem
                                        key={challenge.id}
                                        challenge={challenge}
                                        onViewDetails={() =>
                                            handleViewDetails(challenge.id)
                                        }
                                        isExpanded={expanded === challenge.id}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.ol>
                    ) : (
                        <motion.p
                            key={`fallback-${selectedType}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}>
                            No challenges found.
                        </motion.p>
                    )}
                </AnimatePresence>
            </ChallengeTabs>
        </div>
    );
}
