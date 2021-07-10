export default class SpotifyService {
    static getArstistId(artistName: string): Promise<{
        id: any;
        genres: any;
    }>;
    static getArtistAlbums(artistId: string): Promise<{
        name: any;
        albumId: any;
        year: any;
    }[]>;
    static getTracksFromAlbums(albumsIds: {
        name: any;
        albumId: any;
        year: any;
    }[]): Promise<{
        albumId: any;
        tracks: any;
    }[]>;
    static getTracksFromAlbum(id: any): Promise<any>;
}
