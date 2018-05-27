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
  }>
}

export type TopTrack = {
  +id: string,
  +name: string,
  +image: string,
  +album: Album,
  +artists: Array<Artist>,
}

export type TopTracks = Array<TopTrack>
