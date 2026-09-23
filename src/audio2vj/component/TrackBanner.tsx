import {
    AbsoluteFill,
    Img,
    interpolate,
    staticFile,
} from "remotion";
import { Theme, Track } from "../../types";

type Props = {
    path: string;
    frame: number;
    fps: number;
    tracks: Track[];
    theme: Theme;
};

const FADE_DURATION = 1.0; // seconds

export const TrackBanner = ({
    path,
    frame,
    fps,
    tracks,
    theme,
}: Props) => {
    const time = frame / fps;

    const currentIndex = tracks.findIndex(
        (track, index) => {
            const start = track.start;
            const nextStart =
                tracks[index + 1]?.start;

            return (
                time >= start &&
                (
                    nextStart === undefined ||
                    time < nextStart
                )
            );
        },
    );

    if (currentIndex < 0) {
        return null;
    }

    const track = tracks[currentIndex];
    const nextTrack = tracks[currentIndex + 1];

    const fadeFrames = FADE_DURATION * fps;

    /*
     * 曲の開始位置からフェードイン
     */
    const fadeIn = interpolate(
        frame,
        [
            track.start * fps,
            track.start * fps + fadeFrames,
        ],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        },
    );

    /*
     * 次の曲の開始位置からフェードアウト
     *
     * 最後の曲には次曲がないため、
     * フェードアウトしない。
     */
    const fadeOut = nextTrack
        ? interpolate(
            frame,
            [
                nextTrack.start * fps -
                fadeFrames,
                nextTrack.start * fps,
            ],
            [1, 0],
            {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
            },
        )
        : 1;

    const opacity = Math.min(
        fadeIn,
        fadeOut,
    );

    return (
        <AbsoluteFill
            style={{
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                zIndex: 60,
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    padding: "20px 32px",
                    fontFamily:
                        "Urbanist, Noto Sans JP, sans-serif",
                    opacity,
                }}
            >
                <Img
                    src={staticFile(
                        `${path}/${track.cover}`,
                    )}
                    style={{
                        width: 200,
                        height: 200,
                        objectFit: "cover",
                        borderRadius: 6,
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                    }}
                >
                    <div
                        style={{
                            color: theme.text.primary,
                            fontSize: 110,
                            fontWeight: 600,
                            letterSpacing: 3.0,
                        }}
                    >
                        {track.title}
                    </div>

                    <div
                        style={{
                            color: theme.accent.primary,
                            fontSize: 50,
                        }}
                    >
                        {track.composer}
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};