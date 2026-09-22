type Props = {
    sideText: string;
};

export const SideContent = ({ sideText }: Props) => {
    return (
        <>
            {/* Left */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 40,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "visible",
                }}
            >
                <div
                    style={{
                        whiteSpace: "nowrap",
                        fontFamily:
                            "Urbanist, Noto Sans JP, sans-serif",
                        fontSize: 16,
                        fontWeight: 100,
                        letterSpacing: 5.0,
                        color: "#94CCD8",
                        transform: "rotate(90deg)",
                    }}
                >
                    {sideText}
                </div>
            </div>

            {/* Right */}
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    width: 40,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "visible",
                }}
            >
                <div
                    style={{
                        whiteSpace: "nowrap",
                        fontFamily:
                            "Urbanist, Noto Sans JP, sans-serif",
                        fontSize: 16,
                        fontWeight: 100,
                        letterSpacing: 5.0,
                        color: "#94CCD8",
                        transform: "rotate(-90deg)",
                    }}
                >
                    {sideText}
                </div>
            </div>
        </>
    );
};