import { Set } from "./set";
import { Song } from "./song";
import { User } from "./user";

export class Response {
  constructor(
    public error: boolean, 
    public codigo: number,
    public mensaje: string,
    public set: Set,
    public song: Song,
    public user: User,
  ) {}
}
