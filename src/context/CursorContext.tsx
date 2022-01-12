import { createContext } from "react";

interface CursorContextProps {
  cursorHover: boolean;
  setCursorHover: (value: boolean) => void;
}

export const CursorContext = createContext<CursorContextProps>({
  cursorHover: false,
  setCursorHover: () => {},
});
