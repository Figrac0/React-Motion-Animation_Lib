import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import cityImg from "../assets/city.jpg";
import heroImg from "../assets/hero.png";
import ParticleBackground from "../components/ParticleBackground";

const MotionLink = motion(Link);

export default function WelcomePage() {
    const { scrollYProgress } = useScroll();

    const smoothScrollY = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 32,
        mass: 1.2,
    });

    const cityY = useTransform(smoothScrollY, [0, 1], [0, -160]);
    const cityScale = useTransform(smoothScrollY, [0, 1], [1.08, 0.98]);
    const cityBlur = useTransform(
        smoothScrollY,
        [0, 0.3, 0.7, 1],
        ["blur(0px)", "blur(1px)", "blur(3px)", "blur(5px)"]
    );
    const cityOpacity = useTransform(smoothScrollY, [0, 0.5, 1], [1, 0.9, 0.6]);

    const heroY = useTransform(
        smoothScrollY,
        [0, 0.18, 0.35, 0.5, 0.65, 0.8, 1],
        [0, -80, -190, -340, -520, -720, -920]
    );

    const heroX = useTransform(
        smoothScrollY,
        [0, 0.18, 0.35, 0.5, 0.65, 0.8, 1],
        [0, 10, 4, -6, -14, -22, -30]
    );

    const heroScale = useTransform(
        smoothScrollY,
        [0, 0.18, 0.35, 0.5, 0.65, 0.8, 1],
        [1, 0.99, 0.97, 0.95, 0.92, 0.89, 0.86]
    );

    const heroRotate = useTransform(
        smoothScrollY,
        [0, 0.18, 0.35, 0.5, 0.65, 0.8, 1],
        [0, -1.5, 1, -0.5, 0.8, -1.2, -2.5]
    );

    const heroOpacity = useTransform(
        smoothScrollY,
        [0, 0.15, 0.4, 0.65, 1],
        [1, 1, 0.85, 0.5, 0]
    );

    const textY = useTransform(smoothScrollY, [0, 0.5, 1], [0, 200, 420]);

    const textScale = useTransform(smoothScrollY, [0, 0.4, 1], [1, 1.15, 1.35]);

    const textOpacity = useTransform(
        smoothScrollY,
        [0, 0.3, 0.6, 1],
        [1, 0.8, 0.45, 0.15]
    );

    return (
        <>
            <ParticleBackground />
            <motion.header
                id="welcome-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}>
                <motion.div
                    id="welcome-header-content"
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
                    style={{
                        y: textY,
                        scaleX: 1, // ширину больше не трогаем
                        scaleY: textScale, // только по вертикали
                        opacity: textOpacity,
                    }}>
                    <motion.h1
                        layout
                        initial={{ letterSpacing: "0.02em" }}
                        animate={{ letterSpacing: "0.06em" }}
                        transition={{ duration: 0.9, ease: "easeOut" }}>
                        Ready for a challenge?
                    </motion.h1>

                    <MotionLink
                        id="cta-link"
                        to="/challenges"
                        whileHover={{
                            scale: 1.07,
                            y: -3,
                        }}
                        whileTap={{ scale: 0.96, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 26,
                        }}>
                        Get Started
                    </MotionLink>
                </motion.div>

                <motion.img
                    src={cityImg}
                    alt="A city skyline touched by sunlight"
                    id="city-image"
                    style={{
                        y: cityY,
                        scale: cityScale,
                        opacity: cityOpacity,
                        filter: cityBlur,
                    }}
                    initial={{ opacity: 0, scale: 1.12, y: 40 }}
                    animate={{ opacity: 1, scale: 1.08, y: 0 }}
                    transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
                />

                <motion.img
                    src={heroImg}
                    alt="A superhero wearing a cape"
                    id="hero-image"
                    style={{
                        x: heroX,
                        y: heroY,
                        scale: heroScale,
                        rotate: heroRotate,
                        opacity: heroOpacity,
                    }}
                    initial={{ opacity: 0, y: 60, scale: 0.95, rotate: 4 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    transition={{
                        duration: 0.95,
                        ease: [0.19, 1, 0.22, 1],
                        delay: 0.1,
                    }}
                />
            </motion.header>

            <main id="welcome-content">
                <motion.section
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}>
                        There&apos;s never been a better time.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{
                            duration: 0.55,
                            ease: "easeOut",
                            delay: 0.05,
                        }}>
                        With our platform, you can set, track, and conquer
                        challenges at your own pace. Whether it&apos;s personal
                        growth, professional achievements, or just for fun,
                        we&apos;ve got you covered.
                    </motion.p>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}>
                    <motion.h2
                        initial={{ opacity: 0, x: 40, rotate: 1.5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}>
                        Why Challenge Yourself?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{
                            duration: 0.55,
                            ease: "easeOut",
                            delay: 0.05,
                        }}>
                        Challenges provide a framework for growth. They push
                        boundaries, test limits, and result in genuine progress.
                        Here, we believe everyone has untapped potential,
                        waiting to be unlocked.
                    </motion.p>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}>
                        Features
                    </motion.h2>

                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.5 }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.08 },
                            },
                        }}>
                        <motion.li
                            variants={{
                                hidden: { opacity: 0, x: -30 },
                                visible: { opacity: 1, x: 0 },
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}>
                            Custom challenge creation: Set the rules, define
                            your pace.
                        </motion.li>
                        <motion.li
                            variants={{
                                hidden: { opacity: 0, x: -30 },
                                visible: { opacity: 1, x: 0 },
                            }}
                            transition={{ duration: 0.45, ease: "easeOut" }}>
                            Track your progress: See your growth over time with
                            our analytics tools.
                        </motion.li>
                        <motion.li
                            variants={{
                                hidden: { opacity: 0, x: -30 },
                                visible: { opacity: 1, x: 0 },
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}>
                            Community Support: Join our community and get
                            motivated by peers.
                        </motion.li>
                    </motion.ul>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, scale: 0.96, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{
                        duration: 0.65,
                        ease: [0.22, 0.61, 0.36, 1],
                    }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}>
                        Join Thousands Embracing The Challenge
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 26 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{
                            duration: 0.55,
                            ease: "easeOut",
                            delay: 0.05,
                        }}>
                        “I never realized what I was capable of until I set my
                        first challenge here. It&apos;s been a transformative
                        experience!” - Alex P.
                    </motion.p>
                </motion.section>
            </main>
        </>
    );
}
