import { Theme } from "../../types";
import { interpolateColor } from "../../utils/colorHandler";

type Props = {
    frequencies: number[];
    displayFrequencies?: number;
    maxBlocks?: number;
    theme: Theme;
};

export const SpectrumVisualizer = ({
    frequencies,
    displayFrequencies = 64,
    maxBlocks = 80,
    theme,
}: Props) => {
    const visibleFrequencies = frequencies.slice(
        0,
        displayFrequencies,
    );

    const blockGap = 2;

    return (
        <div
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100vh",

                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",

                overflow: "hidden",
                opacity: 0.5,
                zIndex: 50,
            }}
        >
            {visibleFrequencies.map((value, index) => {
                const blocks = Math.min(
                    maxBlocks,
                    Math.floor(value * maxBlocks * 4),
                );

                const t =
                    index /
                    Math.max(
                        1,
                        visibleFrequencies.length - 1,
                    );

                const blockColor = interpolateColor(
                    theme.accent.primary,
                    theme.accent.secondary,
                    t,
                );

                return (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: blockGap,
                            width: `${100 / visibleFrequencies.length}%`,
                        }}
                    >
                        {Array.from({
                            length: blocks,
                        }).map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: "60%",
                                    height: "1vh",
                                    backgroundColor: blockColor,
                                }}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};