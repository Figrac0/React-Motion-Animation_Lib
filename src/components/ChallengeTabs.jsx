import { motion, AnimatePresence } from "framer-motion";
import Badge from "./Badge.jsx";

const tabVariants = {
    idle: { opacity: 0.7, scale: 1, y: 0 },
    selected: { opacity: 1, scale: 1.02, y: -1 },
};

const textVariants = {
    enter: { y: 8, opacity: 0, rotateX: -10 },
    center: { y: 0, opacity: 1, rotateX: 0 },
    exit: { y: -8, opacity: 0, rotateX: 10 },
};

function Tab({ isSelected, onSelect, badgeCaption, children }) {
    const labelKey = isSelected ? `selected-${children}` : `idle-${children}`;

    return (
        <motion.li
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}>
            <motion.button
                type="button"
                onClick={onSelect}
                className={isSelected ? "selected" : undefined}
                variants={tabVariants}
                animate={isSelected ? "selected" : "idle"}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={labelKey}
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="tab-label">
                        {children}
                    </motion.span>
                </AnimatePresence>

                <Badge key={badgeCaption} caption={badgeCaption} />
            </motion.button>

            {isSelected && (
                <motion.div
                    layoutId="tab-indicator"
                    className="active-tab-indicator"
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                    }}
                />
            )}
        </motion.li>
    );
}

export default function ChallengeTabs({
    selectedType,
    onSelectType,
    challenges,
    children,
}) {
    return (
        <>
            <menu id="tabs">
                <Tab
                    isSelected={selectedType === "active"}
                    onSelect={() => onSelectType("active")}
                    badgeCaption={challenges.active.length}>
                    Active
                </Tab>
                <Tab
                    isSelected={selectedType === "completed"}
                    onSelect={() => onSelectType("completed")}
                    badgeCaption={challenges.completed.length}>
                    Completed
                </Tab>
                <Tab
                    isSelected={selectedType === "failed"}
                    onSelect={() => onSelectType("failed")}
                    badgeCaption={challenges.failed.length}>
                    Failed
                </Tab>
            </menu>
            <div>{children}</div>
        </>
    );
}
