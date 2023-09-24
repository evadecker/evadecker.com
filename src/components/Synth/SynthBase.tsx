import classNames from "classnames";
import type { PropsWithChildren } from "react";

import { lightSynthClass } from "./synth.css";
import * as styles from "./synth.css";

interface SynthBaseProps extends PropsWithChildren {
  onMouseUp: React.MouseEventHandler<HTMLDivElement>;
  onTouchEnd: React.TouchEventHandler<HTMLDivElement>;
}

export const SynthBase = ({
  children,
  onMouseUp,
  onTouchEnd,
}: SynthBaseProps) => {
  return (
    <div
      id="synth"
      className={classNames(styles.synth, lightSynthClass)}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
    >
      <svg
        width="100%"
        viewBox="0 0 270 152"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="synth-base">
          <rect
            className={styles.synthBase}
            x="0"
            y="0"
            width="270"
            height="148"
            rx="12"
          ></rect>
          <path
            className={styles.synthEndcap}
            d="M0,9.99832468 C0,4.47640243 4.47593818,0 10,0 L20,0 L20,148 L10,148 C4.4771525,148 0,143.530333 0,138.001675 L0,9.99832468 Z"
          ></path>
          <path
            className={styles.synthEndcap}
            d="M250,0 L260,0 C265.522847,0 270,4.46966749 270,9.99832468 L270,138.001675 C270,143.523598 265.524062,148 260,148 L250,148 L250,0 Z"
          ></path>
        </g>
        {children}
      </svg>
    </div>
  );
};