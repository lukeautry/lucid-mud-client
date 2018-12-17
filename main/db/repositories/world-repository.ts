import { BaseRepository } from "../base-repository";
import { IWorld } from "../models/world";

export class WorldRepository extends BaseRepository<IWorld> {
  constructor() {
    super("worlds");
  }
}
