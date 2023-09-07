import { useState, useEffect } from "react";
import styles from "./samstickers.module.css";
import { useStore } from "@nanostores/react";
import { getRandomValueBetween } from "../../helpers";
import { motion, type DragHandlers } from "framer-motion";
import { incrementTopZIndex, topZIndex } from "../../stores/sam";

type VariantData = {
  path: string;
  srcSet: string;
  src: string;
  alt: string;
};

const variantsData: VariantData[] = [
  {
    path: "M61.3881 320.98C60.1679 331.073 68.4008 343 82.4363 343C91.893 343 98.3821 336.272 102.265 327.708C106.84 317.616 98.299 289.48 102.265 282.446C107.092 273.883 129.03 267.227 137.345 271.742C144.666 275.718 146.51 299.278 154.427 305.995C162.359 312.723 174.56 307.913 180.051 295.903C183.737 287.84 170.595 262.873 174.56 257.368C177.949 252.664 235.57 266.237 245.331 271.742C251.561 275.255 250.517 288.257 256.923 293.762C263.329 299.267 281.631 304.772 290.173 305.995C298.714 307.218 312.746 300.796 318.847 300.796C324.948 300.796 340.2 320.675 347.216 315.781C351.346 312.901 347.216 286.728 345.691 278.165C344.166 269.601 353.282 247.488 342.318 228.527C312.66 177.236 241.19 99.5016 201.692 69.8028C189.49 60.6281 164.708 52.4775 135.192 57.5694C106.822 62.4633 64.9173 95.0192 58.3201 118.431C50.6761 145.557 61.3881 177.361 61.3881 217.518C61.3881 234.339 51.6269 250.64 51.0168 263.485C50.5288 273.761 60.7813 289.376 65.659 295.903C67.4874 298.349 62.3642 312.907 61.3881 320.98Z",
    srcSet: "/images/sam/sam1.webp",
    src: "/images/sam/sam1.png",
    alt: "Sam sleeping in the shape of a capital A",
  },
  {
    path: "M77.8782 149.923C47.109 163.016 37.3201 195.57 32.0517 199.677C25.749 204.591 12.3735 212.591 9.82512 221.936C6.83878 232.886 25.2042 251.395 28.4821 260.382C33.1801 273.261 56.6016 270.053 59.2203 276.927C61.839 283.801 76.2416 312.934 107.338 314.898C138.435 316.862 149.564 283.147 148.909 275.291C148.255 267.435 130.579 260.233 124.032 254.996C117.485 249.759 123.736 239.432 132.574 233.54C143.703 226.121 195.094 255.799 236.011 253.18C245.859 252.55 263.21 246.127 265.798 238.45C268.386 230.773 262.701 225.173 265.798 221.363C268.895 217.553 285.584 218.936 294.245 221.936C301.804 224.554 309.302 227.5 315.194 228.482C321.086 229.464 331.561 224.554 336.798 221.936C342.035 219.317 343.999 221.936 355.456 224.554C366.913 227.173 373.132 218.335 376.405 212.443C379.678 206.551 371.495 199.677 369.859 196.076C368.222 192.475 369.858 189.53 371.495 183.638C373.132 177.746 369.531 174.472 369.858 169.89C370.186 165.307 384.261 146.322 389.498 139.12C394.736 131.919 389.171 121.117 382.297 120.462C375.423 119.808 348.254 131.919 342.362 132.246C336.471 132.574 304.392 125.7 296.863 124.063C289.335 122.426 278.533 110.643 274.605 109.333C270.677 108.024 267.404 114.243 265.44 116.535C263.476 118.826 253.983 116.862 215.03 116.535C176.078 116.207 108.647 136.829 77.8782 149.923Z",
    srcSet: "/images/sam/sam2.webp",
    src: "/images/sam/sam2.png",
    alt: "Sam, very flat, looking uninterested in life's beauty",
  },
  {
    path: "M225.074 98.9828C225.914 103.74 223.32 110.61 217.798 112.696C212.185 114.816 194.295 107.659 170.221 107.659C134.663 107.659 91.5615 117.729 71.4128 127.69C46.5036 140.004 16.0005 186.728 16 205.492C15.9993 229.84 42.5698 265.543 54.3412 275.737C65.1493 285.097 63.5766 305.123 67.4947 316.038C71.3193 326.692 83.6709 327.296 90.1636 325.553C96.8632 323.755 100.816 313.078 103.894 312.798C109.754 312.266 111.993 322.754 116.488 327.911C121.187 333.302 133.822 336.747 143.914 334.628C153.5 332.614 160.672 313.96 153.413 305.683C147.907 299.406 129.7 272.615 133.542 270.42C137.46 268.181 168.788 281.496 184.757 286.092C196.344 289.428 213.303 291.69 220.317 289.85C226.543 288.216 233.716 275.339 228.975 267.621C223.643 258.941 185.877 248.591 180.296 244.232C173.885 239.224 173.063 229.075 180.296 224.802C209.376 207.627 265.621 231.68 300.061 242.154C318.925 247.891 357.992 261.464 371.442 256.266C380.958 252.588 379.262 237.956 380.381 233.478C381.501 229 386.801 217.407 382.06 210.809C376.87 203.587 341.743 186.342 305.658 174.987C299.797 173.143 295.615 147.804 296.422 140.004C297.245 132.049 300.991 114.354 303.699 100.543C306.497 86.2704 305.658 70.5984 299.781 68.0793C293.904 65.5603 283.829 74.3549 279.071 76.4752C274.316 78.5944 254.739 77.4334 249.422 74.3549C244.105 71.2764 233.734 62.483 227.857 65.2814C221.98 68.0797 224.234 94.2251 225.074 98.9828Z",
    srcSet: "/images/sam/sam3.webp",
    src: "/images/sam/sam3.png",
    alt: "Sam, laying in the sun, eyes closed",
  },
  {
    path: "M196.558 348.468C185.724 350.494 177.598 346.104 173.196 345.766C168.795 345.429 157.96 351.169 149.834 346.779C142.758 342.956 135.275 328.882 137.645 315.713C138.782 309.398 125.994 290.206 121.055 284.984C104.126 267.087 96 237.372 96 206.643C96 179.291 110.559 140.121 116.315 135.731C122.071 131.341 119.701 124.587 119.023 112.431C118.346 100.275 132.228 95.5471 133.244 89.8066C134.26 84.0661 129.558 78.857 130.535 66.8439C131.512 54.831 152.543 48.4103 171.503 51.9861C196.559 56.7115 219.582 72.9227 222.968 74.6111C226.353 76.2995 240.912 64.8185 247.007 66.8446C253.101 68.8706 244.128 92.508 247.007 98.2491C251.408 107.028 270.655 123.574 275.448 131.341C278.156 135.731 284.501 162.645 286.282 169.161C288.313 176.59 300.094 192.312 302.534 206.643C305.581 224.54 293.054 268.1 283.235 280.257C273.637 292.14 246.33 296.128 244.637 301.193C242.671 307.074 228.385 319.09 222.291 320.44C216.196 321.791 209.274 346.091 196.558 348.468Z",
    srcSet: "/images/sam/sam4.webp",
    src: "/images/sam/sam4.png",
    alt: "Sam looking toward the sun, eyes closed in bliss",
  },
  {
    path: "M191.905 373.035C187.738 387.918 165.413 390 157.297 390C149.467 390 131.425 386.275 126.34 382.263C117.41 375.218 121.733 358.747 127.311 339.398C132.68 320.774 119.858 295.867 117.41 265.574C114.491 229.455 128.214 202.768 125.832 160.201C125.466 153.662 132.689 147.351 139.437 150.078C146.073 152.759 150.241 132.22 165.124 115.848C180.82 98.5832 209.663 94.3604 204.714 85.7834C200.249 78.044 195.784 42.9193 207.384 31.0122C221.053 16.9816 263.644 5.71006 273.765 9.87794C282.303 13.3941 285.518 29.8213 279.123 40.2397C274.736 47.3859 245.784 56.0163 238.044 56.0163C229.114 56.0163 262.071 111.085 263.942 142.341C266.115 178.659 255.643 225.095 245.486 248.311C236.239 269.448 237.449 317.966 230.007 327.194C223.821 334.865 206.272 330.987 200.538 333.445C196.37 335.231 196.073 358.151 191.905 373.035Z",
    srcSet: "/images/sam/sam5.webp",
    src: "/images/sam/sam5.png",
    alt: "Samwise with the curliest tail and the biggest eyes",
  },
  {
    path: "M383.513 110.886C377.85 111.06 361.697 124.732 348.338 125.012C329.3 125.412 324.948 101.387 312.661 104.679C302.006 107.534 297.884 138.531 295.887 146.119C293.745 154.259 283.218 160.262 248.007 144.17C212.795 128.078 178.099 123.94 139.856 142.919C102.437 161.49 94.3482 191.753 80.7155 196.718C63.273 203.072 45.0422 192.695 19.6072 213.092C0.107999 228.729 4.05391 261.594 21.6104 280.737C36.1462 296.586 73.7793 311.787 87.9886 320.386C126.071 343.434 125.758 284.295 86.9214 266.261C65.8234 256.463 55.3801 243.812 65.8219 237.655C76.2637 231.499 111.991 259.543 127.924 266.359C139.948 271.502 177.483 274.576 240.164 262.819C283.592 254.673 322.276 265.919 347.256 252.598C359.893 245.859 349.032 214.722 358.467 207.946C386.071 188.123 383.915 167.541 384.032 160.456C384.218 149.214 404.266 110.248 383.513 110.886Z",
    srcSet: "/images/sam/sam6.webp",
    src: "/images/sam/sam6.png",
    alt: "Sam, asleep and partially in the sun",
  },
  {
    path: "M110.101 171.947C107.697 189.998 116.567 213.844 129.498 227.815C134.916 233.669 109.789 243.893 107.378 253.028C97.8501 289.138 135.835 274.145 138.687 285.047C142.43 299.354 126.095 318.976 147.874 332.062C167.502 343.854 204.241 298.365 216.616 289.138C232.611 277.211 277.531 267.332 287.74 243.149C294.61 226.873 295.567 190.002 301.693 183.529C309.859 174.9 333 190.685 333 159.685C333 145.036 317.686 139.246 303.053 139.246C291.741 139.246 270.315 131.748 266.641 122.554C262.967 113.36 289.442 82.3523 277.531 77.583C265.62 72.8137 233.291 92.9128 211.171 105.18C204.095 109.104 164.89 108.245 145.152 102.114C129.158 97.1467 80.1538 51.3541 71.3057 70.7718C57.3364 101.428 111.462 161.727 110.101 171.947Z",
    srcSet: "/images/sam/sam7.webp",
    src: "/images/sam/sam7.png",
    alt: "Sam with BIG airplane ears",
  },
  {
    path: "M295.165 248.823C288.62 275.73 314.519 337.098 211.144 339.93C121.92 342.375 102.567 279.979 98.7885 251.655C93.5615 212.475 115.497 182.115 129.951 138.362C148.352 82.6588 177.35 60 217.28 60C287.14 60 314.111 170.934 295.165 248.823Z",
    srcSet: "/images/sam/sam8.webp",
    src: "/images/sam/sam8.png",
    alt: "Sam as an egg",
  },
  {
    path: "M39.0004 258C25.5004 303 46.9179 341.21 76.5001 358C113.5 378.999 144.2 363.4 155 365C165.8 366.6 164.864 383.392 192 382C211.5 381 211 360 219 352C227 344 246.2 345.5 250.001 326.5C253.802 307.499 242.5 302 240.5 294.5C237.033 281.5 250.001 257 265.5 238.5C283.492 217.023 305.562 200.603 312.5 200C323.999 199 328 206.5 338.001 205C359.628 201.756 366.5 161 356.501 150C350.005 142.854 326.5 146 321 142C316.876 139 312.001 111 319.5 103.5C325.426 97.5725 332.5 72.9995 330.501 65.9995C329.455 62.338 347.751 37.9995 344.001 31.9995C341.501 27.9995 316.499 37.5001 312.5 34.5001C302.884 27.2866 290 16.4997 258.001 21.9996C253.937 22.698 242 17.6661 235.501 21.9996C230.5 25.3341 240 41 219.001 55.9996C201.393 68.5772 159.022 76.5204 125.001 113.5C79 163.5 52.5004 213 39.0004 258Z",
    srcSet: "/images/sam/sam9.webp",
    src: "/images/sam/sam9.png",
    alt: "Sam with his lil toes and paws curled up",
  },
  {
    path: "M66,200a134,134 0 1,0 268,0a134,134 0 1,0 -268,0",
    srcSet: "/images/sam/sam10.webp",
    src: "/images/sam/sam10.png",
    alt: "Sam through a peep hole",
  },
  {
    path: "M299.5 286C334.5 245 344 192 344 131.5C344 102.5 334.5 75.5001 334.5 70.0001C334.5 62.8938 330 51.0001 317.5 47.0001C305 43.0001 287 55.9997 273 57.9997C259 59.9997 215.5 22.5001 175.5 44.0002C153.173 56.0008 135 110 131.5 118.5C128 127 115 128 108 124C100.62 119.783 74.9998 101 63.4997 105.5C51.9996 110 65.9571 160.292 63.4997 170.5C57 197.5 68.9066 217.297 66.4997 253C63.4997 297.5 112 334.5 139.5 340.5C151.713 343.165 169 372.195 197 366.5C213.666 363.11 264.5 327 299.5 286Z",
    srcSet: "/images/sam/sam11.webp",
    src: "/images/sam/sam11.png",
    alt: "A loaf of Sam",
  },
  {
    path: "M127.153 285.379C150.276 284.81 167.734 282.044 212.423 285.379C244.701 287.787 267.538 284.608 283.725 281.526C303.959 277.673 299.622 290.677 311.666 300.791C320.843 308.497 340.792 293.566 358.397 293.566C376.221 293.566 384.441 286.126 386.338 272.374C389.861 246.848 378.63 247.329 368.995 226.137C359.36 204.946 334.308 141.367 241.329 149.076C177.773 154.345 149.795 167.86 140.16 159.672C131.092 151.966 148.832 105.422 135.343 102.357C121.853 99.2922 109.809 119.214 95.3566 119.214C84.7579 119.214 75.1228 94.1695 60.67 98.5041C51.3379 101.303 54.8889 129.81 54.8889 137.998C54.8889 146.186 48.6261 160.154 54.8889 185.198C58.923 201.331 58.9813 236.419 49.1078 239.142C35.1368 242.995 12.9755 241.068 12.012 263.223C11.0485 285.379 68.3775 286.824 127.153 285.379Z",
    srcSet: "/images/sam/sam12.webp",
    src: "/images/sam/sam12.png",
    alt: "It's Sam! Yup, that's him",
  },
  {
    path: "M274.5 350.5C314.5 351 341.643 324.223 356 279.5C374.356 222.323 374.305 175.828 350 148C315.5 108.5 268.355 82.7716 193.5 71.5C150.304 64.9955 148.201 64.8 135 62C118.5 58.5 96.5004 48.4996 87.5004 52.9996C78.5004 57.4996 91.8141 87.3519 87.5004 95.5C83.0004 104 46.7612 106.5 48.5004 116.5C51.283 132.5 83 138.5 83 145C83 151.5 102 170.5 117.5 169C125.113 168.263 115.5 184 114 192.5C112.5 201 118 212.5 144 219.5C170 226.5 144 238.5 129.5 245.5C115 252.5 80 248 62 241.5C44.9077 235.327 31 244.492 31 259.5C31 285 66.5147 276 68.5 289.5C71 306.5 115.195 311.136 122.5 322.5C131.5 336.5 159.5 345 190.5 343C220.937 341.036 234.5 350 274.5 350.5Z",
    srcSet: "/images/sam/sam13.webp",
    src: "/images/sam/sam13.png",
    alt: "Sam is a shrimp. Shrimp Sam",
  },
];

