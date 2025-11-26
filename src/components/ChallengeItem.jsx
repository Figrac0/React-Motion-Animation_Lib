import { useContext } from "react";
import { motion } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";

export default function ChallengeItem({
    challenge,
    onViewDetails,
    isExpanded,
}) {
    const { updateChallengeStatus } = useContext(ChallengesContext);

    const formattedDate = new Date(challenge.deadline).toLocaleDateString(
        "en-US",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

    function handleCancel() {
        updateChallengeStatus(challenge.id, "failed");
    }

    function handleComplete() {
        updateChallengeStatus(challenge.id, "completed");
    }

    return (
        <motion.li layout exit={{ y: -30, opacity: 0 }}>
            <article className="challenge-item">
                <header>
                    <img {...challenge.image} />
                    <div className="challenge-item-meta">
                        <h2>{challenge.title}</h2>
                        <p>Complete until {formattedDate}</p>
                        <p className="challenge-item-actions">
                            <button
                                onClick={handleCancel}
                                className="btn-negative">
                                Mark as failed
                            </button>
                            <button onClick={handleComplete}>
                                Mark as completed
                            </button>
                        </p>
                    </div>
                </header>
                <div className="challenge-item-details">
                    <p>
                        <button onClick={onViewDetails}>
                            View Details{" "}
                            <motion.span
                                animate={{
                                    rotate: isExpanded ? 180 : 0,
                                    scale: isExpanded ? 1.2 : 1,
                                    opacity: isExpanded ? 0.8 : 1,
                                    x: isExpanded ? 5 : 0,
                                    transition: {
                                        duration: 0.3,
                                        ease: "easeInOut",
                                    },
                                }}
                                className="challenge-item-details-icon"
                                onClick={() => setIsExpanded(!isExpanded)}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 8V16M12 16L8 12M12 16L16 12"
                                        stroke="#7aaafc"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </motion.span>
                        </button>
                    </p>

                    {isExpanded && (
                        <div>
                            <p className="challenge-item-description">
                                {challenge.description}
                            </p>
                        </div>
                    )}
                </div>
            </article>
        </motion.li>
    );
}
