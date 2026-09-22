import { FaCompactDisc } from "react-icons/fa6";

type Props = {
    frame: number;
    fps: number;
    durationInFrames: number;
    rpm: number;
    direction?: "clockwise" | "counterclockwise";
};

const PROGRESS_SIZE = 160;
const DISC_RATIO = 0.65;
const STROKE_RATIO = 0.05;

const DISC_SIZE = PROGRESS_SIZE * DISC_RATIO;
const STROKE_WIDTH = PROGRESS_SIZE * STROKE_RATIO;
const RADIUS = PROGRESS_SIZE / 2 - STROKE_WIDTH / 2;

export const ProgressDisc = ({
    frame,
    fps,
    durationInFrames,
    rpm,
    direction = "clockwise",
}: Props) => {
    const progress = Math.min(frame / durationInFrames, 1);
    const circumference = 2 * Math.PI * RADIUS;

    const offset =
        direction === "clockwise"
            ? circumference * (1 - progress)
            : circumference * progress;

    const rotationPerSecond =
        rpm / 60;

    const rotation =
        (frame / fps) *
        rotationPerSecond *
        360 *
        (direction === "clockwise" ? 1 : -1);

    return (
        <div
            style={{
                position: "relative",
                width: PROGRESS_SIZE,
                height: PROGRESS_SIZE,
            }}
        >
            {/* 円形プログレス */}
            <svg
                width={PROGRESS_SIZE}
                height={PROGRESS_SIZE}
                viewBox={`0 0 ${PROGRESS_SIZE} ${PROGRESS_SIZE}`}
                style={{
                    position: "absolute",
                    inset: 0,
                    transform: "rotate(-90deg)",
                }}
            >
                {/* background */}
                <circle
                    cx={PROGRESS_SIZE / 2}
                    cy={PROGRESS_SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth={STROKE_WIDTH}
                />

                {/* progress */}
                <circle
                    cx={PROGRESS_SIZE / 2}
                    cy={PROGRESS_SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    stroke="#00A8FF"
                    strokeWidth={STROKE_WIDTH}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>

            {/* CD */}
            <div
                style={{
                    position: "absolute",
                    inset: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94CCD8",
                    transform: `rotate(${rotation}deg)`,
                }}
            >
                <FaCompactDisc size={DISC_SIZE} />
            </div>
        </div>
    );
};