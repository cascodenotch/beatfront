export class Song {
    constructor(
        public albumImage: string,
        public artistName: string,
        public durationMs: string,
        public songId: string,
        public songName: string,
        public danceability : number,
        public energy: number, 
        public tempo: number,
        public key: number
      ) {}
}
