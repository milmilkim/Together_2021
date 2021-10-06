import { RecoilRoot, atom } from 'recoil';

const layoutState = atom({
  key: 'layout',
  default: true,
});

const loginState = atom({
  key: 'login',
  default: false,
});

export { layoutState, loginState };
