import { Track } from "./types";

type Props = {
    frame: number;
    fps: number;
    durationInFrames: number;
    tracks: Track[];
};

export const ProgressBar = ({ frame, fps, durationInFrames, tracks }: Props) => {
    const progress = frame / Math.max(1, durationInFrames - 1);

    const durationInSeconds = durationInFrames / fps;

    return (
        <div
            style={{
                position: "absolute",
                left: "20%",
                top: "65%",
                width: "60%",
                transform: "translateY(100px)",
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "4px",
                    backgroundColor: "#050A1C",
                }}
            >
                {/* Progress */}
                <div
                    style={{
                        width: `${progress * 100}%`,
                        height: "100%",
                        backgroundColor: "#00A8FF",
                    }}
                />

                {/* Track markers */}
                {tracks
                    .filter(
                        (track) =>
                            track.duration.start > 0,
                    )
                    .map((track, index) => {
                        const position =
                            track.duration.start /
                            durationInSeconds;

                        return (
                            <div
                                key={index}
                                style={{
                                    position: "absolute",
                                    left: `${position * 100}%`,
                                    top: -5.5,
                                    width: 3,
                                    height: 15,
                                    backgroundColor:
                                        "#fff",
                                    transform:
                                        "translateX(-50%)",
                                }}
                            />
                        );
                    })}
            </div>
        </div>
    );
};