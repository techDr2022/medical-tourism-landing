import { createTheme, alpha } from "@mui/material/styles";

const GREEN_500 = "#34d399";
const GREEN_600 = "#10b981";
const GREEN_700 = "#0d9488";
const GREEN_100 = "#d1fae5";
const GREEN_50 = "#ecfdf5";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: GREEN_600,
      light: GREEN_500,
      dark: GREEN_700,
    },
    secondary: {
      main: GREEN_700,
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#171717",
      secondary: alpha("#171717", 0.7),
      disabled: alpha("#171717", 0.5),
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
      color: "#171717",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
      color: "#171717",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
      color: "#171717",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: alpha("#171717", 0.7),
    },
    body2: {
      fontSize: "0.9375rem",
      lineHeight: 1.6,
      color: alpha("#171717", 0.7),
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: "0.9375rem",
          padding: "10px 24px",
          transition: "all 0.2s ease",
        },
        contained: {
          backgroundColor: GREEN_600,
          color: "#ffffff",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: GREEN_700,
            boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
          },
        },
        outlined: {
          borderColor: alpha("#171717", 0.2),
          borderWidth: "1px",
          color: "#171717",
          backgroundColor: "transparent",
          "&:hover": {
            borderColor: GREEN_600,
            backgroundColor: alpha(GREEN_50, 0.5),
            borderWidth: "1px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#ffffff",
            "& fieldset": {
              borderColor: alpha("#171717", 0.2),
            },
            "&:hover fieldset": {
              borderColor: alpha("#171717", 0.3),
            },
            "&.Mui-focused fieldset": {
              borderColor: GREEN_600,
              borderWidth: "1px",
            },
          },
          "& .MuiInputLabel-root": {
            color: alpha("#171717", 0.7),
          },
          "& .MuiInputBase-input": {
            color: "#171717",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          border: `1px solid ${alpha("#171717", 0.08)}`,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          border: `1px solid ${alpha("#171717", 0.08)}`,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
          transition: "all 0.2s ease",
        },
      },
    },
  },
});
