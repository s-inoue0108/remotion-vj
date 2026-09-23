import { staticFile } from "remotion";

export const getStaticData = async (path: string) => {
    const url = staticFile(path);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(
            `Failed to load static data: ${url}`,
        );
    }
    const data = await response.json();
    return data;
}