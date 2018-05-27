// @flow

export type Album = {
  +name: string,
  +images: ?Array<{
    +height: number,
    +url: string,
    +width: number,
  }>
}

export type Artist = {
  +id: string,
  +name: string,
  +images: ?Array<{
    +height: number,
    +url: string,
    +width: number,
  }>,
  +genres: Array<string>,
}

export type Track = {
  +id: string,
  +name: string,
  +image: string,
  +album: Album,
  +artists: Array<Artist>,
  +uri: string,
}

export type TopTracks = Array<Track>

export type TopArtists = Array<Artist>

export type Recommendations = Array<Track>
