import axios from "axios";
const spotifyCreds = require('../config/spotifyCreds.json');

export default class SpotifyService {
    static async getArstistId(artistName: string) {
        const res = await axios.get('https://api.spotify.com/v1/search', {
            params: {type: 'artist', q: artistName, limit: 1},
            headers: {
                'Authorization': 'Bearer ' + spotifyCreds.access_token
            }
        })
        return {id: res.data.artists.items[0].id, genres: res.data.artists.items[0].genres}
    }

    static async getArtistAlbums(artistId: string) {
        const res = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            params: {limit: 5},
            headers: {
                'Authorization': 'Bearer ' + spotifyCreds.access_token
            }
        })
        let albumList: { name: any, albumId: any, year: any }[] = [];
        res.data.items.forEach((item: any) => albumList.push({
            name: item.name,
            albumId: item.id,
            year: item.release_date
        }))
        return albumList
    }

    static async getTracksFromAlbums(albumsIds: { name: any; albumId: any; year: any }[]) {
        let spotifyTracks: { albumId: any, tracks: any }[] = [];
        for (const value of albumsIds) {
            spotifyTracks.push({
                albumId: value.albumId, tracks: (await this.getTracksFromAlbum(value.albumId))
                    .map((value: any) => ({name: value.name, duration: value.duration_ms}))
            });
        }
        return spotifyTracks
    }

    static async getTracksFromAlbum(id: any) {
        const res = await axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
            params: {limit: 5},
            headers: {
                'Authorization': 'Bearer ' + spotifyCreds.access_token
            }
        })
        return res.data.items
    }

}

module.exports = SpotifyService;
