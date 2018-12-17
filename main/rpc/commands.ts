// tslint:disable:object-literal-sort-keys
import { WorldRepository } from "../db/repositories/world-repository";

export const commands = {
  "get-worlds": async () => {
    const repo = new WorldRepository();
    return repo.find({});
  },
  "delete-world": async (_id: string) => {
    return;
  },
};

export type Commands = typeof commands;
