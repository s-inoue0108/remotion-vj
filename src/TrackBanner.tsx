import {
    AbsoluteFill,
    Img,
    interpolate,
    staticFile,
} from "remotion";
import { Track } from "./types";

type Props = {
    path: string;
    frame: number;
    fps: number;
    tracks: Track[];
}

const FADE_DURATION = 1.0; // seconds

export const TrackBanner = ({ path, frame, fps, tracks }: Props) => {
    const time = frame / fps;

    const track = tracks.find(
        (track) =>
            time >= track.duration.start &&
            time < track.duration.end,
    );

    if (!track) {
        return null;
    }

    const fadeFrames = FADE_DURATION * fps;

    /*
     * 曲の開始・終了付近でフェード
     */
    const fadeIn = interpolate(
        frame,
        [
            track.duration.start * fps,
            track.duration.start * fps + fadeFrames,
        ],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        },
    );

    const fadeOut = interpolate(
        frame,
        [
            track.duration.end * fps - fadeFrames,
            track.duration.end * fps,
        ],
        [1, 0],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        },
    );

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
                    src={staticFile(`${path}/${track.cover}`)}
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
                            color: "#B8F3FF",
                            fontSize: 110,
                            fontWeight: 600,
                            letterSpacing: 3.0,
                        }}
                    >
                        {track.title}
                    </div>

                    <div
                        style={{
                            color: "#00A8FF",
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