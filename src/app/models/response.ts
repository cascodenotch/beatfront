import { DjSet } from "./dj-set";
import { Song } from "./song";
import { User } from "./user";

export class Response {
  constructor(
    public error ?: boolean, 
    public codigo ?: number,
    public mensaje ?: string,
    public set ?: DjSet,
    public song ?: Song,
    public user ?: User,
    public id_set ? :number,
    public djset_title ?:string,
    public songs ?: Song[]
  ) {}
}
