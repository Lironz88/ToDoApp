// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: 'rgb(58, 58, 58)', 
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
            fontSize: '1rem', 
            padding: '12px 24px',
          '&:hover': {
            fontWeight: 'bold'
          }
        },
      },
    },
  },
});

export default theme;
