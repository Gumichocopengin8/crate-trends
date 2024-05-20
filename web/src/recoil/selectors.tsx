import { selector } from 'recoil';
import init from 'web_assembly/pkg';

export const wasmInitSelector = selector<boolean>({
  key: 'wasmInitSelector',
  get: async () => {
    return await init()
      .then(() => true)
      .catch(() => {
        console.error('failed to load web assembly');
        return false;
      });
  },
});
