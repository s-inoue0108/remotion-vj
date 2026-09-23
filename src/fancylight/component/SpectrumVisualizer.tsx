type Props = {
    frequencies: number[];
    displayFrequencies?: number;
    maxBlocks?: number;
};

export const SpectrumVisualizer = ({
    frequencies,
    displayFrequencies = 64,
    maxBlocks = 80,
}: Props) => {
    const visibleFrequencies = frequencies.slice(0, displayFrequencies);
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

                let r: number;
                let g: number;
                let b: number;

                if (t < 0.5) {
                    // Pink → Magenta
                    const p = t * 2;

                    r = 255;
                    g = 79 + (23 - 79) * p;
                    b = 154 + (111 - 154) * p;
                } else {
                    // Magenta → Violet
                    const p = (t - 0.5) * 2;

                    r = 255 + (184 - 255) * p;
                    g = 23 + (61 - 23) * p;
                    b = 111 + (255 - 111) * p;
                }

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
                                    backgroundColor: `rgb(
                                        ${Math.round(r)},
                                        ${Math.round(g)},
                                        ${Math.round(b)}
                                    )`,
                                }}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};