export type SamStickerProps = {
  /**
   * The unique identifier for the sticker.
   */
  id: string;

  /**
   * The variant of the sticker to display.
   * There are 13 variants total.
   */
  variant: number;
};

export const SamSticker = ({ variant }: SamStickerProps) => {
  // Pixel buffer to prevent stickers from going off the canvas when placed randomly
  const BUFFER = 200;

  const totalVariants = 13;
  const currentVariant = variant % totalVariants;
  const nextVariant = (variant + 1) % totalVariants;

  useEffect(() => {
    // Preload next variant to display
    new Image().src = variantsData[nextVariant].srcSet;
  }, [nextVariant]);

  const $topZIndex = useStore(topZIndex);
  const [zIndex, setZIndex] = useState($topZIndex);
  const [x, setX] = useState(
    getRandomValueBetween(0, document.body.clientWidth - BUFFER)
  );
  const [y, setY] = useState(
    getRandomValueBetween(0, document.body.clientHeight - BUFFER)
  );
  const [rotate, _setRotate] = useState(getRandomValueBetween(-10, 10));

  // Twist in animation
  const initialRotation = rotate + getRandomValueBetween(-20, 20);

  const handleDragStart: DragHandlers["onDragStart"] = () => {
    incrementTopZIndex();
    setZIndex($topZIndex);
  };

  const handleDragEnd: DragHandlers["onDragEnd"] = (_, info) => {
    const { x, y } = info.point;
    setX(x);
    setY(y);
  };

  const getNearestOffCanvasCoordinates = (
    x: number,
    y: number,
    offset: number
  ): { x: number; y: number } => {
    const canvasWidth = document.body.clientWidth;
    const canvasHeight = document.body.clientHeight;

    // Calculate the center of the canvas
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Calculate the vector from the input point to the center of the canvas
    const dx = x - centerX;
    const dy = y - centerY;

    // Calculate the angle of the vector
    const angle = Math.atan2(dy, dx);

    // Calculate the off-canvas coordinates by moving in the direction of the angle
    // by the specified offset, taking the point off the canvas
    const offCanvasX = x + Math.cos(angle) * (canvasWidth / 2 + offset);
    const offCanvasY = y + Math.sin(angle) * (canvasHeight / 2 + offset);

    return { x: offCanvasX, y: offCanvasY };
  };

  return (
    <motion.div
      className={styles.sticker}
      initial={{ opacity: 0, x, y, scale: 2, rotate: initialRotation }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate,
        transition: {
          type: "spring",
          damping: 8,
          mass: 0.2,
          stiffness: 80,
        },
      }}
      exit={{
        ...getNearestOffCanvasCoordinates(x, y, 400),
        transition: {
          type: "spring",
          mass: 4,
          delay: getRandomValueBetween(0.2, 0.7),
        },
      }}
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.3, cursor: "grabbing" }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ zIndex: zIndex }}
      data-testid="samSticker"
    >
      <svg
        className={styles.stickerSvg}
        width="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={styles.stickerPath}
          d={variantsData[currentVariant].path}
          fill="white"
        />
      </svg>
      <picture className={styles.stickerImg}>
        <source
          srcSet={variantsData[currentVariant].srcSet}
          type="image/webp"
        ></source>
        <img
          src={variantsData[currentVariant].src}
          alt={variantsData[currentVariant].alt}
          draggable="false"
        />
      </picture>
    </motion.div>
  );
};
