import { h } from "hastscript";
import type { ElementContent } from "node_modules/rehype-autolink-headings/lib";
import type { Options } from "rehype-autolink-headings";

const AnchorLinkIcon = h(
  "svg",
  {
    width: 24,
    height: 24,
    version: 1.1,
    viewBox: "0 0 24 24",
    xlmns: "http://www.w3.org/2000/svg",
  },
  h("path", {
    fillRule: "evenodd",
    fill: "currentcolor",
    d: "M17.6572 14.8282L16.2429 13.414L17.6572 11.9998C19.2193 10.4377 19.2193 7.90506 17.6572 6.34296C16.0951 4.78086 13.5624 4.78086 12.0003 6.34296L10.5861 7.75717L9.17188 6.34296L10.5861 4.92875C12.9292 2.5856 16.7282 2.5856 19.0714 4.92875C21.4145 7.27189 21.4145 11.0709 19.0714 13.414L17.6572 14.8282ZM14.8287 17.6567L13.4145 19.0709C11.0714 21.414 7.27238 21.414 4.92923 19.0709C2.58609 16.7277 2.58609 12.9287 4.92923 10.5856L6.34345 9.17139L7.75766 10.5856L6.34345 11.9998C4.78135 13.5619 4.78135 16.0946 6.34345 17.6567C7.90555 19.2188 10.4382 19.2188 12.0003 17.6567L13.4145 16.2425L14.8287 17.6567ZM14.8287 7.75717L16.2429 9.17139L9.17188 16.2425L7.75766 14.8282L14.8287 7.75717Z",
  }),
);

export const autolinkConfig: Options = {
  behavior: "append",
  group: ({ tagName }) =>
    h(`div.heading-wrapper.level-${tagName}`, {
      tabIndex: -1,
    }) as ElementContent,
  content: [AnchorLinkIcon as ElementContent],
};
