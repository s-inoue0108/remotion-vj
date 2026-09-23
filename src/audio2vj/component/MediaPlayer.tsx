import { AbsoluteFill } from "remotion";
import { Theme, Track } from "../../types";
import { ProgressDisc } from "./ProgressDisc";
import { NextTrack } from "./NextTrack";
import { TrackTimer } from "./TrackTimer";
import { PlayerControls } from "./PlayerControls";

type Props = {
    frame: number;
    fps: number;
    durationInFrames: number;
    durationInSeconds: number;
    bpm: number;
    tracks: Track[];
    theme: Theme;
};

export const MediaPlayer = ({
    frame,
    fps,
    durationInFrames,
    durationInSeconds,
    bpm,
    tracks,
    theme,
}: Props) => {
    return (
        <AbsoluteFill
            style={{
                position: "absolute",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingBottom: 100,
                pointerEvents: "none",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 70,
                }}
            >
                {/* 左 */}
                <ProgressDisc
                    frame={frame}
                    fps={fps}
                    durationInFrames={durationInFrames}
                    rpm={bpm / 8}
                    theme={theme}
                    direction="clockwise"
                />

                {/* 中央 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <NextTrack
                        frame={frame}
                        fps={fps}
                        tracks={tracks}
                        theme={theme}
                    />
                    <PlayerControls
                        frame={frame}
                        fps={fps}
                        tracks={tracks}
                        theme={theme}
                    />
                    <TrackTimer
                        frame={frame}
                        fps={fps}
                        durationInSeconds={durationInSeconds}
                        tracks={tracks}
                        theme={theme}
                    />
                </div>

                {/* 右 */}
                <ProgressDisc
                    frame={frame}
                    fps={fps}
                    durationInFrames={durationInFrames}
                    rpm={bpm / 16}
                    theme={theme}
                    direction="counterclockwise"
                />
            </div>
        </AbsoluteFill>
    );
};