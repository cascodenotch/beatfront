import { Song } from "./song";

export class DjSet {
    constructor(
        public id_set: number,
        public id_user: number = 0,
        public titulo: string,
        public imagen: string,
        public songs: Song[],
        public id_playlist: string // Asegúrate de usar el nombre correcto
    ) {}
}
