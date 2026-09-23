import {
    AbsoluteFill,
    Html5Audio,
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

export const Audio2VJ = ({
    path,
    metadata,
    theme,
    audioSrc,
    durationInSeconds,
}: Props) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    if (!metadata || !theme) return null;
    const { title, date, bpm, opening, tracks } = metadata;

    const audioData = useAudioData(audioSrc);
    if (!audioData) return null;

    const frequencies = visualizeAudio({
        fps,
        frame,
        audioData,
        numberOfSamples: 512,
    });

    return (
        <AbsoluteFill>
            {/* VJ Background */}
            <VJBackground
                frame={frame}
                fps={fps}
                theme={theme}
            />

            {/* Spectrum Visualizer */}
            <SpectrumVisualizer frequencies={frequencies} theme={theme} />

            {/* Side Content */}
            <SideContent text={`${title} | ${date}`} theme={theme} />

            {/* Track Banner */}
            <TrackBanner
                path={path}
                frame={frame}
                fps={fps}
                tracks={tracks}
                theme={theme}
            />

            {/* Media Player */}
            <MediaPlayer
                frame={frame}
                fps={fps}
                durationInFrames={durationInFrames}
                durationInSeconds={durationInSeconds}
                bpm={bpm}
                tracks={tracks}
                theme={theme}
            />

            {/* Intro */}
            {frame < opening * fps && (
                <Intro
                    frame={frame}
                    fps={fps}
                    title={title}
                    durationInFrames={opening * fps}
                    fadeDurationInFrames={fps}
                    theme={theme}
                />
            )}

            {/* Audio */}
            <Html5Audio
                src={audioSrc}
            />
        </AbsoluteFill>
    );
};