import { interpolate } from "remotion";
import type { Track } from "../../types";

type Props = {
    frame: number;
    fps: number;
    tracks: Track[];
    durationInSeconds: number;
};

const BLINK_DURATION = 5;

export const TrackTimer = ({
    frame,
    fps,
    tracks,
    durationInSeconds,
}: Props) => {
    const currentTime = frame / fps;

    const currentIndex = tracks.findIndex(
        (track, index) => {
            const start = track.start;
            const nextStart =
                tracks[index + 1]?.start;

            return (
                currentTime >= start &&
                (nextStart === undefined ||
                    currentTime < nextStart)
            );
        },
    );

    if (currentIndex < 0) {
        return null;
    }

    const nextTrack = tracks[currentIndex + 1];

    // 最後の曲だけ WAV 全体の終了時刻を使う
    const endTime = nextTrack
        ? nextTrack.start
        : durationInSeconds - 1;

    const remaining = Math.max(
        0,
        endTime - currentTime,
    );

    const totalSeconds = Math.ceil(remaining);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const time =
        `${minutes
            .toString()
            .padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}
        `;

    let opacity = 1;

    if (
        remaining > 0 &&
        remaining <= BLINK_DURATION
    ) {
        const blinkProgress = remaining % 1;

        opacity = interpolate(
            blinkProgress,
            [0, 0.5, 1],
            [1, 0.25, 1],
            {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
            },
        );
    }

    return (
        <div
            style={{
                textAlign: "center",

                fontFamily:
                    "Source Han Code JP, monospace",
                fontSize: 20,
                fontWeight: 300,
                letterSpacing: 1.0,
                color: "#B8F3FF",
            }}
        >
            {time}
        </div>
    );
};