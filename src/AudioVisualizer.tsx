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

type Props = {
    audioFile: string;
};

export const AudioVisualizer = ({
    audioFile,
}: Props) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const audioData = useAudioData(
        staticFile(audioFile),
    );

    if (!audioData) {
        return null;
    }

    const frequencies = visualizeAudio({
        fps,
        frame,
        audioData,
        numberOfSamples: 512,
    });

    // 高域側を捨てる
    const displayFrequencies = frequencies.slice(0, 64);

    const blockHeight = 4;
    const blockGap = 2;
    const maxBlocks = 80;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#000",
            }}
        >
            {/* VJ Background */}
            <VJBackground
                frequencies={frequencies}
            />

            {/* Block Visualizer */}
            <div
                style={{
                    position: "absolute",
                    left: "10%",
                    bottom: "50%",
                    width: "80%",
                    height:
                        maxBlocks *
                        (blockHeight + blockGap),

                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    gap: 4,
                }}
            >
                {displayFrequencies.map(
                    (value, index) => {
                        const blocks = Math.min(
                            maxBlocks,
                            Math.floor(
                                value *
                                maxBlocks,
                            ),
                        ) * 4 + 1;

                        return (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    flexDirection:
                                        "column",
                                    justifyContent:
                                        "flex-end",
                                    gap: blockGap,
                                    width: 10,
                                    height: "100%",
                                }}
                            >
                                {Array.from({
                                    length: blocks,
                                }).map(
                                    (_, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                width:
                                                    "100%",
                                                height:
                                                    blockHeight,
                                                backgroundColor:
                                                    "#fff",
                                            }}
                                        />
                                    ),
                                )}
                            </div>
                        );
                    },
                )}
            </div>

            {/* Audio */}
            <Html5Audio
                src={staticFile(audioFile)}
            />
        </AbsoluteFill>
    );
};