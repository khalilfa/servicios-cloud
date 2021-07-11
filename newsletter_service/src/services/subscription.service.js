import axios from 'axios';
import config from '../config/config.json';

export async function existArtist(artistId) {
  const artist = await axios.get(`${config.UNQFY_SERVICE_URI}/artist/${artistId}`);

  return artist != undefined;
}

export function addSubscription(email, artistId, subscriptions) {
  const newSubscriptions = subscriptions.map(subs => {
    if(subs.email === email) {
      return {email, subs: [...subs, artistId]};
    }

    return subs;
  });

  return newSubscriptions;
}