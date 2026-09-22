import { Easing, interpolate } from "remotion";
import type { Track } from "../../types";

type Props = {
    frame: number;
    fps: number;
    tracks: Track[];
};

const TRANSITION_DURATION = 20;
const SLIDE_DISTANCE = 80;

export const NextTrack = ({
    frame,
    fps,
    tracks,
}: Props) => {
    const currentTime = frame / fps;

    const currentIndex = tracks.findIndex(
        (track, index) => {
            const start = track.start;
            const nextStart =
                tracks[index + 1]?.start;

            return (
                currentTime >= start &&
                (
                    nextStart === undefined ||
                    currentTime < nextStart
                )
            );
        },
    );

    if (currentIndex < 0) {
        return null;
    }

    const currentTrack = tracks[currentIndex];
    const nextTrack = tracks[currentIndex + 1];

    /*
     * 最後の曲
     */
    if (!nextTrack) {
        return (
            <TrackFrame label="NOW PLAYING">
                <TrackText track={currentTrack} />
            </TrackFrame>
        );
    }

    /*
     * 1曲目
     */
    if (currentIndex === 0) {
        return (
            <TrackFrame label="NEXT">
                <TrackText track={nextTrack} />
            </TrackFrame>
        );
    }

    /*
     * 2曲目以降
     *
     * 現在曲の開始位置で、
     * 直前まで NEXT に表示していた曲から
     * 次の曲へスライドする。
     */
    const transitionStart =
        currentTrack.start * fps;

    const transitionFrame =
        frame - transitionStart;

    const progress = interpolate(
        transitionFrame,
        [0, TRANSITION_DURATION],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
        },
    );

    const outgoingY = interpolate(
        progress,
        [0, 1],
        [0, -SLIDE_DISTANCE],
    );

    const incomingY = interpolate(
        progress,
        [0, 1],
        [SLIDE_DISTANCE, 0],
    );

    return (
        <TrackFrame
            label="NEXT"
            nextLabel="NOW PLAYING"
            labelProgress={progress}
        >
            {/* 直前まで NEXT に表示されていた曲 */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    transform: `translateY(${outgoingY}px)`,
                    opacity: 1 - progress,
                }}
            >
                <TrackText track={currentTrack} />
            </div>

            {/* 次に再生される曲 */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    transform: `translateY(${incomingY}px)`,
                    opacity: progress,
                }}
            >
                <TrackText track={nextTrack} />
            </div>
        </TrackFrame>
    );
};

const TrackFrame = ({
    label,
    nextLabel,
    labelProgress = 0,
    children,
}: {
    label: "NEXT" | "NOW PLAYING";
    nextLabel?: "NEXT" | "NOW PLAYING";
    labelProgress?: number;
    children: React.ReactNode;
}) => {
    const hasTransition = nextLabel !== undefined;

    return (
        <div
            style={{
                position: "relative",
                width: 500,
                height: 120,
                boxSizing: "border-box",
            }}
        >
            {/* 本体 */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 106,
                    overflow: "hidden",
                    borderRadius: 16,
                    border: "solid 2px #00A8FF",
                    backgroundColor:
                        "rgba(5, 10, 28, 0.35)",
                }}
            >
                {children}
            </div>

            {/* NEXT */}
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: -8,
                    transform: "translateX(-50%)",
                    fontFamily:
                        "Urbanist, Noto Sans JP, sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                    letterSpacing: 5.0,
                    lineHeight: 1,
                    color: "#00A8FF",
                    whiteSpace: "nowrap",
                    opacity: hasTransition
                        ? 1 - labelProgress
                        : 1,
                    zIndex: 3,
                }}
            >
                {label}
            </div>

            {/* NOW PLAYING */}
            {nextLabel && (
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: -8,
                        transform: "translateX(-50%)",
                        fontFamily:
                            "Urbanist, Noto Sans JP, sans-serif",
                        fontSize: 16,
                        fontWeight: 500,
                        letterSpacing: 5.0,
                        lineHeight: 1,
                        color: "#00A8FF",
                        whiteSpace: "nowrap",
                        opacity: labelProgress,
                        zIndex: 3,
                    }}
                >
                    {nextLabel}
                </div>
            )}
        </div>
    );
};

const TrackText = ({
    track,
}: {
    track: Track;
}) => {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    fontFamily:
                        "Urbanist, Noto Sans JP, sans-serif",
                    color: "#B8F3FF",
                    fontSize: 40,
                    fontWeight: 500,
                    letterSpacing: 2.0,
                    lineHeight: 1.1,
                    whiteSpace: "nowrap",
                    textAlign: "center",
                }}
            >
                {track.title}
            </div>

            <div
                style={{
                    marginTop: 4,
                    fontFamily:
                        "Urbanist, Noto Sans JP, sans-serif",
                    color: "#00A8FF",
                    fontSize: 20,
                    lineHeight: 1.1,
                    whiteSpace: "nowrap",
                    textAlign: "center",
                }}
            >
                {track.composer}
            </div>
        </div>
    );
};