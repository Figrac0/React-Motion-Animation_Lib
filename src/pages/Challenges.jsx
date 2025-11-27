import Header from "../components/Header.jsx";
import Challenges from "../components/Challenges.jsx";
import ChallengesContextProvider from "../store/challenges-context.jsx";
import ParticleBackground from "../components/ParticleBackground.jsx";

export default function ChallengesPage() {
    return (
        <>
            <ParticleBackground />

            <ChallengesContextProvider>
                <Header />
                <main>
                    <Challenges />
                </main>
            </ChallengesContextProvider>
        </>
    );
}
