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
                opacity: 0.3,
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
                    // Blue → Cyan
                    const p = t * 2;

                    r = 0;
                    g = 168 + (229 - 168) * p;
                    b = 255;
                } else {
                    // Cyan → Electric Lime
                    const p = (t - 0.5) * 2;

                    r = 0 + 57 * p;
                    g = 229 + (255 - 229) * p;
                    b = 255 - 229 * p;
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