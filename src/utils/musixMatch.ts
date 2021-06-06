import Axios from 'axios';

const config = require('../config/api-keys.json');
const URI = 'http://api.musixmatch.com/ws/1.1';

async function searchTrackByName(name: string) {
  let tracks = await Axios.get(`${URI}/track.search`, {
    params: {
      apikey: config.MUSIXMATCH_API_KEY,
      q_track: name,
      f_has_lyrics: 1
    }
  });

  return tracks.data.message.body.track_list[0].track;
}

async function getLyricsById(trackId: string) {
  let lyrics = await Axios.get(`${URI}/track.lyrics.get`, {
    params: {
      apikey: config.MUSIXMATCH_API_KEY,
      track_id: trackId
    }
  });

  return lyrics.data.message.body.lyrics.lyrics_body;
}

export async function getLyrics(name: string) {
  let track = await searchTrackByName(name);
  let lyrics = await getLyricsById(track.track_id);

  return lyrics;
}