import { mauve, mauveDark } from "@radix-ui/colors";
import { useEffect, useState } from "react";

import { Icon } from "../Icon/Icon";
import * as styles from "./toggle-theme.css";

type Theme = "light" | "dark";

export const ToggleTheme = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [activeTheme, setActiveTheme] = useState<Theme>(
    document.body.dataset.theme as Theme
  );
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    if (!activeTheme) return;

    // Update class on body
    const inactiveTheme = activeTheme === "light" ? "dark" : "light";
    document.body.classList.remove(inactiveTheme);
    document.body.classList.add(activeTheme);

    // Update localStorage
    localStorage.setItem("theme", activeTheme);

    // Update meta theme
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme !== null)
      metaTheme.setAttribute(
        "content",
        activeTheme === "dark" ? mauveDark.mauve1 : mauve.mauve1
      );
  }, [activeTheme]);

  return (
    <>
      <button
        type="button"
        data-theme-toggle
        aria-label="Toggle theme"
        onClick={() => {
          setActiveTheme(inactiveTheme);
        }}
        onMouseOver={() => {
          setIsHovering(true);
        }}
        onMouseOut={() => {
          setIsHovering(false);
        }}
        className={styles.button}
      >
        <Icon
          icon="sun"
          variant={isHovering ? "filled" : "line"}
          className={styles.sun}
        />
        <Icon
          icon="moon"
          variant={isHovering ? "filled" : "line"}
          className={styles.moon}
        />
      </button>
    </>
  );
};
