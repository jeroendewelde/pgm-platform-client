import {
  createTheme,
  ThemeProvider,
  Palette,
  ThemeOptions,
} from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import { colors } from "../utils/constants";

declare module "@mui/material/styles" {
  //   interface Palette {
  //     danger: Palette["primary"];
  //   }
  //   interface PaletteOptions {
  //     danger?: PaletteOptions["primary"];
  //   }
  //   interface Theme {
  //     status: {
  //       danger: string;
  //       //   danger: React.CSSProperties["color"];
  //     };
  //   }
  //   // allow configuration using `createTheme`
  //   interface ThemeOptions {
  //     status?: {
  //       danger?: string;
  //       //   danger?: React.CSSProperties["color"];
  //     };
  //   }
  //   interface MuiButton {
  //     // blue: "blue";
  //     variants: ["test"];
  //   }
  //   interface Palette {
  //     // primary: {
  //     main: "#F00";
  //     // };
  //   }
}

export const adminTheme = createTheme({
  //   status: {
  //     danger: orange[500],
  //   },
  palette: {
    // type: "light",
    primary: {
      main: "#7E57C5",
    },
    secondary: {
      main: "#30D9CE",
    },
    // danger: {
    //   main: colors.delete,
    //   // contrastText: colors.delete_bg,
    //   contrastText: "#FFF",
    // },
  },
  //   status: {
  //     danger: "#e53e3e",
  //   },
  //   components: {
  //     MuiButton: {
  //       variants: [
  //         {
  //           props: { variant: "outlined", color: "warning" },
  //           //   colors: {
  //           //     primary: {
  //           //       main: "red",
  //           //     },
  //           //   },

  //           style: {
  //             // textTransform: "capitalize",
  //             // color: "red",
  //             // border: "1px solid red",
  //           },
  //         },
  //       ],
  //     },
  //   },
  typography: {
    fontFamily: "Prompt",
    h1: {
      fontSize: "2.441rem",
      //   border: "2px solid #000",
      paddingBottom: "1rem",
    },
    h2: {
      fontSize: "1.953rem",
      paddingBottom: "1rem",
      //   fontSize: "2.441rem",
    },
    h3: {
      fontSize: "1.953rem",
    },
    h4: {
      fontSize: "1.563rem",
    },
    h5: {
      fontSize: "1.25rem",
    },
  },
});
