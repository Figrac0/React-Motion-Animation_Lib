// ParticleBackground.jsx
export default function ParticleBackground() {
    const particles = Array.from({ length: 22 });

    return (
        <div className="particle-layer" aria-hidden="true">
            {particles.map((_, index) => (
                <span key={index} className="particle" />
            ))}
        </div>
    );
}
