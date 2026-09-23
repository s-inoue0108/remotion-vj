import { Theme } from "../../types";

type Props = {
    text: string;
    theme: Theme;
};

export const SideContent = ({ text, theme }: Props) => {
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
                        color: theme.text.secondary,
                        transform: "rotate(90deg)",
                    }}
                >
                    {text}
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
                        color: theme.text.secondary,
                        transform: "rotate(-90deg)",
                    }}
                >
                    {text}
                </div>
            </div>
        </>
    );
};