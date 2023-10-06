import { style } from "@vanilla-extract/css";

import { theme } from "../../styles/theme.css";

export const footer = style({
  background: theme.appBg.subtle,
  borderTop: `1px solid ${theme.border.subtle}`,
  width: "100%",
  padding: "2rem 0",
});

export const link = style({
  justifySelf: "flex-start",
  display: "inline-flex",
  alignItems: "center",
  padding: "0.25rem 0",
  ":hover": {
    textDecoration: "underline",
  },
});

export const linkIcon = style({
  color: theme.text.inlineIcon,
  marginRight: "0.5rem",
});
