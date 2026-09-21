import {
    AbsoluteFill,
    Html5Audio,
    staticFile,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import {
    useAudioData,
    visualizeAudio,
} from "@remotion/media-utils";

import { VJBackground } from "./VJBackground";
import { TrackBanner } from "./TrackBanner";
import { Intro } from "./Intro";
import { ProgressBar } from "./ProgressBar";
import { SpectrumVisualizer } from "./SpectrumVisualizer";
import { SideContent } from "./SideContent";

import { Props } from "./types";

export const Wav2VJ = ({
    path,
    metadata,
}: Props) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    if (!metadata) {
        return null;
    }

    const { title, date, audio, tracks } = metadata;

    const audioSrc = staticFile(
        `${path}/${audio}`,
    );
    const audioData = useAudioData(audioSrc);
    if (!audioData) {
        return null;
    }

    const frequencies = visualizeAudio({
        fps,
        frame,
        audioData,
        numberOfSamples: 512,
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#000b29",
            }}
        >
            {/* VJ Background */}
            <VJBackground />

            {/* Spectrum Visualizer */}
            <SpectrumVisualizer frequencies={frequencies} />

            {/* Side Content */}
            <SideContent sideText={`${title} | ${date}`} />

            {/* Progress Bar */}
            <ProgressBar frame={frame} fps={fps} durationInFrames={durationInFrames} tracks={tracks} />

            {/* Track Banner */}
            <TrackBanner path={path} frame={frame} fps={fps} tracks={tracks} />

            {/* Intro */}
            {frame < 5 * fps && (
                <Intro
                    frame={frame}
                    title={title}
                    durationInFrames={5 * fps}
                    fadeDurationInFrames={2 * fps}
                />
            )}

            {/* Audio */}
            <Html5Audio
                src={audioSrc}
            />
        </AbsoluteFill>
    );
};