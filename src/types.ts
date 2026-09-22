export type Props = {
    path: string;
    metadata?: Metadata;
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
    date: string;
    audio: string;
    bpm: number;
    opening: number;
    tracks: Track[];
}