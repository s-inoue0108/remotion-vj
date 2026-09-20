import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

export const VJBackground = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const time = frame / fps;

    const rotation = time * 8;
    const rotationReverse = -time * 12;

    const scale =
        0.95 +
        0.1 * ((Math.sin(time * 1.5) + 1) / 2);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#000",
                overflow: "hidden",
            }}
        >
            {/* 外側の円 */}
            <div
                style={{
                    position: "absolute",
                    width: 900,
                    height: 900,
                    left: "50%",
                    top: "50%",
                    transform: `
                        translate(-50%, -50%)
                        rotate(${rotation}deg)
                        scale(${scale})
                    `,
                    border: "2px solid rgba(255,255,255,0.10)",
                    borderRadius: "50%",
                }}
            />

            {/* 回転する正方形 */}
            <div
                style={{
                    position: "absolute",
                    width: 650,
                    height: 650,
                    left: "50%",
                    top: "50%",
                    transform: `
                        translate(-50%, -50%)
                        rotate(${rotationReverse}deg)
                    `,
                    border: "2px solid rgba(255,255,255,0.08)",
                }}
            />

            {/* 内側の正方形 */}
            <div
                style={{
                    position: "absolute",
                    width: 450,
                    height: 450,
                    left: "50%",
                    top: "50%",
                    transform: `
                        translate(-50%, -50%)
                        rotate(${rotation}deg)
                    `,
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            />

            {/* 中央の円 */}
            <div
                style={{
                    position: "absolute",
                    width: 250,
                    height: 250,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "50%",
                }}
            />

            {/* 横線 */}
            <div
                style={{
                    position: "absolute",
                    width: "150%",
                    height: 1,
                    left: "-25%",
                    top: "50%",
                    backgroundColor:
                        "rgba(255,255,255,0.12)",
                    transform: `rotate(${rotationReverse * 0.5}deg)`,
                }}
            />

            {/* 縦線 */}
            <div
                style={{
                    position: "absolute",
                    width: 1,
                    height: "150%",
                    top: "-25%",
                    left: "50%",
                    backgroundColor:
                        "rgba(255,255,255,0.08)",
                    transform: `rotate(${rotation * 0.5}deg)`,
                }}
            />
        </AbsoluteFill>
    );
};