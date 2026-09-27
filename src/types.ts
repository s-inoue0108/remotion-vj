export type Props = {
    path: string;
    metadata?: Metadata;
    theme?: Theme;
    audioSrc: string;
    durationInSeconds: number;
};

export type Track = {
    title: string;
    composer: string;
    cover: string;
    start: number;
};

export type Metadata = {
    title: string;
    audio: string;
    date: string;
    width: number;
    height: number;
    fps: number;
    bpm: number;
    opening: number;
    theme: string;
    tracks: Track[];
};

export type Theme = {
    background: {
        primary: string;
        layer: {
            top: string;
            middle: string;
            bottom: string;
            border: string;
        };
        geometricEffect: {
            border: string;
            background: string;
        };
        progressGuide: string;
        panel: string;
    };
    text: {
        opening: string;
        primary: string;
        secondary: string;
        inactive: string;
    };
    accent: {
        primary: string;
        secondary: string;
    };
};