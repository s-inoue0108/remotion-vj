import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

type Props = {
    frequencies: number[];
};

export const VJBackground = ({
    frequencies,
}: Props) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const time = frame / fps;

    const bass =
        frequencies
            .slice(0, 8)
            .reduce((sum, value) => sum + value, 0) / 8;

    /*
     * バウンス
     */
    const bounce = Math.pow(bass, 0.7);

    /*
     * 背景の移動
     */
    const x = Math.sin(time * 0.35) * 10;
    const y = Math.cos(time * 0.25) * 10;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#05000d",
                overflow: "hidden",
            }}
        >
            {/* Gradient */}
            <div
                style={{
                    position: "absolute",

                    /*
                     * 画面より十分大きくする
                     */
                    width: "180%",
                    height: "180%",
                    left: "-40%",
                    top: "-40%",

                    transform: `
                        translate(${x}%, ${y}%)
                        scale(${1 + bounce * 0.08})
                    `,

                    background: `
                        linear-gradient(
                            120deg,
                            #08001a 0%,
                            #1e46b4 20%,
                            #7852dc 60%,
                            #08001a 100%
                        )
                    `,
                }}
            />

            {/* Bass circle */}
            <div
                style={{
                    position: "absolute",
                    width: 600,
                    height: 600,
                    left: "50%",
                    top: "50%",

                    transform: `
                        translate(-50%, -50%)
                        scale(${1 + bounce * 0.8})
                    `,

                    borderRadius: "50%",
                    border: `4px solid rgba(
                        255,
                        255,
                        255,
                        ${0.25 + bounce * 0.5}
                    )`,
                }}
            />
        </AbsoluteFill>
    );
};