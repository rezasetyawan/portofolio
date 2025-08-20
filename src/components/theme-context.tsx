import { createContext, useContext } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (t: "light" | "dark") => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}
