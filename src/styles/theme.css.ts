import {
  blackA,
  mauve,
  mauveDark,
  plum,
  plumDark,
  whiteA,
} from "@radix-ui/colors";
import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";

export const theme = createGlobalThemeContract(
  {
    background: {
      default: "",
      alt: "",
    },
    text: {
      default: "",
      subtle: "",
      selection: "",
    },
    border: {
      default: "",
      subtle: "",
    },
    fontWeight: {
      normal: "",
      medium: "",
      bold: "",
    },
    color: {
      ...Object.fromEntries(
        Object.entries(plum).map(([key, _value]) => [key, ""])
      ),
      ...Object.fromEntries(
        Object.entries(blackA).map(([key, _value]) => [key, ""])
      ),
      ...Object.fromEntries(
        Object.entries(whiteA).map(([key, _value]) => [key, ""])
      ),
    },
    synth: {
      base: "",
      endcap: "",
      lcdOutline: "",
      keysOutline: "",
      whitekey: "",
      whitekeyPressed: "",
      blackkey: "",
      blackkeyPressed: "",
      betweenKeys: "",
      keyLetter: "",
      lcd: {
        bg: "",
        light: "",
        medium: "",
        dark: "",
      },
    },
  },
  (_value, path) => `${path.join("-")}`
);

createGlobalTheme('[data-theme="light"]', theme, {
  background: {
    default: plum.plum1,
    alt: plum.plum2,
  },
  text: {
    default: plum.plum12,
    subtle: plum.plum11,
    selection: plum.plum8,
  },
  border: {
    default: plum.plum4,
    subtle: plum.plum3,
  },
  fontWeight: {
    normal: "440",
    medium: "500",
    bold: "700",
  },
  color: {
    ...plum,
    ...blackA,
    ...whiteA,
  },
  synth: {
    base: plumDark.plum4,
    endcap: plumDark.plum2,
    lcdOutline: plumDark.plum2,
    keysOutline: plumDark.plum2,
    whitekey: whiteA.whiteA12,
    whitekeyPressed: plum.plum11,
    blackkey: mauveDark.mauve5,
    blackkeyPressed: plumDark.plum5,
    betweenKeys: mauveDark.mauve11,
    keyLetter: blackA.blackA12,
    lcd: {
      bg: plum.plum4,
      light: plum.plum1,
      medium: plum.plum8,
      dark: plum.plum9,
    },
  },
});

createGlobalTheme('[data-theme="dark"]', theme, {
  background: {
    default: plumDark.plum1,
    alt: plumDark.plum2,
  },
  text: {
    default: plumDark.plum12,
    subtle: plumDark.plum11,
    selection: plumDark.plum8,
  },
  border: {
    default: plumDark.plum4,
    subtle: plumDark.plum3,
  },
  // Weights on dark background slightly lower to reduce bleed
  fontWeight: {
    normal: "380",
    medium: "420",
    bold: "620",
  },
  color: {
    ...plumDark,
    ...blackA,
    ...whiteA,
  },
  synth: {
    base: plum.plum10,
    endcap: plum.plum12,
    lcdOutline: plum.plum12,
    keysOutline: plum.plum12,
    whitekey: whiteA.whiteA12,
    whitekeyPressed: plum.plum9,
    blackkey: mauve.mauve12,
    blackkeyPressed: plum.plum9,
    betweenKeys: mauve.mauve8,
    keyLetter: blackA.blackA12,
    lcd: {
      bg: plum.plum4,
      light: plum.plum1,
      medium: plum.plum8,
      dark: plum.plum9,
    },
  },
});
