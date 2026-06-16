const MUSIC_CDN_URL = "https://cdn.sevi.sh";

export type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  preview: string;
  query: string;
  appleMusicUrl?: string;
  spotifyUrl?: string;
};

function musicAssetUrl(filename: string) {
  return `${MUSIC_CDN_URL}/${filename}`;
}

function musicTrack({
  id,
  title,
  artist,
  query,
  appleMusicUrl,
  spotifyUrl,
}: Omit<MusicTrack, "cover" | "preview">): MusicTrack {
  return {
    id,
    title,
    artist,
    cover: musicAssetUrl(`${id}.jpg`),
    preview: musicAssetUrl(`${id}.mp3`),
    query,
    appleMusicUrl,
    spotifyUrl,
  };
}

const musicTrackLibrary: Array<MusicTrack> = [
  musicTrack({
    id: "camilla-yung-saint-paul",
    title: "Camilla",
    artist: "Yung Saint Paul",
    query: "Camilla Yung Saint Paul",
    appleMusicUrl: "https://music.apple.com/us/song/camilla/1810040773",
    spotifyUrl: "https://open.spotify.com/track/4IgsV4j9x88UgXTiYSzMK5",
  }),
  musicTrack({
    id: "don-t-stop-dj-heartstring",
    title: "Don't Stop",
    artist: "DJ Heartstring, southstar",
    query: "Don't Stop DJ Heartstring southstar",
    appleMusicUrl: "https://music.apple.com/at/album/dont-stop/1740492777?i=1740492783",
    spotifyUrl: "https://open.spotify.com/track/3tYYypENWxaS1DKUtcH8S8",
  }),
  musicTrack({
    id: "europatraume-brutalismus-3000",
    title: "Europaträume",
    artist: "Brutalismus 3000",
    query: "Europaträume Brutalismus 3000",
    appleMusicUrl: "https://music.apple.com/us/song/europatr%C3%A4ume/1755210180",
    spotifyUrl: "https://open.spotify.com/track/0PYX7X0wTBT5WvKzNCWtk2",
  }),
  musicTrack({
    id: "everytime-idemi",
    title: "Everytime",
    artist: "IDEMI, Lustral",
    query: "Everytime IDEMI Lustral",
    appleMusicUrl: "https://music.apple.com/at/album/everytime/1833936100?i=1833936101",
    spotifyUrl: "https://open.spotify.com/track/5uaHSOou5ernQBKhfVse1f",
  }),
  musicTrack({
    id: "genesis-grimes",
    title: "Genesis",
    artist: "Grimes",
    query: "Genesis Grimes",
    appleMusicUrl: "https://music.apple.com/at/album/genesis/1544356705?i=1544356709",
    spotifyUrl: "https://open.spotify.com/track/3cjvqsvvU80g7WJPMVh8iq",
  }),
  musicTrack({
    id: "key-to-my-heart-bovski",
    title: "Key To My Heart",
    artist: "BOVSKI",
    query: "Key To My Heart BOVSKI",
    appleMusicUrl: "https://music.apple.com/at/album/key-to-my-heart/1869879422?i=1869879423",
    spotifyUrl: "https://open.spotify.com/track/2LEFdBlzEJQRKTjI47oHSS",
  }),
  musicTrack({
    id: "pushe-packs-kev-koko",
    title: "Pushe Packs",
    artist: "Kev Koko, Bauernfeind, Pashanim",
    query: "Pushe Packs Kev Koko Bauernfeind Pashanim",
    appleMusicUrl: "https://music.apple.com/us/song/pushe-packs-feat-pashanim/1754345848",
    spotifyUrl: "https://open.spotify.com/track/54f2IdWSfeTb1LxmpvVb0K",
  }),
  musicTrack({
    id: "samurai-schwert-yung-hurn",
    title: "Samurai Schwert",
    artist: "Yung Hurn",
    query: "Samurai Schwert Yung Hurn",
    appleMusicUrl: "https://music.apple.com/at/album/samurai-schwert/1850509856?i=1850509859",
    spotifyUrl: "https://open.spotify.com/track/4W8Nib7ekr4ydmfk0iaBUc",
  }),
  musicTrack({
    id: "shabab-e-s-im-vip-pashanim",
    title: "Shabab(e)s im VIP",
    artist: "Pashanim, Ceren",
    query: "Shabab(e)s im VIP Pashanim Ceren",
    appleMusicUrl: "https://music.apple.com/us/song/shabab-e-s-im-vip/1811097939",
    spotifyUrl: "https://open.spotify.com/track/1JjHQ4lfAjbDq7wmOmH9wM",
  }),
  musicTrack({
    id: "sulk-tr-st",
    title: "Sulk",
    artist: "TR/ST",
    query: "Sulk TR/ST",
    appleMusicUrl: "https://music.apple.com/at/album/sulk/1442350386?i=1442350986",
    spotifyUrl: "https://open.spotify.com/track/1CuNAntYhT2j6LNJoIEfF4",
  }),
  musicTrack({
    id: "sundress-a-ap-rocky",
    title: "Sundress",
    artist: "A$AP Rocky",
    query: "Sundress A$AP Rocky",
    appleMusicUrl: "https://music.apple.com/at/album/sundress/1442956429?i=1442956431",
    spotifyUrl: "https://open.spotify.com/track/2aPTvyE09vUCRwVvj0I8WK",
  }),
  musicTrack({
    id: "ten-fred-again",
    title: "ten",
    artist: "Fred again.., Jozzy",
    query: "ten Fred again.. Jozzy",
    appleMusicUrl: "https://music.apple.com/at/album/ten/1706861926?i=1706861929",
    spotifyUrl: "https://open.spotify.com/track/5QOBT97OmYCZo1W5u7tRrB",
  }),
  musicTrack({
    id: "ufo361-match-3",
    title: "Match 3",
    artist: "Ufo361, lucidbeatz",
    query: "Match 3 Ufo361 lucidbeatz",
    appleMusicUrl: "https://music.apple.com/at/album/match-3/1689023482?i=1689023491",
    spotifyUrl: "https://open.spotify.com/track/4iaDcHWWvPI63bMYpAIHhu",
  }),
  musicTrack({
    id: "vhs-01099",
    title: "VHS",
    artist: "01099, Gustav, Zachi",
    query: "VHS 01099 Gustav Zachi",
    appleMusicUrl: "https://music.apple.com/ca/song/vhs/1680053088",
    spotifyUrl: "https://open.spotify.com/track/2PE71wHgZG5Z6CLOxPDPe7",
  }),
  musicTrack({
    id: "vanished-crystal-castles",
    title: "Vanished",
    artist: "Crystal Castles",
    query: "Vanished Crystal Castles",
    appleMusicUrl: "https://music.apple.com/us/song/vanished/1132754196",
    spotifyUrl: "https://open.spotify.com/track/4bQ7mjty0UVlKRalhizpGT",
  }),
  musicTrack({
    id: "get-buck-lugatti",
    title: "get buck",
    artist: "Lugatti, Traya, Lugatti & 9ine",
    query: "get buck Lugatti Traya Lugatti & 9ine",
    appleMusicUrl: "https://music.apple.com/us/song/get-buck/1786937788",
    spotifyUrl: "https://open.spotify.com/track/39BYf3aOgW7C9in214a9YF",
  }),
];

const musicTrackOrder = [
  "sulk-tr-st",
  "don-t-stop-dj-heartstring",
  "key-to-my-heart-bovski",
  "everytime-idemi",
  "vanished-crystal-castles",
  "genesis-grimes",
  "samurai-schwert-yung-hurn",
  "europatraume-brutalismus-3000",
  "ten-fred-again",
  "vhs-01099",
  "pushe-packs-kev-koko",
  "shabab-e-s-im-vip-pashanim",
  "get-buck-lugatti",
  "camilla-yung-saint-paul",
  "sundress-a-ap-rocky",
  "ufo361-match-3",
];

const musicTracksById = new Map(musicTrackLibrary.map((track) => [track.id, track]));

export const musicTracks = musicTrackOrder.map((id) => {
  const track = musicTracksById.get(id);

  if (!track) {
    throw new Error(`Missing music track: ${id}`);
  }

  return track;
});

export function externalMusicUrl(service: "apple" | "spotify", query: string) {
  const encodedQuery = encodeURIComponent(query);
  return service === "apple"
    ? `https://music.apple.com/search?term=${encodedQuery}`
    : `https://open.spotify.com/search/${encodedQuery}`;
}
