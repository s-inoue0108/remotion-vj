import {
    FaShuffle,
    FaPause,
    FaRepeat,
} from "react-icons/fa6";
import {
    FaStepBackward,
    FaStepForward,
} from "react-icons/fa";
import type { Theme, Track } from "../../types";

type Props = {
    frame: number;
    fps: number;
    tracks: Track[];
    theme: Theme;
};

export const PlayerControls = ({
    frame,
    fps,
    tracks,
    theme,
}: Props) => {
    const ACTIVE_COLOR = theme.text.primary;
    const INACTIVE_COLOR = theme.text.inactive;

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

    const isFirstTrack = currentIndex === 0;
    const isLastTrack =
        currentIndex === tracks.length - 1;

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
            }}
        >
            <FaShuffle
                size={20}
                color={ACTIVE_COLOR}
            />

            <FaStepBackward
                size={24}
                color={
                    isFirstTrack
                        ? INACTIVE_COLOR
                        : ACTIVE_COLOR
                }
            />

            <FaPause
                size={24}
                color={ACTIVE_COLOR}
            />

            <FaStepForward
                size={24}
                color={
                    isLastTrack
                        ? INACTIVE_COLOR
                        : ACTIVE_COLOR
                }
            />

            <FaRepeat
                size={20}
                color={ACTIVE_COLOR}
            />
        </div>
    );
};