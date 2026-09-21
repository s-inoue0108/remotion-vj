export type Props = {
    path: string;
    metadata?: Metadata;
};

export type Track = {
    title: string;
    composer: string;
    cover: string;
    duration: {
        start: number;
        end: number;
    };
};

export type Metadata = {
    title: string;
    date: string;
    audio: string;
    tracks: Track[];
}