import { apiBase } from './consts';

export const path2url = (path?: string) => `${apiBase}${path}`;
