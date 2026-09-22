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

import { VJBackground } from "./component/VJBackground";
import { TrackBanner } from "./component/TrackBanner";
import { Intro } from "./component/Intro";
import { SpectrumVisualizer } from "./component/SpectrumVisualizer";
import { SideContent } from "./component/SideContent";
import { MediaPlayer } from "./component/MediaPlayer";

import { Props } from "../types";

export const Deepdark = ({
    path,
    metadata,
    durationInSeconds,
}: Props) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    if (!metadata) {
        return null;
    }

    const { title, date, audio, bpm, opening, tracks } = metadata;

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
        <AbsoluteFill>
            {/* VJ Background */}
            <VJBackground />

            {/* Spectrum Visualizer */}
            <SpectrumVisualizer frequencies={frequencies} />

            {/* Side Content */}
            <SideContent sideText={`${title} | ${date}`} />

            {/* Track Banner */}
            <TrackBanner path={path} frame={frame} fps={fps} tracks={tracks} />

            {/* Media Player */}
            <MediaPlayer
                frame={frame}
                fps={fps}
                durationInFrames={durationInFrames}
                durationInSeconds={durationInSeconds}
                bpm={bpm}
                tracks={tracks}
            />

            {/* Intro */}
            {frame < opening * fps && (
                <Intro
                    frame={frame}
                    title={title}
                    durationInFrames={opening * fps}
                    fadeDurationInFrames={fps}
                />
            )}

            {/* Audio */}
            <Html5Audio
                src={audioSrc}
            />
        </AbsoluteFill>
    );
};