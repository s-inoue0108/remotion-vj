import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

type Shape = {
    x: number;
    y: number;
    size: number;
    rotation: number;
    speed: number;
    phase: number;
    type: "circle" | "square" | "triangle";
};

const shapes: Shape[] = [
    {
        x: 12,
        y: 20,
        size: 180,
        rotation: 20,
        speed: 0.10,
        phase: 0.0,
        type: "circle",
    },
    {
        x: 78,
        y: 18,
        size: 240,
        rotation: 35,
        speed: 0.07,
        phase: 0.25,
        type: "square",
    },
    {
        x: 88,
        y: 68,
        size: 150,
        rotation: 10,
        speed: 0.12,
        phase: 0.5,
        type: "triangle",
    },
    {
        x: 25,
        y: 75,
        size: 300,
        rotation: 45,
        speed: 0.06,
        phase: 0.7,
        type: "circle",
    },
    {
        x: 55,
        y: 40,
        size: 120,
        rotation: 60,
        speed: 0.15,
        phase: 0.35,
        type: "square",
    },
];

export const VJBackground = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const time = frame / fps;

    /*
     * =====================================================
     * 流動するグラデーション
     * =====================================================
     */

    const gradientX =
        Math.sin(time * 0.08) * 12;

    const gradientY =
        Math.cos(time * 0.06) * 12;

    /*
     * =====================================================
     * Background
     * =====================================================
     */

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#050A1C",
                overflow: "hidden",
            }}
        >
            {/* ---------------------------------------------
                Smooth Gradient
            --------------------------------------------- */}
            <div
                style={{
                    position: "absolute",

                    width: "180%",
                    height: "180%",
                    left: "-40%",
                    top: "-40%",

                    transform: `
                        translate(
                            ${gradientX}%,
                            ${gradientY}%
                        )
                    `,

                    background: `
                        radial-gradient(
                            circle at 20% 30%,
                            rgba(0, 168, 255, 0.16),
                            transparent 38%
                        ),
                        radial-gradient(
                            circle at 80% 70%,
                            rgba(0, 217, 255, 0.12),
                            transparent 42%
                        ),
                        radial-gradient(
                            circle at 50% 50%,
                            rgba(7, 89, 200, 0.10),
                            transparent 45%
                        ),
                        #020817
                    `,

                    border: "2px solid rgba(0, 217, 255, 0.25)",
                }}
            />

            {/* ---------------------------------------------
                Floating Geometric Shapes
            --------------------------------------------- */}
            {shapes.map((shape, index) => {
                /*
                 * 0 → 1 → 0
                 *
                 * 奥から出現
                 * ↓
                 * 手前に接近
                 * ↓
                 * 消える
                 */
                const progress =
                    (time * shape.speed +
                        shape.phase) %
                    1;

                /*
                 * 奥行き
                 *
                 * 0.1 = 遠い
                 * 2.5 = かなり手前
                 */
                const scale =
                    0.1 +
                    progress * 2.4;

                /*
                 * ゆっくり漂う
                 */
                const driftX =
                    Math.sin(
                        time * 0.15 +
                        index * 1.7,
                    ) * 20;

                const driftY =
                    Math.cos(
                        time * 0.12 +
                        index * 2.1,
                    ) * 20;

                /*
                 * 奥では薄く、
                 * 手前でも淡く
                 */
                const opacity =
                    Math.sin(
                        progress * Math.PI,
                    ) * 0.18;

                /*
                 * ゆっくり回転
                 */
                const rotation =
                    shape.rotation +
                    progress * 45;

                return (
                    <div
                        key={index}
                        style={{
                            position: "absolute",

                            left: `${shape.x}%`,
                            top: `${shape.y}%`,

                            width: shape.size,
                            height: shape.size,

                            boxSizing: "border-box",

                            transform: `
                                translate(
                                    ${driftX}px,
                                    ${driftY}px
                                )
                                translate(-50%, -50%)
                                scale(${scale})
                                rotate(${rotation}deg)
                            `,

                            opacity,

                            /*
                             * 図形
                             */
                            border:
                                shape.type !==
                                    "triangle"
                                    ? "2px solid rgba(210, 220, 255, 0.8)"
                                    : undefined,

                            borderRadius:
                                shape.type ===
                                    "circle"
                                    ? "50%"
                                    : undefined,

                            background:
                                shape.type ===
                                    "triangle"
                                    ? "rgba(180, 190, 255, 0.06)"
                                    : "transparent",

                            clipPath:
                                shape.type ===
                                    "triangle"
                                    ? "polygon(50% 0%, 100% 100%, 0% 100%)"
                                    : undefined,
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};