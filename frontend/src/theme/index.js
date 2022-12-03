import { createTheme, Theme } from '@mui/material/styles';

const defaultTheme = createTheme({});

const theme = createTheme({
  palette: {
    primary: {
      main: '#344052',
      contrastText: '#fff',
    },

    warning: {
      main: '#FBB03B',
      contrastText: '#fff',
    },

    error: {
      main: '#C1272D',
      contrastText: '#fff',
    },

    info: {
      light: '#53bbe7',
      main: '#29AAE2',
      dark: '#1c769e',
      contrastText: '#fff',
    },

    template: {
      light: '#404652',
      main: '#111827',
      dark: '#0b101b',
      contrastText: defaultTheme.palette.grey[200],
    },

    orange: {
      light: '#f8a94c',
      main: '#F79420',
      dark: '#ac6716',
      contrastText: '#fff',
    },

    deepOrange: {
      light: '#f37b51',
      main: '#F15B26',
      dark: '#a83f1a',
      contrastText: '#fff',
    },

    deepPurple: {
      light: '#8458a6',
      main: '#662F90',
      dark: '#472064',
      contrastText: '#fff',
    },

    purple: {
      light: '#a753a3,',
      main: '#92298D',
      dark: '#661c62',
      contrastText: '#fff',
    },

    action: {
      disabled: '',
      disabledBackground: '',
    },
  },

  typography: {
    h6: {
      lineHeight: 1.2,
    },
  },

  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#344052',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          '&.Mui-disabled': {
            opacity: 0.5,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 0.5,
          },
        },
      },
    },
  },
});

export default theme;

// TODO: Add following colors in to theme
// #344052 + primary
// #F79420 + orange
// #0D71BA
// #92298D + purple
// #FBB03B + warning
// #F15B26 + deepOrange
// #C1272D + error
// #29AAE2 + info
// #662F90 + deepPurple
// #8795A1
// #525252
