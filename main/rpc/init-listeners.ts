import { BrowserWindow, ipcMain } from "electron";
import { commands, Commands } from "./commands";

interface IRpcRequest {
  command: keyof Commands;
  guid: string;
  data: any[];
}

interface IEvent {
  sender: {
    send(channel: string, data: any): void;
  };
}

export const initListeners = (window: BrowserWindow) => {
  ipcMain.on("rpc", async (_event: IEvent, args: IRpcRequest) => {
    // tslint:disable-next-line:ban-types
    const fn: Function = commands[args.command];

    const result = await fn.apply(null, args.data);
    window.webContents.send(`rpc:${args.guid}`, result);
  });
};
