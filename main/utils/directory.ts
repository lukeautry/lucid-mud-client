import { app } from "electron";
import path from "path";

export const getStorageDirectory = () => {
  if (process.env.NODE_ENV === "development") {
    return path.join(__dirname, "../../../data");
  }

  return path.join(app.getAppPath(), "data");
};
