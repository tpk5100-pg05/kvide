import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { green, purple } from '@mui/material/colors';
import fontColorContrast from 'font-color-contrast';

import { Themes } from './types';

const sharedTheme: ThemeOptions = {
  palette: {
    primary: {
      main: purple[400],
    },
    secondary: {
      main: green[600],
    },
    background: {
      default: purple[50],
    },
    getContrastText: fontColorContrast,
  },
  components: {
    MuiIconButton: {
      defaultProps: {
        color: 'inherit',
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'inherit',
      },
    },
  },
} as const;

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
  },
};
const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: 'black',
    },
  },
};

const themes: Record<Themes, ThemeOptions> = {
  light: deepmerge(sharedTheme, lightTheme),
  dark: deepmerge(sharedTheme, darkTheme),
};

export default themes;
