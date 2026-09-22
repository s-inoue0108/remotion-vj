import {
    AbsoluteFill,
    interpolate,
} from "remotion";

import { VJBackground } from "./VJBackground";

type Props = {
    frame: number;
    fps: number;
    title: string;
    durationInFrames: number;
    fadeDurationInFrames: number;
}

export const Intro = ({ frame, fps, title, durationInFrames, fadeDurationInFrames }: Props) => {
    const fadeStart =
        durationInFrames - fadeDurationInFrames;

    const opacity = interpolate(
        frame,
        [fadeStart, durationInFrames],
        [1, 0],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        },
    );

    return (
        <AbsoluteFill
            style={{
                opacity,
                zIndex: 100,
                backgroundColor: "#020817",
            }}
        >
            {/* 背景 */}
            <VJBackground
                frame={frame}
                fps={fps}
            />

            {/* サムネイル */}
            <AbsoluteFill
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {title && (
                    <div
                        style={{
                            color: "#fff",
                            fontFamily:
                                "Urbanist, Noto Sans JP, sans-serif",
                            fontSize: 120,
                            fontWeight: 600,
                            letterSpacing: 5.0,
                            textAlign: "center",
                        }}
                    >
                        {title}
                    </div>
                )}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};