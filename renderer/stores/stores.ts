import { ThemeStore } from "./theme-store";

export let themeStore: ThemeStore;

export const initializeStores = async () => {
  [themeStore] = await Promise.all([
    ThemeStore.initialize(),
  ]);
};
