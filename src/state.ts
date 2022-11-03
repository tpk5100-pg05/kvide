import { atom } from 'recoil';

const bottomHeight = atom({
  key: 'BottomHeight',
  default: 0,
});

const topHeight = atom({
  key: 'TopHeight',
  default: 0,
});

export { bottomHeight, topHeight };
