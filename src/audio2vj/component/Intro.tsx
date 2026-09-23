import {
    AbsoluteFill,
    interpolate,
} from "remotion";

import { VJBackground } from "./VJBackground";
import { Theme } from "../../types";

type Props = {
    frame: number;
    fps: number;
    title: string;
    durationInFrames: number;
    fadeDurationInFrames: number;
    theme: Theme;
}

export const Intro = ({ frame, fps, title, durationInFrames, fadeDurationInFrames, theme }: Props) => {
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
                backgroundColor: theme.background.primary,
            }}
        >
            {/* 背景 */}
            <VJBackground
                frame={frame}
                fps={fps}
                theme={theme}
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
                            color: theme.text.opening,
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