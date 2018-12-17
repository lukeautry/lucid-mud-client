const appPaths = {
  terminal: {
    path: "/terminal",
  },
  worlds: {
    path: "/worlds",
  },
};

/**
 * Recursively search the data structure above and find the object that was passed
 * This allows us to do something like:
 * getPath(paths.dashboard.settings) => '/dashboard/settings'
 * Now the caller doesn't need to know the full structure of the app to form a meaningful path
 */
export const getPath = (searchFn: (paths: typeof appPaths) => { path: string }, params?: any) => {
  let { path } = searchFn(appPaths);

  if (params) {
    Object.keys(params).forEach((key) => {
      const value = params[key];
      path = path.replace(`:${key}`, value);
    });
  }

  return path;
};
