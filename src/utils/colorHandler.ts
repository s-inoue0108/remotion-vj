export const hexToRgb = (hex: string) => {
    const value = hex.replace("#", "");

    return {
        r: parseInt(value.slice(0, 2), 16),
        g: parseInt(value.slice(2, 4), 16),
        b: parseInt(value.slice(4, 6), 16),
    };
};

export const rgba = (
    hex: string,
    alpha: number,
) => {
    const { r, g, b } = hexToRgb(hex);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const lighten = (
    hex: string,
    amount: number,
) => {
    const { r, g, b } = hexToRgb(hex);

    return `rgb(
        ${Math.min(255, Math.round(r + (255 - r) * amount))},
        ${Math.min(255, Math.round(g + (255 - g) * amount))},
        ${Math.min(255, Math.round(b + (255 - b) * amount))}
    )`;
};

export const interpolateColor = (
    from: string,
    to: string,
    t: number,
) => {
    const fromRgb = hexToRgb(from);
    const toRgb = hexToRgb(to);

    const r = Math.round(
        fromRgb.r + (toRgb.r - fromRgb.r) * t,
    );

    const g = Math.round(
        fromRgb.g + (toRgb.g - fromRgb.g) * t,
    );

    const b = Math.round(
        fromRgb.b + (toRgb.b - fromRgb.b) * t,
    );

    return `rgb(${r}, ${g}, ${b})`;
};