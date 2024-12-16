import { Song } from "./song";

export class Set {

    constructor(public id_set: number = 0,
        public id_user: number = 0,
        public titulo: string,
        public imagen: string,
        public songs: Song []){}

}
