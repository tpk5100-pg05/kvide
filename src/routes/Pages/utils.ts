import type { Theme } from '@mui/material';

function getPageHeight(theme: Theme, topBarHeight = 0, bottomBarHeight = 0) {
  const spacing = topBarHeight + bottomBarHeight;

  return `calc(100vh - ${spacing}px)`;
}

export { getPageHeight };
