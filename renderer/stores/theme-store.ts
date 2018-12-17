import { observable } from "mobx";
import { defaultTheme } from "../common/colors/themes/default-theme";

export class ThemeStore {
  public static initialize() {
    const theme = defaultTheme;
    return new ThemeStore(theme);
  }

  @observable public theme: ITheme;

  protected constructor(theme: ITheme) {
    this.theme = theme;
  }
}
