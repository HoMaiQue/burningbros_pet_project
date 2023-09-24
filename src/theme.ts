import { createTheme } from '@mui/material/styles'
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Record<number, string>
  }
  interface PaletteOptions {
    neutral: Record<number, string>
  }
  interface Palette {
    textColor: Record<number, string>
  }
  interface PaletteOptions {
    textColor: Record<number, string>
  }

  interface Theme {
    pet: Record<string, string>
  }
  interface ThemeOptions {
    pet?: Record<string, string>
  }
}

const theme = createTheme({
  pet: {
    searchHeight: '42px',
    titleHeight: '24px',
    mainLayoutHeight: '880px',
    productItemHeight: '96px'
  },
  palette: {
    primary: {
      50: '#f0e7fd',
      100: '#e1d0fc',
      200: '#d1b8fa',
      300: '#c2a1f9',
      400: '#b389f7',
      500: '#a471f5',
      600: '#955af4',
      700: '#8542f2',
      800: '#762bf1',
      900: '#6713EF'
    },
    neutral: {
      100: '#202020',
      200: '#353C49',
      300: '#505866',
      400: '#B1B8C0',
      500: '#D9E0E8',
      600: '#E9EDF1',
      700: '#F2F4F6',
      800: '#F8F8F9',
      900: '#FFFFFF'
    },
    textColor: {
      100: '#353C49',
      200: '#676E7B',
      300: '#9198A0',
      400: '#B1B8C0',
      500: '#D1D6DA',
      600: '#FFFFFF'
    }
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'Pretendard',
          '*::-webkit-scrollbar': {
            width: '4px',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-track': {
            background: '#D9E0E8'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#D9E0E8'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: '#B1B8C0'
          }
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Pretendard',
          textTransform: 'none'
        }
      }
    },

    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: () => ({
          fontSize: '0.875rem',
          fontFamily: 'Pretendard'
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Pretendard',
          fontSize: '0.875rem'
        },
        body2: {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '18px'
        },
        body1: {
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '20px'
        },
        h1: {
          fontWeight: '600',
          fontSize: '24px',
          lineHeight: '30px'
        },
        h2: {
          fontWeight: '600',
          fontSize: '20px',
          lineHeight: '24px'
        },
        h3: {
          fontSize: '18px',
          fontWeight: '600',
          lineHeight: '22px'
        },
        h4: {
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '20px'
        }
      }
    }
  }
})

export default theme
