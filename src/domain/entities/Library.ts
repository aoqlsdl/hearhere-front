export interface ILibrary {
    title: string;
    backgroundSound: string;
    sounds: ISound[];
    volumes: IVolume[];
    time: string;
}

export interface ILibraryData {
    title: string;
    backgroundSound: string;
    sounds: ISoundData[];
    volumes: IVolumeData[];
    time: string;
}

export interface ISound {
    url: string;
}

export interface ISoundData {
    url: string;
}

export interface IVolume {
    value: number;
}

export interface IVolumeData {
    value: number;
}
