import type { Theme } from '@mui/material';

function getPageHeight(theme: Theme, countBottomBar = false) {
  const topSpacing = Number(theme.mixins.toolbar.minHeight) + parseInt(theme.spacing(1));
  const spacing = countBottomBar ? topSpacing + 75 : topSpacing;

  return `calc(100vh - ${spacing}px)`;
}

export { getPageHeight };
