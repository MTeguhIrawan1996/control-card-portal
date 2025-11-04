export const GROUPS_KEYS = {
  root: () => ['GROUPS'],
  list: (args?: object) => [...GROUPS_KEYS.root(), 'LIST', { ...(args || {}) }],
};
