import { Howl } from "howler";
import { Key } from "./key";

// // Helpers -----------------------------------------------------//
// function randomIntFromInterval(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// var isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

// if (isTouchDevice) {
//   document.body.classList.add("has-touch");
// }

// var synth = (function () {
//   const STAFF_TYPE_PREFIX = "staff-";
//   const NOTEHEAD_PREFIX = "note-";
//   const SOUNDS_DIRECTORY = "sounds/";

//   // Cache DOM ---------------------------------------------------//
//   var synth,
//     keys,
//     instrumentIcons,
//     instrumentIconWrapper,
//     noteheads,
//     keyLetters,
//     prevArrow,
//     nextArrow,
//     numInstruments;

//   function _cacheDOM() {
//     synth = document.getElementById("synth");
//     keys = synth.querySelectorAll(".synth-key");
//     instrumentIcons = synth.querySelectorAll(".instrument");
//     instrumentIconWrapper = synth.querySelector(".synth-instrument");
//     noteheads = synth.querySelectorAll(".notehead");
//     keyLetters = synth.querySelectorAll(".key-letter");
//     prevArrow = synth.querySelector(".instrument-prev");
//     nextArrow = synth.querySelector(".instrument-next");
//   }

//   // Load essential UI sounds to be ready for initial click
//   var sounds = {
//     ui: {
//       click: {
//         howl: new Howl({
//           src: [`${SOUNDS_DIRECTORY}click.mp3`],
//         }),
//       },

//       ding: {
//         howl: new Howl({
//           src: [`${SOUNDS_DIRECTORY}ding.mp3`],
//         }),
//       },
//     },
//   };

//   function _loadSounds() {
//     sounds = Object.assign(
//       {
//         instruments: [
//           {
//             name: "Piano",
//             staffType: "normal",
//             howl: new Howl({
//               src: [`${SOUNDS_DIRECTORY}piano.mp3`],
//               sprite: {
//                 A3: [0, 3776.2131519274376],
//                 Asharp3: [5000, 4848.390022675737],
//                 B3: [11000, 5923.968253968254],
//                 C3: [18000, 4685.034013605442],
//                 C4: [24000, 6752.970521541951],
//                 Csharp3: [32000, 5236.213151927437],
//                 Csharp4: [39000, 4604.285714285716],
//                 D3: [45000, 4814.603174603179],
//                 D4: [51000, 5732.607709750568],
//                 Dsharp3: [58000, 5294.943310657593],
//                 Dsharp4: [65000, 4705.011337868484],
//                 E3: [71000, 4688.752834467124],
//                 E4: [77000, 4537.25623582767],
//                 F3: [83000, 3645.7369614512486],
//                 Fsharp3: [88000, 4553.219954648526],
//                 G3: [94000, 4056.712018140587],
//                 Gsharp3: [100000, 3850.2040816326544],
//               },
//             }),
//           },
//           {
//             name: "Harp",
//             staffType: "normal",
//             howl: new Howl({
//               src: [`${SOUNDS_DIRECTORY}harp.mp3`],
//               sprite: {
//                 A3: [0, 12151.768707482994],
//                 Asharp3: [14000, 12141.70068027211],
//                 B3: [28000, 7021.3378684807285],
//                 C3: [37000, 10906.64399092971],
//                 C4: [49000, 7013.015873015874],
//                 Csharp3: [58000, 10908.888888888896],
//                 Csharp4: [70000, 7000],
//                 D3: [78000, 10893.67346938775],
//                 D4: [90000, 6654.648526077097],
//                 Dsharp3: [98000, 10879.977324263038],
//                 Dsharp4: [110000, 6651.292517006808],
//                 E3: [118000, 10858.526077097507],
//                 E4: [130000, 6641.383219954661],
//                 F3: [138000, 10847.2335600907],
//                 Fsharp3: [150000, 10835.170068027197],
//                 G3: [162000, 12151.904761904774],
//                 Gsharp3: [176000, 12164.671201814059],
//               },
//             }),
//           },
//           {
//             name: "Xylophone",
//             staffType: "normal",
//             howl: new Howl({
//               src: [`${SOUNDS_DIRECTORY}xylophone.mp3`],
//               sprite: {
//                 A3: [0, 898.2993197278911],
//                 Asharp3: [2000, 820.4535147392291],
//                 B3: [4000, 791.5873015873016],
//                 C3: [6000, 1268.27664399093],
//                 C4: [9000, 811.2244897959187],
//                 Csharp3: [11000, 1346.417233560091],
//                 Csharp4: [14000, 780.6349206349204],
//                 D3: [16000, 1340.7256235827667],
//                 D4: [19000, 784.0136054421762],
//                 Dsharp3: [21000, 1418.8662131519259],
//                 Dsharp4: [24000, 828.3673469387764],
//                 E3: [26000, 1311.3605442176884],
//                 E4: [29000, 781.3832199546482],
//                 F3: [31000, 1234.0816326530585],
//                 Fsharp3: [34000, 1279.7732426303837],
//                 G3: [37000, 830.7936507936518],
//                 Gsharp3: [39000, 862.6077097505699],
//               },
//             }),
//           },
//           {
//             name: "Banjo",
//             staffType: "normal",
//             howl: new Howl({
//               src: [`${SOUNDS_DIRECTORY}banjo.mp3`],
//               sprite: {
//                 A3: [0, 2340.3401360544217],
//                 Asharp3: [4000, 2356.4172335600906],
//                 B3: [8000, 2190.181405895691],
//                 C3: [12000, 2238.2993197278915],
//                 C4: [16000, 2223.197278911563],
//                 Csharp3: [20000, 2314.376417233561],
//                 Csharp4: [24000, 2355.4421768707493],
//                 D3: [28000, 2359.50113378685],
//                 D4: [32000, 2356.870748299322],
//                 Dsharp3: [36000, 2354.943310657596],
//                 Dsharp4: [40000, 2253.401360544217],
//                 E3: [44000, 2276.848072562359],
//                 E4: [48000, 2241.4512471655357],
//                 F3: [52000, 2358.004535147394],
//                 Fsharp3: [56000, 2355.1020408163267],
//                 G3: [60000, 2357.48299319728],
//                 Gsharp3: [64000, 2234.444444444449],
//               },
//             }),
//           },
//           {
//             name: "Ocarina",
//             staffType: "normal",
//             howl: new Howl({
//               src: [`${SOUNDS_DIRECTORY}ocarina.mp3`],
//               sprite: {
//                 A3: [0, 195.37414965986395],
//                 Asharp3: [2000, 183.33333333333312],
//                 B3: [4000, 198.66213151927425],
//                 C3: [6000, 172.2222222222225],
//                 C4: [8000, 190.3628117913829],
//                 Csharp3: [10000, 183.0158730158722],
//                 Csharp4: [12000, 201.9501133786843],
//                 D3: [14000, 188.5260770975048],
//                 D4: [16000, 193.96825396825434],
//                 Dsharp3: [18000, 203.85487528344726],
//                 Dsharp4: [20000, 182.9251700680281],
//                 E3: [22000, 210.61224489795904],
//                 E4: [24000, 180.38548752834416],
//                 F3: [26000, 200.13605442176896],
//                 Fsharp3: [28000, 204.3990929705224],
//                 G3: [30000, 205.39682539682502],
//                 Gsharp3: [32000, 192.58503401360372],
//               },
//             }),
//           },
//           {
//             name: "Drag",
//             staffType: "drag",
//             howl: new Howl({
//               src: [`${SOUNDS_DIRECTORY}rupaul.mp3`],
//               sprite: {
//                 A3: [0, 2972.154195011338],
//                 Asharp3: [4000, 743.0385487528346],
//                 B3: [6000, 2229.1156462585027],
//                 C3: [10000, 5201.269841269841],
//                 C4: [17000, 2972.1541950113383],
//                 Csharp3: [21000, 2229.1156462585027],
//                 Csharp4: [25000, 5944.308390022677],
//                 D3: [32000, 2229.1156462585063],
//                 D4: [36000, 1486.077097505671],
//                 Dsharp3: [39000, 2229.1156462585063],
//                 Dsharp4: [43000, 743.0385487528355],
//                 E3: [45000, 1486.077097505671],
//                 E4: [48000, 1486.077097505671],
//                 F3: [51000, 1486.077097505671],
//                 Fsharp3: [54000, 2229.1156462585063],
//                 G3: [58000, 1486.077097505671],
//                 Gsharp3: [61000, 1486.077097505671],
//               },
//             }),
//           },
//           {
//             name: "Butts",
//             staffType: "butts",
//             howl: new Howl({
//               src: [`${SOUNDS_DIRECTORY}farts.mp3`],
//               sprite: {
//                 A3: [0, 1255.1927437641723],
//                 Asharp3: [3000, 1780.9977324263039],
//                 B3: [6000, 1825.8956916099773],
//                 C3: [9000, 2000],
//                 C4: [12000, 325.9410430838994],
//                 Csharp3: [14000, 2000],
//                 Csharp4: [17000, 768.4807256235829],
//                 D3: [19000, 550.0226757369617],
//                 D4: [21000, 322.44897959183663],
//                 Dsharp3: [23000, 880.9070294784576],
//                 Dsharp4: [25000, 2207.6870748299307],
//                 E3: [29000, 1815.5102040816332],
//                 E4: [32000, 2511.4512471655316],
//                 F3: [36000, 1556.1904761904727],
//                 Fsharp3: [39000, 297.43764172335574],
//                 G3: [41000, 506.9160997732425],
//                 Gsharp3: [43000, 393.33333333333087],
//               },
//             }),
//           },
//           {
//             name: "Super Mario World",
//             staffType: "mario",
//             howl: new Howl({
//               src: [`${SOUNDS_DIRECTORY}mario.mp3`],
//               sprite: {
//                 A3: [0, 433.78684807256235],
//                 Asharp3: [2000, 489.25170068027234],
//                 B3: [4000, 571.8367346938775],
//                 C3: [6000, 653.9229024943314],
//                 C4: [8000, 395.8276643990928],
//                 Csharp3: [10000, 987.6643990929708],
//                 Csharp4: [12000, 332.92517006802666],
//                 D3: [14000, 337.86848072562316],
//                 D4: [16000, 651.3832199546492],
//                 Dsharp3: [18000, 1592.9251700680284],
//                 Dsharp4: [21000, 474.8299319727885],
//                 E3: [23000, 244.89795918367463],
//                 E4: [25000, 826.2131519274369],
//                 F3: [27000, 658.5487528344664],
//                 Fsharp3: [29000, 660.1814058956918],
//                 G3: [31000, 109.75056689342466],
//                 Gsharp3: [33000, 822.3129251700669],
//               },
//             }),
//           },
//         ],
//       },
//       sounds
//     );

//     for (var i = 0; i < sounds.ui.length; i++) {
//       sounds.ui[i].howl.load();
//     }

//     for (var j = 0; j < sounds.instruments.length; j++) {
//       sounds.instruments[i].howl.load();
//     }

//     numInstruments = sounds.instruments.length - 1;
//   }

//   function _unloadSounds() {
//     for (var i = 0; i < sounds.ui.length; i++) {
//       sounds.ui[i].howl.unload();
//     }

//     for (var j = 0; j < sounds.instruments.length; j++) {
//       sounds.instruments[i].howl.unload();
//     }
//   }

//   // State -------------------------------------------------------//
//   var activeInstrument = 0;
//   var isMouseDown = false;
//   var isTouching = false;
//   var noteFadeOut;

//   function _enableSynth() {
//     if (synth.dataset.enabled !== "true") {
//       synth.dataset.enabled = "true";
//       _loadSounds();
//       setRandomInstrument(revealKeyboardLetters);
//     }
//   }

//   function _disableSynth() {
//     if (synth.dataset.enabled !== "false") {
//       synth.dataset.enabled = "false";
//       _unloadSounds();
//     }
//   }

//   // Instrument Chooser -----------------------------------------//
//   function setRandomInstrument(callback) {
//     synth.dataset.loading = "true";

//     const baseSpeed = randomIntFromInterval(30, 50); // Lower is faster
//     const force = randomIntFromInterval(5, 30); // How hard do you 'pull down the wheel'?
//     const slowestSpeed = 700; // How slow can the roulette go before ending?
//     const friction = 1.3; // How quickly to put on the brakes (1 to 1.5)

//     var speed = baseSpeed;
//     var i = 1;
//     var timeout;

//     var roulette = function () {
//       nextInstrument();
//       i++;

//       if (speed >= slowestSpeed) {
//         sounds.ui.ding.howl.play();
//         synth.dataset.loading = "false";
//         clearTimeout(timeout);
//         if (callback) {
//           callback();
//         }
//       } else {
//         speed *= friction;
//         if (i <= force) {
//           speed *= 0.8;
//         }
//         timeout = setTimeout(roulette, speed);
//       }
//     };

//     setTimeout(roulette, speed);
//   }

//   function showActiveInstrumentIcon() {
//     Array.from(instrumentIcons).forEach((icon) => {
//       icon.style.display = "none";
//     });
//     instrumentIcons[activeInstrument].style.display = "block";
//   }

//   function setActiveInstrument(num) {
//     if (num > numInstruments) {
//       num = 0;
//     } else if (num < 0) {
//       num = numInstruments;
//     }

//     activeInstrument = num;
//     showActiveInstrumentIcon();
//   }

//   function nextInstrument() {
//     setActiveInstrument(activeInstrument + 1);
//     sounds.ui.click.howl.play();
//   }

//   function prevInstrument() {
//     setActiveInstrument(activeInstrument - 1);
//     sounds.ui.click.howl.play();
//   }

//   // Musical Staff ---------------------------------------------//
//   function showActiveNotehead(noteName) {
//     // Clear existing fadeout timer, if one exists
//     clearTimeout(noteFadeOut);
//     // Immediately hide any visible noteheads
//     hideNoteheads();

//     var staffType = sounds.instruments[activeInstrument].staffType;
//     var currentStaff = STAFF_TYPE_PREFIX + staffType;
//     var currentNote = "." + currentStaff + " ." + NOTEHEAD_PREFIX + noteName;

//     synth.querySelector(currentNote).style.display = "block";

//     // Prep a timer to fade out noteheads
//     // if no other actions are taken
//     noteFadeOut = setTimeout(function () {
//       hideNoteheads();
//     }, 5000);
//   }

//   function hideNoteheads() {
//     Array.from(noteheads).forEach((notehead) => {
//       notehead.style.display = "none";
//     });
//   }

//   // Keyboard ----------------------------------------------------//
//   function revealKeyboardLetters() {
//     // Only show keyboard on non-touch devices
//     if (!isTouchDevice) {
//       Array.from(keyLetters).forEach(function (letter, i) {
//         setTimeout(function () {
//           letter.classList.add("visible");
//         }, i * 30);
//       });
//     }
//   }

//   function hideKeyboardLetters() {
//     Array.from(keyLetters).forEach((letter) => {
//       letter.classList.add("fadeout");
//       setTimeout(function () {
//         letter.classList.remove("visible");
//       }, 2000);
//     });
//   }

//   function pressKey(noteName) {
//     var keyId = document.getElementById(noteName);
//     if (!keyId.classList.contains("pressed")) {
//       keyId.classList.add("pressed");
//       playNote(noteName);
//       showActiveNotehead(noteName);
//     }
//   }

//   function pressKeyMatchingCoords(x, y) {
//     Array.from(keys).forEach((key) => {
//       var posXStart = key.offset().left;
//       var posYStart = key.offset().top - window.scrollTop();
//       var posXEnd = key.offset().left + key[0].getBoundingClientRect().width;
//       var posYEnd = key.offset().top + key[0].getBoundingClientRect().height;

//       if (x >= posXStart && x <= posXEnd && y >= posYStart && y <= posYEnd) {
//         releaseAllKeys();
//         var noteName = key[0].id;
//         playNote(noteName);
//         key.classList.add("pressed");
//       }
//     });
//   }

//   function releaseKey(noteName) {
//     document.getElementById(noteName).classList.remove("pressed");
//   }

//   function releaseAllKeys() {
//     Array.from(keys).forEach((key) => {
//       key.classList.remove("pressed");
//     });
//   }

//   function playNote(noteName) {
//     sounds.instruments[activeInstrument].howl.play(noteName);
//   }

//   // Event Binding ---------------------------------------------//
//   var handleClickNext = function (e) {
//     e.preventDefault();
//     nextInstrument();
//   };

//   var handleClickPrev = function (e) {
//     e.preventDefault();
//     prevInstrument();
//   };

//   var handleClickInstrument = function (e) {
//     e.preventDefault();
//     setRandomInstrument();
//   };

//   var handleMouseDown = function (e) {
//     e.preventDefault();
//     hideKeyboardLetters();
//     isMouseDown = true;
//     pressKey(this.id);
//   };

//   var handleMouseEnter = function (e) {
//     e.preventDefault();
//     if (isMouseDown) {
//       pressKey(this.id);
//     }
//   };

//   var handleMouseOut = function (e) {
//     e.preventDefault();
//     releaseKey(this.id);
//   };

//   var handleTouchStart = function (e) {
//     e.preventDefault();
//     hideKeyboardLetters();
//     isTouching = true;
//     pressKey(this.id);
//   };

//   var handleTouchEnter = function (e) {
//     e.preventDefault();
//     if (isTouching) {
//       pressKey(this.id);
//     }
//   };

//   var handleTouchMove = function (e) {
//     var touch = e.originalEvent.touches[0];
//     pressKeyMatchingCoords(touch.clientX, touch.clientY);
//   };

//   var handleMouseUp = function () {
//     isMouseDown = false;
//     releaseAllKeys();
//   };

//   var handleTouchEnd = function () {
//     isTouching = false;
//     releaseAllKeys();
//   };

//   var handleKeyDown = function (e) {
//     if (synth.dataset.loading === "false") {
//       hideKeyboardLetters();
//       switch (e.key) {
//         case "ArrowLeft":
//           e.preventDefault();
//           prevInstrument();
//           break;
//         case "ArrowRight":
//           e.preventDefault();
//           nextInstrument();
//           break;
//         case "a":
//         case "A":
//           e.preventDefault();
//           pressKey("C3");
//           break;
//         case "w":
//         case "W":
//           e.preventDefault();
//           pressKey("Csharp3");
//           break;
//         case "s":
//         case "S":
//           e.preventDefault();
//           pressKey("D3");
//           break;
//         case "e":
//         case "E":
//           e.preventDefault();
//           pressKey("Dsharp3");
//           break;
//         case "d":
//         case "D":
//           e.preventDefault();
//           pressKey("E3");
//           break;
//         case "f":
//         case "F":
//           e.preventDefault();
//           pressKey("F3");
//           break;
//         case "t":
//         case "T":
//           e.preventDefault();
//           pressKey("Fsharp3");
//           break;
//         case "g":
//         case "G":
//           e.preventDefault();
//           pressKey("G3");
//           break;
//         case "y":
//         case "Y":
//           e.preventDefault();
//           pressKey("Gsharp3");
//           break;
//         case "h":
//         case "H":
//           e.preventDefault();
//           pressKey("A3");
//           break;
//         case "u":
//         case "U":
//           e.preventDefault();
//           pressKey("Asharp3");
//           break;
//         case "j":
//         case "J":
//           e.preventDefault();
//           pressKey("B3");
//           break;
//         case "k":
//         case "K":
//           e.preventDefault();
//           pressKey("C4");
//           break;
//         case "o":
//         case "O":
//           e.preventDefault();
//           pressKey("Csharp4");
//           break;
//         case "l":
//         case "L":
//           e.preventDefault();
//           pressKey("D4");
//           break;
//         case "p":
//         case "P":
//           e.preventDefault();
//           pressKey("Dsharp4");
//           break;
//         case ";":
//         case ":":
//           e.preventDefault();
//           pressKey("E4");
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   var handleKeyUp = function (e) {
//     switch (e.key) {
//       case "a":
//       case "A":
//         releaseKey("C3");
//         break;
//       case "w":
//       case "W":
//         releaseKey("Csharp3");
//         break;
//       case "s":
//       case "S":
//         releaseKey("D3");
//         break;
//       case "e":
//       case "E":
//         releaseKey("Dsharp3");
//         break;
//       case "d":
//       case "D":
//         releaseKey("E3");
//         break;
//       case "f":
//       case "F":
//         releaseKey("F3");
//         break;
//       case "t":
//       case "T":
//         releaseKey("Fsharp3");
//         break;
//       case "g":
//       case "G":
//         releaseKey("G3");
//         break;
//       case "y":
//       case "Y":
//         releaseKey("Gsharp3");
//         break;
//       case "h":
//       case "H":
//         releaseKey("A3");
//         break;
//       case "u":
//       case "U":
//         releaseKey("Asharp3");
//         break;
//       case "j":
//       case "J":
//         releaseKey("B3");
//         break;
//       case "k":
//       case "K":
//         releaseKey("C4");
//         break;
//       case "o":
//       case "O":
//         releaseKey("Csharp4");
//         break;
//       case "l":
//       case "L":
//         releaseKey("D4");
//         break;
//       case "p":
//       case "P":
//         releaseKey("Dsharp4");
//         break;
//       case ";":
//       case ":":
//         releaseKey("E4");
//         break;
//       default:
//         break;
//     }
//   };

//   function _bindEvents() {
//     prevArrow.addEventListener("click", handleClickPrev);
//     nextArrow.addEventListener("click", handleClickNext);
//     synth.addEventListener("mouseup", handleMouseUp);
//     synth.addEventListener("touchend", handleTouchEnd);
//     Array.from(keys).forEach((key) => {
//       key.addEventListener("mousedown", handleMouseDown);
//       key.addEventListener("mouseenter", handleMouseEnter);
//       key.addEventListener("mouseout", handleMouseOut);
//       key.addEventListener("touchstart", handleTouchStart);
//       key.addEventListener("touchenter", handleTouchEnter);
//       key.addEventListener("touchmove", handleTouchMove);
//     });
//     instrumentIconWrapper.addEventListener("click", handleClickInstrument);
//     document.addEventListener("keydown", handleKeyDown);
//     document.addEventListener("keyup", handleKeyUp);
//   }

//   function _unbindEvents() {
//     prevArrow.removeEventListener("click", handleClickPrev);
//     nextArrow.removeEventListener("click", handleClickNext);
//     synth.addEventListener("mouseup", handleMouseUp);
//     synth.removeEventListener("touchend", handleTouchEnd);
//     Array.from(keys).forEach((key) => {
//       key.removeEventListener("mousedown", handleMouseDown);
//       key.removeEventListener("mouseenter", handleMouseEnter);
//       key.removeEventListener("mouseout", handleMouseOut);
//       key.removeEventListener("touchstart", handleTouchStart);
//       key.removeEventListener("touchenter", handleTouchEnter);
//       key.removeEventListener("touchmove", handleTouchMove);
//     });
//     instrumentIconWrapper.removeEventListener("click", handleClickInstrument);
//     document.removeEventListener("keydown", handleKeyDown);
//     document.removeEventListener("keyup", handleKeyUp);
//   }

//   function init() {
//     _cacheDOM();
//   }

//   function start() {
//     _enableSynth();
//     _bindEvents();
//   }

//   function stop() {
//     _disableSynth();
//     _unbindEvents();
//   }

//   return {
//     init: init,
//     start: start,
//     stop: stop,
//   };
// })();

// // Run ----------------------------------------------------------//

// document.addEventListener("DOMContentLoaded", function (event) {
//   // Run scripts on page change
//   function refresh() {
//     if (document.querySelector("#synth") !== null) {
//       synth.init();
//       document.querySelector("#synth-start").addEventListener("click", () => {
//         synth.start();
//       });
//     }
//   }

//   function init() {
//     refresh();
//   }

//   init();
// });

export const Synth = () => (
  <div id="synth" data-enabled="false" data-loading="false">
    <svg
      width="100%"
      viewBox="0 0 270 152"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="synth-base">
        <rect
          className="synth-shadow"
          x="0"
          y="4"
          width="270"
          height="148"
          rx="12"
        ></rect>
        <rect
          className="synth-base"
          x="0"
          y="0"
          width="270"
          height="148"
          rx="12"
        ></rect>
        <path
          className="synth-endcap endcap-left"
          d="M0,9.99832468 C0,4.47640243 4.47593818,0 10,0 L20,0 L20,148 L10,148 C4.4771525,148 0,143.530333 0,138.001675 L0,9.99832468 Z"
        ></path>
        <path
          className="synth-endcap endcap-right"
          d="M250,0 L260,0 C265.522847,0 270,4.46966749 270,9.99832468 L270,138.001675 C270,143.523598 265.524062,148 260,148 L250,148 L250,0 Z"
        ></path>
      </g>

      <g id="synth-keys" transform="translate(24.000000, 60.000000)">
        <path
          className="synth-keys-outline"
          d="M0,4.00984669 C0,1.79526951 1.78697643,0 3.99495639,0 L218.005044,0 C220.211397,0 222,1.79771022 222,4.00984669 L222,88 L0,88 L0,4.00984669 Z"
        ></path>
        <polygon
          className="synth-between-keys"
          points="218 2.2 218 80 4 80 4 2.2"
        ></polygon>
        <Key key="C3" />
        {/* <Key key="Csharp3" />
        <Key key="D3" />
        <Key key="Dsharp3" />
        <Key key="E3" />
        <Key key="F3" />
        <Key key="Fsharp3" />
        <Key key="G3" />
        <Key key="Gsharp3" />
        <Key key="A3" />
        <Key key="Asharp3" />
        <Key key="B3" />
        <Key key="C4" />
        <Key key="Csharp4" />
        <Key key="D4" />
        <Key key="Dsharp4" />
        <Key key="E4" /> */}
        <path
          d="M2,3.0093689 C2,2.45190985 2.44668708,2 2.99605446,2 L219.003946,2 C219.554051,2 220,2.44335318 220,3.0093689 L220,6 L2,6 L2,3.0093689 Z"
          className="synth-keys-shadow"
        ></path>
      </g>

      <g id="synth-screen" transform="translate(24.000000, 4.000000)">
        <rect
          className="lcd-outline"
          x="0"
          y="0"
          width="222"
          height="52"
          rx="4"
        ></rect>
        <rect
          className="lcd-bg"
          x="2"
          y="2"
          width="218"
          height="48"
          rx="2"
        ></rect>
        <g
          className="synth-instruments"
          transform="translate(108.000000, 6.000000)"
        >
          <g className="instrument-arrow instrument-prev" fill-rule="nonzero">
            <rect
              className="hitarea"
              fill-opacity="0"
              x="0"
              y="0"
              width="30"
              height="40"
            ></rect>
            <polygon
              className="lcd-base"
              points="16 16 16 18 24 18 24 20 16 20 16 22 18 22 18 24 14 24 14 22 10 22 10 20 6 20 6 18 10 18 10 16 14 16 14 14 18 14 18 16"
            ></polygon>
          </g>
          <g
            className="instrument-arrow instrument-next"
            transform="translate(74.000000, 0.000000)"
            fill-rule="nonzero"
          >
            <rect
              className="hitarea"
              fill-opacity="0"
              x="0"
              y="0"
              width="30"
              height="40"
            ></rect>
            <polygon
              className="lcd-base"
              points="14 16 12 16 12 14 16 14 16 16 20 16 20 18 24 18 24 20 20 20 20 22 16 22 16 24 12 24 12 22 14 22 14 20 6 20 6 18 14 18"
            ></polygon>
          </g>
          <g
            className="synth-instrument"
            transform="translate(30.000000, 0.000000)"
          >
            <rect
              className="hitarea"
              fill-opacity="0"
              fill-rule="nonzero"
              x="0"
              y="0"
              width="44"
              height="40"
            ></rect>
            <g
              id="piano"
              className="instrument"
              transform="translate(6.000000, 2.000000)"
            >
              <path
                d="M30,26 L30,24 L32,24 L32,28 L2,28 L2,24 L4,24 L4,26 L8,26 L8,24 L10,24 L10,26 L16,26 L16,24 L18,24 L18,26 L22,26 L22,24 L24,24 L24,26 L30,26 Z M10,6 L10,8 L6,8 L6,10 L2,10 L2,2 L14,2 L14,6 L10,6 Z M2,12 L6,12 L6,14 L2,14 L2,12 Z M6,10 L10,10 L10,12 L6,12 L6,10 Z M10,8 L14,8 L14,10 L10,10 L10,8 Z M14,6 L18,6 L18,8 L14,8 L14,6 Z"
                className="lcd-highlight"
              ></path>
              <path
                d="M14,34 L14,32 L6,32 L6,34 L4,34 L4,36 L2,36 L2,30 L0,30 L0,28 L32,28 L32,24 L30,24 L30,26 L24,26 L24,24 L22,24 L22,26 L18,26 L18,24 L16,24 L16,26 L10,26 L10,24 L8,24 L8,26 L4,26 L4,24 L2,24 L2,22 L4,22 L4,20 L8,20 L8,18 L12,18 L12,16 L16,16 L16,14 L20,14 L20,12 L24,12 L24,10 L28,10 L28,8 L30,8 L30,12 L26,12 L26,14 L24,14 L24,16 L28,16 L28,18 L32,18 L32,20 L34,20 L34,30 L32,30 L32,36 L30,36 L30,34 L28,34 L28,32 L16,32 L16,34 L18,34 L18,32 L20,32 L20,34 L22,34 L22,36 L12,36 L12,34 L14,34 Z M4,0 L12,0 L12,2 L4,2 L4,0 Z M2,2 L4,2 L4,4 L2,4 L2,2 Z M12,2 L14,2 L14,4 L12,4 L12,2 Z M16,6 L28,6 L28,8 L16,8 L16,6 Z M14,4 L16,4 L16,6 L14,6 L14,4 Z M0,4 L2,4 L2,28 L0,28 L0,4 Z"
                className="lcd-base"
                fill-rule="nonzero"
              ></path>
            </g>
            <g
              id="harp"
              className="instrument"
              transform="translate(8.000000, 0.000000)"
            >
              <path
                d="M20,14 L22,14 L22,24 L20,24 L20,14 Z M24,14 L26,14 L26,20 L24,20 L24,14 Z M16,12 L18,12 L18,28 L16,28 L16,12 Z M12,8 L14,8 L14,32 L12,32 L12,8 Z M8,6 L10,6 L10,36 L8,36 L8,6 Z M4,4 L6,4 L6,36 L4,36 L4,4 Z"
                className="lcd-highlight"
              ></path>
              <path
                d="M4,36 L4,38 L6,38 L6,36 L8,36 L8,38 L10,38 L10,36 L12,36 L12,34 L10,34 L10,32 L12,32 L12,34 L14,34 L14,32 L16,32 L16,30 L14,30 L14,28 L16,28 L16,30 L18,30 L18,28 L20,28 L20,26 L18,26 L18,24 L20,24 L20,26 L22,26 L22,24 L24,24 L24,22 L22,22 L22,20 L24,20 L24,22 L26,22 L26,20 L26,18 L26,14 L20,14 L20,12 L24,12 L24,10 L28,10 L28,22 L26,22 L26,24 L24,24 L24,26 L22,26 L22,28 L20,28 L20,30 L18,30 L18,32 L16,32 L16,34 L14,34 L14,36 L12,36 L12,38 L10,38 L10,40 L4,40 L4,38 L2,38 L2,36 L4,36 Z M0,2 L2,2 L2,0 L8,0 L8,2 L12,2 L12,4 L14,4 L14,6 L16,6 L16,8 L18,8 L18,10 L20,10 L20,12 L16,12 L16,10 L14,10 L14,8 L10,8 L10,6 L0,6 L0,2 Z"
                className="lcd-base"
                fill-rule="nonzero"
              ></path>
            </g>
            <g
              id="xylophone"
              className="instrument"
              transform="translate(3.000000, 4.000000)"
            >
              <path
                d="M6,2 L10,2 L10,4 L6,4 L6,28 L4,28 L4,2 L6,2 Z M30,8 L34,8 L34,10 L30,10 L30,22 L28,22 L28,8 L30,8 Z M22,6 L26,6 L26,8 L22,8 L22,24 L20,24 L20,6 L22,6 Z M14,4 L18,4 L18,6 L14,6 L14,26 L12,26 L12,4 L14,4 Z"
                className="lcd-highlight"
              ></path>
              <path
                d="M36,10 L38,10 L38,20 L36,20 L36,22 L34,22 L34,8 L36,8 L36,10 Z M2,26 L0,26 L0,4 L2,4 L2,2 L4,2 L4,28 L2,28 L2,26 Z M12,28 L10,28 L10,4 L10,2 L18,2 L18,4 L12,4 L12,26 L18,26 L18,28 L12,28 Z M28,8 L28,22 L34,22 L34,24 L28,24 L26,24 L26,6 L28,6 L34,6 L34,8 L28,8 Z M20,6 L20,24 L26,24 L26,26 L20,26 L18,26 L18,4 L20,4 L26,4 L26,6 L20,6 Z M4,0 L10,0 L10,2 L4,2 L4,0 Z M6,4 L8,4 L8,6 L6,6 L6,4 Z M6,24 L8,24 L8,26 L6,26 L6,24 Z M14,22 L16,22 L16,24 L14,24 L14,22 Z M22,20 L24,20 L24,22 L22,22 L22,20 Z M14,6 L16,6 L16,8 L14,8 L14,6 Z M22,8 L24,8 L24,10 L22,10 L22,8 Z M30,18 L32,18 L32,20 L30,20 L30,18 Z M30,10 L32,10 L32,12 L30,12 L30,10 Z M4,28 L10,28 L10,30 L4,30 L4,28 Z"
                className="lcd-base"
                fill-rule="nonzero"
              ></path>
            </g>
            <g
              id="banjo"
              className="instrument"
              transform="translate(4.000000, 0.000000)"
            >
              <path
                d="M18,20 L18,24 L20,24 L20,30 L18,30 L18,32 L16,32 L16,34 L8,34 L8,32 L6,32 L6,30 L4,30 L4,22 L6,22 L6,20 L8,20 L8,18 L14,18 L14,20 L18,20 Z M32,8 L32,10 L28,10 L28,6 L30,6 L30,4 L34,4 L34,8 L32,8 Z"
                className="lcd-highlight"
              ></path>
              <path
                d="M20,22 L18,22 L18,24 L16,24 L16,22 L14,22 L14,20 L16,20 L16,18 L14,18 L14,16 L20,16 L20,18 L18,18 L18,20 L20,20 L20,18 L22,18 L22,24 L20,24 L20,22 Z M14,32 L10,32 L10,30 L8,30 L8,28 L6,28 L6,24 L8,24 L8,26 L10,26 L10,24 L12,24 L12,26 L14,26 L14,28 L12,28 L12,30 L14,30 L14,32 Z M36,2 L36,6 L38,6 L38,10 L36,10 L36,8 L34,8 L34,4 L30,4 L30,2 L28,2 L28,0 L32,0 L32,2 L36,2 Z M34,8 L34,14 L32,14 L32,12 L28,12 L28,10 L32,10 L32,8 L34,8 Z M26,12 L28,12 L28,14 L26,14 L26,16 L24,16 L24,14 L22,14 L22,12 L24,12 L24,10 L26,10 L26,12 Z M24,4 L30,4 L30,6 L28,6 L28,10 L26,10 L26,6 L24,6 L24,4 Z M10,14 L14,14 L14,16 L10,16 L10,14 Z M6,16 L10,16 L10,18 L6,18 L6,16 Z M10,36 L14,36 L14,38 L10,38 L10,36 Z M6,34 L10,34 L10,36 L6,36 L6,34 Z M14,34 L18,34 L18,36 L14,36 L14,34 Z M4,18 L6,18 L6,20 L4,20 L4,18 Z M20,14 L22,14 L22,16 L20,16 L20,14 Z M22,16 L24,16 L24,18 L22,18 L22,16 Z M12,22 L14,22 L14,24 L12,24 L12,22 Z M14,24 L16,24 L16,26 L14,26 L14,24 Z M4,32 L6,32 L6,34 L4,34 L4,32 Z M18,32 L20,32 L20,34 L18,34 L18,32 Z M2,20 L4,20 L4,24 L2,24 L2,20 Z M2,28 L4,28 L4,32 L2,32 L2,28 Z M20,28 L22,28 L22,32 L20,32 L20,28 Z M0,24 L2,24 L2,28 L0,28 L0,24 Z M22,24 L24,24 L24,28 L22,28 L22,24 Z"
                className="lcd-base"
                fill-rule="nonzero"
              ></path>
            </g>
            <g
              id="ocarina"
              className="instrument"
              transform="translate(7.000000, 4.000000)"
            >
              <path
                d="M18,2 L18,0 L26,0 L26,2 L26,4 L22,4 L22,6 L18,6 L18,8 L16,8 L16,10 L14,10 L14,12 L12,12 L12,14 L10,14 L10,16 L6,16 L6,18 L4,18 L4,22 L2,22 L2,18 L2,16 L4,16 L4,14 L4,12 L6,12 L6,10 L8,10 L8,8 L10,8 L10,6 L14,6 L14,4 L18,4 L18,2 Z M18,24 L20,24 L20,28 L18,28 L18,24 Z"
                className="lcd-highlight"
              ></path>
              <path
                d="M18,24 L18,26 L16,26 L16,28 L12,28 L4,28 L4,26 L12,26 L12,24 L16,24 L16,22 L18,22 L18,20 L20,20 L20,18 L22,18 L22,20 L22,26 L22,30 L20,30 L20,26 L20,24 L18,24 Z M0,16 L2,16 L2,24 L0,24 L0,16 Z M22,16 L24,16 L24,18 L22,18 L22,16 Z M24,14 L26,14 L26,16 L24,16 L24,14 Z M26,10 L28,10 L28,14 L26,14 L26,10 Z M28,2 L30,2 L30,10 L28,10 L28,2 Z M18,0 L28,0 L28,2 L18,2 L18,0 Z M14,2 L18,2 L18,4 L14,4 L14,2 Z M10,4 L14,4 L14,6 L10,6 L10,4 Z M8,6 L10,6 L10,8 L8,8 L8,6 Z M6,8 L8,8 L8,10 L6,10 L6,8 Z M4,10 L6,10 L6,12 L4,12 L4,10 Z M8,12 L12,12 L12,16 L8,16 L8,12 Z M10,20 L12,20 L12,22 L10,22 L10,20 Z M4,18 L8,18 L8,22 L4,22 L4,18 Z M14,16 L16,16 L16,18 L14,18 L14,16 Z M16,10 L20,10 L20,14 L16,14 L16,10 Z M20,4 L24,4 L24,8 L20,8 L20,4 Z M22,10 L24,10 L24,12 L22,12 L22,10 Z M2,12 L4,12 L4,16 L2,16 L2,12 Z M16,28 L18,28 L18,30 L16,30 L16,28 Z M18,30 L20,30 L20,32 L18,32 L18,30 Z M2,24 L4,24 L4,26 L2,26 L2,24 Z"
                className="lcd-base"
                fill-rule="nonzero"
              ></path>
            </g>
            <g
              id="mouth"
              className="instrument"
              transform="translate(4.000000, 4.000000)"
            >
              <path
                d="M28,8 L26,8 L26,6 L24,6 L24,4 L10,4 L10,6 L8,6 L8,8 L6,8 L6,10 L4,10 L4,8 L4,6 L6,6 L6,4 L8,4 L8,2 L26,2 L26,4 L28,4 L28,6 L30,6 L30,8 L30,10 L28,10 L28,8 Z M22,24 L22,26 L12,26 L12,24 L10,24 L10,22 L24,22 L24,24 L22,24 Z M12,8 L22,8 L22,10 L12,10 L12,8 Z M8,20 L10,20 L10,22 L8,22 L8,20 Z M6,18 L8,18 L8,20 L6,20 L6,18 Z M24,20 L26,20 L26,22 L24,22 L24,20 Z M26,18 L28,18 L28,20 L26,20 L26,18 Z"
                className="lcd-highlight"
              ></path>
              <path
                d="M18,16 L18,18 L16,18 L16,16 L12,16 L12,18 L10,18 L10,20 L8,20 L8,18 L6,18 L6,16 L4,16 L4,12 L6,12 L6,10 L8,10 L8,8 L12,8 L12,10 L22,10 L22,8 L26,8 L26,10 L28,10 L28,12 L30,12 L30,16 L28,16 L28,18 L26,18 L26,20 L24,20 L24,18 L22,18 L22,16 L18,16 Z M2,18 L4,18 L4,22 L2,22 L2,18 Z M0,10 L2,10 L2,18 L0,18 L0,10 Z M32,10 L34,10 L34,18 L32,18 L32,10 Z M4,22 L6,22 L6,26 L4,26 L4,22 Z M28,22 L30,22 L30,26 L28,26 L28,22 Z M30,18 L32,18 L32,22 L30,22 L30,18 Z M2,6 L4,6 L4,10 L2,10 L2,6 Z M12,6 L22,6 L22,8 L12,8 L12,6 Z M14,2 L20,2 L20,4 L14,4 L14,2 Z M8,0 L14,0 L14,2 L8,2 L8,0 Z M6,2 L8,2 L8,4 L6,4 L6,2 Z M4,4 L6,4 L6,6 L4,6 L4,4 Z M20,0 L26,0 L26,2 L20,2 L20,0 Z M26,2 L28,2 L28,4 L26,4 L26,2 Z M28,4 L30,4 L30,6 L28,6 L28,4 Z M30,6 L32,6 L32,10 L30,10 L30,6 Z M2,14 L4,14 L4,16 L2,16 L2,14 Z M30,14 L32,14 L32,16 L30,16 L30,14 Z M10,20 L24,20 L24,22 L10,22 L10,20 Z M6,26 L10,26 L10,28 L6,28 L6,26 Z M10,28 L24,28 L24,30 L10,30 L10,28 Z M24,26 L28,26 L28,28 L24,28 L24,26 Z"
                className="lcd-base"
                fill-rule="nonzero"
              ></path>
            </g>
            <g
              id="butt"
              className="instrument"
              transform="translate(3.000000, 4.000000)"
            >
              <path
                d="M24,10 L24,12 L22,12 L22,14 L20,14 L20,18 L16,18 L16,12 L18,12 L18,8 L20,8 L20,6 L26,6 L26,10 L24,10 Z M12,8 L12,10 L10,10 L10,12 L8,12 L8,16 L4,16 L4,10 L6,10 L6,6 L8,6 L8,4 L14,4 L14,8 L12,8 Z"
                className="lcd-highlight"
              ></path>
              <path
                d="M14,12 L14,4 L16,4 L16,6 L18,6 L18,8 L16,8 L16,12 L14,12 Z M18,24 L22,24 L22,26 L20,26 L20,30 L18,30 L18,24 Z M6,22 L10,22 L10,24 L6,24 L6,30 L4,30 L4,20 L6,20 L6,22 Z M32,4 L32,14 L30,14 L30,4 L32,4 Z M34,14 L34,16 L32,16 L32,14 L34,14 Z M36,16 L36,18 L34,18 L34,16 L36,16 Z M38,18 L38,20 L36,20 L36,18 L38,18 Z M4,6 L4,10 L2,10 L2,6 L4,6 Z M6,4 L6,6 L4,6 L4,4 L6,4 Z M8,0 L8,4 L6,4 L6,0 L8,0 Z M24,26 L24,28 L22,28 L22,26 L24,26 Z M26,28 L26,30 L24,30 L24,28 L26,28 Z M4,16 L4,20 L2,20 L2,16 L4,16 Z M2,10 L2,16 L0,16 L0,10 L2,10 Z M16,18 L16,22 L14,22 L14,18 L16,18 Z M18,22 L18,24 L16,24 L16,22 L18,22 Z M14,12 L14,18 L12,18 L12,12 L14,12 Z"
                className="lcd-base"
                fill-rule="nonzero"
              ></path>
            </g>
            <g
              id="block"
              className="instrument"
              transform="translate(6.000000, 4.000000)"
              fill-rule="nonzero"
            >
              <path
                d="M22,12 L24,12 L24,18 L20,18 L20,20 L16,20 L16,18 L18,18 L18,16 L20,16 L20,12 L16,12 L16,16 L12,16 L12,12 L14,12 L14,10 L22,10 L22,12 Z M2,2 L30,2 L30,4 L28,4 L28,6 L6,6 L6,28 L4,28 L4,30 L2,30 L2,2 Z M16,22 L20,22 L20,26 L16,26 L16,22 Z"
                className="lcd-highlight"
              ></path>
              <path
                d="M20,10 L22,10 L22,16 L18,16 L18,18 L14,18 L14,16 L16,16 L16,14 L18,14 L18,10 L14,10 L14,14 L10,14 L10,10 L12,10 L12,8 L20,8 L20,10 Z M2,32 L2,30 L0,30 L0,2 L2,2 L2,0 L30,0 L30,2 L32,2 L32,30 L30,30 L30,32 L2,32 Z M2,2 L2,30 L30,30 L30,2 L2,2 Z M14,20 L18,20 L18,24 L14,24 L14,20 Z M4,4 L8,4 L8,8 L4,8 L4,4 Z M24,4 L28,4 L28,8 L24,8 L24,4 Z M24,24 L28,24 L28,28 L24,28 L24,24 Z M4,24 L8,24 L8,28 L4,28 L4,24 Z"
                className="lcd-base"
              ></path>
            </g>
            <g
              id="die"
              className="synth-randomize"
              transform="translate(4.000000, 0.000000)"
            >
              <path
                d="M32,12 L32,10 L34,10 L34,12 L34,14 L30,14 L30,16 L26,16 L26,18 L22,18 L22,20 L20,20 L20,38 L16,38 L16,20 L14,20 L14,18 L10,18 L10,16 L6,16 L6,14 L2,14 L2,12 L2,10 L4,10 L4,12 L8,12 L8,14 L12,14 L12,16 L16,16 L16,18 L20,18 L20,16 L24,16 L24,14 L28,14 L28,12 L32,12 Z M4,20 L8,20 L8,22 L4,22 L4,20 Z M10,32 L14,32 L14,34 L10,34 L10,32 Z M16,12 L20,12 L20,14 L16,14 L16,12 Z M28,20 L32,20 L32,22 L28,22 L28,20 Z M25,26 L29,26 L29,28 L25,28 L25,26 Z M22,32 L26,32 L26,34 L22,34 L22,32 Z"
                className="lcd-highlight"
              ></path>
              <path
                d="M4,6 L8,6 L8,8 L4,8 L4,6 Z M2,8 L4,8 L4,10 L2,10 L2,8 Z M32,8 L34,8 L34,10 L32,10 L32,8 Z M32,30 L34,30 L34,32 L32,32 L32,30 Z M2,30 L4,30 L4,32 L2,32 L2,30 Z M8,4 L12,4 L12,6 L8,6 L8,4 Z M12,2 L16,2 L16,4 L12,4 L12,2 Z M16,0 L20,0 L20,2 L16,2 L16,0 Z M20,2 L24,2 L24,4 L20,4 L20,2 Z M24,4 L28,4 L28,6 L24,6 L24,4 Z M28,6 L32,6 L32,8 L28,8 L28,6 Z M0,10 L2,10 L2,30 L0,30 L0,10 Z M34,10 L36,10 L36,30 L34,30 L34,10 Z M4,32 L8,32 L8,34 L4,34 L4,32 Z M12,36 L16,36 L16,38 L12,38 L12,36 Z M20,36 L24,36 L24,38 L20,38 L20,36 Z M16,38 L20,38 L20,40 L16,40 L16,38 Z M28,32 L32,32 L32,34 L28,34 L28,32 Z M24,34 L28,34 L28,36 L24,36 L24,34 Z M8,34 L12,34 L12,36 L8,36 L8,34 Z M4,16 L8,16 L8,20 L4,20 L4,16 Z M28,16 L32,16 L32,20 L28,20 L28,16 Z M25,22 L29,22 L29,26 L25,26 L25,22 Z M10,28 L14,28 L14,32 L10,32 L10,28 Z M22,28 L26,28 L26,32 L22,32 L22,28 Z M16,8 L20,8 L20,12 L16,12 L16,8 Z"
                className="lcd-base"
                fill-rule="nonzero"
              ></path>
            </g>
          </g>
        </g>

        <g className="synth-staff" transform="translate(10.000000, 2.000000)">
          <path
            d="M4,22 L86,22 L86,18 L4,18 L4,22 Z M4,24 L4,28 L86,28 L86,24 L4,24 Z M4,30 L4,34 L86,34 L86,30 L4,30 Z M-1.42108547e-14,34 L-1.42108547e-14,12 L-1.43669798e-14,10 L90,10 L90,12 L90,34 L90,36 L-1.43669798e-14,36 L-1.43669798e-14,34 Z M4,12 L4,16 L86,16 L86,12 L4,12 Z"
            className="staff-lines lcd-highlight"
          ></path>
          <g
            className="staff-normal"
            transform="translate(36.000000, 4.000000)"
          >
            <polygon
              className="notehead note-C3"
              points="14 36 14 35 16 35 16 33 22 33 22 15 24 15 24 36 27 36 27 38 24 38 24 39 22 39 22 41 16 41 16 39 14 39 14 38 11 38 11 36"
            ></polygon>
            <polygon
              className="notehead note-D3"
              points="22 30 22 12 24 12 24 36 22 36 22 38 16 38 16 36 14 36 14 32 16 32 16 30"
            ></polygon>
            <polygon
              className="notehead note-E3"
              points="22 27 22 9 24 9 24 33 22 33 22 35 16 35 16 33 14 33 14 29 16 29 16 27"
            ></polygon>
            <polygon
              className="notehead note-F3"
              points="22 24 22 6 24 6 24 30 22 30 22 32 16 32 16 30 14 30 14 26 16 26 16 24"
            ></polygon>
            <polygon
              className="notehead note-G3"
              points="22 21 22 3 24 3 24 27 22 27 22 29 16 29 16 27 14 27 14 23 16 23 16 21"
            ></polygon>
            <polygon
              className="notehead note-A3"
              points="22 18 22 0 24 0 24 24 22 24 22 26 16 26 16 24 14 24 14 20 16 20 16 18"
            ></polygon>
            <polygon
              className="notehead note-B3"
              points="16 23 16 41 14 41 14 17 16 17 16 15 22 15 22 17 24 17 24 21 22 21 22 23"
            ></polygon>
            <polygon
              className="notehead note-C4"
              points="16 20 16 38 14 38 14 14 16 14 16 12 22 12 22 14 24 14 24 18 22 18 22 20"
            ></polygon>
            <polygon
              className="notehead note-D4"
              points="16 17 16 35 14 35 14 11 16 11 16 9 22 9 22 11 24 11 24 15 22 15 22 17"
            ></polygon>
            <polygon
              className="notehead note-E4"
              points="16 14 16 32 14 32 14 8 16 8 16 6 22 6 22 8 24 8 24 12 22 12 22 14"
            ></polygon>
            <path
              d="M24,36 L27,36 L27,38 L24,38 L24,39 L22,39 L22,41 L16,41 L16,39 L14,39 L14,38 L11,38 L11,36 L14,36 L14,35 L16,35 L16,33 L22,33 L22,15 L24,15 L24,36 Z M8,36 L8,40 L6,40 L6,38 L4,38 L4,42 L2,42 L2,40 L0,40 L0,38 L2,38 L2,36 L0,36 L0,34 L2,34 L2,30 L4,30 L4,32 L6,32 L6,28 L8,28 L8,30 L10,30 L10,32 L8,32 L8,34 L10,34 L10,36 L8,36 Z M6,36 L6,34 L4,34 L4,36 L6,36 Z"
              className="notehead note-Csharp3"
            ></path>
            <path
              d="M22,30 L22,12 L24,12 L24,36 L22,36 L22,38 L16,38 L16,36 L14,36 L14,32 L16,32 L16,30 L22,30 Z M10,34 L10,38 L8,38 L8,36 L6,36 L6,40 L4,40 L4,38 L2,38 L2,36 L4,36 L4,34 L2,34 L2,32 L4,32 L4,28 L6,28 L6,30 L8,30 L8,26 L10,26 L10,28 L12,28 L12,30 L10,30 L10,32 L12,32 L12,34 L10,34 Z M8,34 L8,32 L6,32 L6,34 L8,34 Z"
              className="notehead note-Dsharp3"
            ></path>
            <path
              d="M10,28 L10,32 L8,32 L8,30 L6,30 L6,34 L4,34 L4,32 L2,32 L2,30 L4,30 L4,28 L2,28 L2,26 L4,26 L4,22 L6,22 L6,24 L8,24 L8,20 L10,20 L10,22 L12,22 L12,24 L10,24 L10,26 L12,26 L12,28 L10,28 Z M8,28 L8,26 L6,26 L6,28 L8,28 Z M22,24 L22,6 L24,6 L24,30 L22,30 L22,32 L16,32 L16,30 L14,30 L14,26 L16,26 L16,24 L22,24 Z"
              className="notehead note-Fsharp3"
            ></path>
            <path
              d="M10,24 L10,28 L8,28 L8,26 L6,26 L6,30 L4,30 L4,28 L2,28 L2,26 L4,26 L4,24 L2,24 L2,22 L4,22 L4,18 L6,18 L6,20 L8,20 L8,16 L10,16 L10,18 L12,18 L12,20 L10,20 L10,22 L12,22 L12,24 L10,24 Z M8,24 L8,22 L6,22 L6,24 L8,24 Z M22,21 L22,3 L24,3 L24,27 L22,27 L22,29 L16,29 L16,27 L14,27 L14,23 L16,23 L16,21 L22,21 Z"
              className="notehead note-Gsharp3"
            ></path>
            <path
              d="M10,22 L10,26 L8,26 L8,24 L6,24 L6,28 L4,28 L4,26 L2,26 L2,24 L4,24 L4,22 L2,22 L2,20 L4,20 L4,16 L6,16 L6,18 L8,18 L8,14 L10,14 L10,16 L12,16 L12,18 L10,18 L10,20 L12,20 L12,22 L10,22 Z M8,22 L8,20 L6,20 L6,22 L8,22 Z M22,18 L22,0 L24,0 L24,24 L22,24 L22,26 L16,26 L16,24 L14,24 L14,20 L16,20 L16,18 L22,18 Z"
              className="notehead note-Asharp3"
            ></path>
            <path
              d="M10,16 L10,20 L8,20 L8,18 L6,18 L6,22 L4,22 L4,20 L2,20 L2,18 L4,18 L4,16 L2,16 L2,14 L4,14 L4,10 L6,10 L6,12 L8,12 L8,8 L10,8 L10,10 L12,10 L12,12 L10,12 L10,14 L12,14 L12,16 L10,16 Z M8,16 L8,14 L6,14 L6,16 L8,16 Z M16,20 L16,38 L14,38 L14,14 L16,14 L16,12 L22,12 L22,14 L24,14 L24,18 L22,18 L22,20 L16,20 Z"
              className="notehead note-Csharp4"
            ></path>
            <path
              d="M10,12 L10,16 L8,16 L8,14 L6,14 L6,18 L4,18 L4,16 L2,16 L2,14 L4,14 L4,12 L2,12 L2,10 L4,10 L4,6 L6,6 L6,8 L8,8 L8,4 L10,4 L10,6 L12,6 L12,8 L10,8 L10,10 L12,10 L12,12 L10,12 Z M8,12 L8,10 L6,10 L6,12 L8,12 Z M16,17 L16,35 L14,35 L14,11 L16,11 L16,9 L22,9 L22,11 L24,11 L24,15 L22,15 L22,17 L16,17 Z"
              className="notehead note-Dsharp4"
            ></path>
          </g>
          <g className="staff-odd" transform="translate(26.000000, 0.000000)">
            <path
              d="M26,34 L26,32 L30,32 L30,34 L38,34 L38,38 L40,38 L40,42 L42,42 L42,46 L14,46 L14,42 L16,42 L16,38 L18,38 L18,34 L26,34 Z M22,36 L22,42 L20,42 L20,44 L26,44 L26,42 L24,42 L24,36 L22,36 Z M26,38 L26,40 L28,40 L28,38 L26,38 Z M28,38 L28,40 L30,40 L30,38 L28,38 Z M34,38 L34,40 L36,40 L36,38 L34,38 Z M28,36 L28,38 L30,38 L30,36 L28,36 Z M32,38 L32,40 L34,40 L34,38 L32,38 Z M32,36 L32,38 L34,38 L34,36 L32,36 Z M34,36 L34,38 L36,38 L36,36 L34,36 Z M26,36 L26,38 L28,38 L28,36 L26,36 Z M20,36 L20,38 L22,38 L22,36 L20,36 Z M28,42 L28,44 L36,44 L36,42 L28,42 Z M26,26 L30,26 L30,28 L26,28 L26,26 Z M24,28 L26,28 L26,32 L24,32 L24,28 Z M30,28 L32,28 L32,32 L30,32 L30,28 Z"
              className="notehead note-C3"
            ></path>
            <path
              d="M32,34 L32,16 L34,16 L34,40 L32,40 L32,42 L16,42 L16,40 L14,40 L14,36 L16,36 L16,34 L32,34 Z M16,36 L16,40 L32,40 L32,36 L16,36 Z"
              className="notehead note-D3"
            ></path>
            <path
              d="M24,30 L26,30 L26,32 L24,32 L24,30 Z M26,32 L28,32 L28,34 L26,34 L26,32 Z M28,34 L30,34 L30,36 L28,36 L28,34 Z M30,36 L32,36 L32,38 L30,38 L30,36 Z M32,38 L34,38 L34,40 L32,40 L32,38 Z M24,38 L26,38 L26,40 L24,40 L24,38 Z M26,36 L28,36 L28,38 L26,38 L26,36 Z M30,32 L32,32 L32,34 L30,34 L30,32 Z M32,13 L34,13 L34,32 L32,32 L32,13 Z"
              className="notehead note-E3"
            ></path>
            <path
              d="M34,36 L24,36 L24,34 L26,34 L26,32 L28,32 L28,30 L30,30 L30,28 L32,28 L32,10 L34,10 L34,36 Z M28,32 L28,34 L32,34 L32,32 L28,32 Z M30,30 L30,32 L32,32 L32,30 L30,30 Z"
              className="notehead note-F3"
            ></path>
            <path
              d="M32,16 L26,16 L26,14 L32,14 L32,12 L34,12 L34,14 L44,14 L44,16 L34,16 L34,31 L32,31 L32,33 L26,33 L26,31 L24,31 L24,27 L26,27 L26,25 L32,25 L32,16 Z M30,10 L32,10 L32,12 L30,12 L30,10 Z M26,8 L30,8 L30,10 L26,10 L26,8 Z M24,10 L26,10 L26,14 L24,14 L24,10 Z"
              className="notehead note-G3"
            ></path>
            <path
              d="M32,8 L30,8 L30,6 L32,6 L32,0 L34,0 L34,10 L36,10 L36,12 L34,12 L34,18 L36,18 L36,20 L34,20 L34,28 L32,28 L32,30 L26,30 L26,28 L24,28 L24,24 L26,24 L26,22 L32,22 L32,16 L30,16 L30,14 L32,14 L32,8 Z M36,18 L40,18 L40,20 L36,20 L36,18 Z M26,14 L30,14 L30,16 L26,16 L26,14 Z M36,10 L40,10 L40,12 L36,12 L36,10 Z M36,16 L40,16 L40,18 L36,18 L36,16 Z M40,18 L42,18 L42,20 L40,20 L40,18 Z M26,12 L30,12 L30,14 L26,14 L26,12 Z M36,8 L40,8 L40,10 L36,10 L36,8 Z M24,14 L26,14 L26,16 L24,16 L24,14 Z M40,10 L42,10 L42,12 L40,12 L40,10 Z M36,2 L40,2 L40,4 L36,4 L36,2 Z M36,0 L40,0 L40,2 L36,2 L36,0 Z M40,2 L42,2 L42,4 L40,4 L40,2 Z M34,2 L36,2 L36,4 L34,4 L34,2 Z M26,4 L30,4 L30,6 L26,6 L26,4 Z M24,6 L30,6 L30,8 L24,8 L24,6 Z"
              className="notehead note-A3"
            ></path>
            <path
              d="M24,28 L24,24 L22,24 L22,22 L20,22 L20,20 L26,20 L26,16 L28,16 L28,14 L30,14 L30,16 L32,16 L32,20 L38,20 L38,22 L36,22 L36,24 L34,24 L34,28 L36,28 L36,30 L34,30 L32,30 L32,28 L30,28 L30,44 L28,44 L28,28 L26,28 L26,30 L24,30 L22,30 L22,28 L24,28 Z M26,20 L26,22 L32,22 L32,20 L26,20 Z M28,16 L28,20 L30,20 L30,16 L28,16 Z M24,22 L24,24 L34,24 L34,22 L24,22 Z M26,24 L26,26 L32,26 L32,24 L26,24 Z"
              className="notehead note-B3"
            ></path>
            <path
              d="M44,16 L44,14 L46,14 L46,22 L44,22 L44,20 L40,20 L40,16 L44,16 Z M34,20 L30,20 L30,16 L34,16 L34,14 L36,14 L36,22 L34,22 L34,20 Z M26,22 L28,22 L28,24 L26,24 L26,38 L24,38 L24,14 L26,14 L26,22 Z M28,10 L32,10 L32,12 L28,12 L28,10 Z M28,24 L32,24 L32,26 L28,26 L28,24 Z M26,12 L28,12 L28,14 L26,14 L26,12 Z M32,12 L34,12 L34,14 L32,14 L32,12 Z M32,22 L34,22 L34,24 L32,24 L32,22 Z M38,10 L42,10 L42,12 L38,12 L38,10 Z M20,38 L24,38 L24,40 L20,40 L20,38 Z M38,24 L42,24 L42,26 L38,26 L38,24 Z M36,12 L38,12 L38,14 L36,14 L36,12 Z M36,22 L38,22 L38,24 L36,24 L36,22 Z M42,12 L44,12 L44,14 L42,14 L42,12 Z M42,22 L44,22 L44,24 L42,24 L42,22 Z"
              className="notehead note-C4"
            ></path>
            <path
              d="M26,21 L26,24 L24,24 L24,15 L26,15 L26,13 L32,13 L32,15 L34,15 L34,19 L32,19 L32,21 L26,21 Z M18,12 L20,12 L20,16 L18,16 L18,12 Z M36,12 L38,12 L38,16 L36,16 L36,12 Z M36,20 L38,20 L38,24 L36,24 L36,20 Z M26,34 L48,34 L48,36 L26,36 L26,34 Z M16,16 L18,16 L18,26 L16,26 L16,16 Z M38,16 L40,16 L40,20 L38,20 L38,16 Z M22,8 L26,8 L26,10 L22,10 L22,8 Z M28,26 L34,26 L34,28 L28,28 L28,26 Z M26,24 L28,24 L28,26 L26,26 L26,24 Z M34,24 L36,24 L36,26 L34,26 L34,24 Z M34,10 L36,10 L36,12 L34,12 L34,10 Z M20,10 L22,10 L22,12 L20,12 L20,10 Z M26,6 L30,6 L30,8 L26,8 L26,6 Z M30,8 L34,8 L34,10 L30,10 L30,8 Z M18,26 L20,26 L20,30 L18,30 L18,26 Z M20,30 L22,30 L22,32 L20,32 L20,30 Z M22,32 L26,32 L26,34 L22,34 L22,32 Z"
              className="notehead note-D4"
            ></path>
            <polygon
              className="notehead note-E4"
              points="30 18 30 20 28 20 28 18 26 18 26 16 24 16 24 10 28 10 28 12 30 12 30 10 34 10 34 16 32 16 32 18"
            ></polygon>
            <path
              d="M39,34 L41,34 L41,38 L39,38 L39,34 Z M39,28 L43,28 L43,30 L39,30 L39,28 Z M39,30 L41,30 L41,32 L39,32 L39,30 Z M43,24 L45,24 L45,28 L43,28 L43,24 Z M39,22 L43,22 L43,24 L39,24 L39,22 Z M37,24 L39,24 L39,26 L37,26 L37,24 Z M19,22 L21,22 L21,26 L19,26 L19,22 Z M19,16 L23,16 L23,18 L19,18 L19,16 Z M19,18 L21,18 L21,20 L19,20 L19,18 Z M23,12 L25,12 L25,16 L23,16 L23,12 Z M19,10 L23,10 L23,12 L19,12 L19,10 Z M17,12 L19,12 L19,14 L17,14 L17,12 Z M24,40 L24,39 L26,39 L26,37 L32,37 L32,19 L34,19 L34,40 L38,40 L38,42 L34,42 L34,43 L32,43 L32,45 L26,45 L26,43 L24,43 L24,42 L20,42 L20,40 L24,40 Z M18,40 L18,44 L16,44 L16,42 L14,42 L14,46 L12,46 L12,44 L10,44 L10,42 L12,42 L12,40 L10,40 L10,38 L12,38 L12,34 L14,34 L14,36 L16,36 L16,32 L18,32 L18,34 L20,34 L20,36 L18,36 L18,38 L20,38 L20,40 L18,40 Z M16,40 L16,38 L14,38 L14,40 L16,40 Z"
              className="notehead note-Csharp3"
            ></path>
            <path
              d="M26,38 L44,38 L44,40 L20,40 L20,38 L18,38 L18,32 L20,32 L20,30 L24,30 L24,32 L26,32 L26,38 Z M22,26 L18,26 L18,24 L20,24 L20,22 L16,22 L16,20 L18,20 L18,18 L20,18 L20,20 L22,20 L22,18 L24,18 L24,20 L28,20 L28,22 L26,22 L26,24 L30,24 L30,26 L28,26 L28,28 L26,28 L26,26 L24,26 L24,28 L22,28 L22,26 Z M22,24 L24,24 L24,22 L22,22 L22,24 Z"
              className="notehead note-Dsharp3"
            ></path>
            <path
              d="M22,32 L24,32 L24,30 L22,30 L22,28 L24,28 L28,28 L28,30 L30,30 L30,34 L28,34 L28,36 L24,36 L22,36 L22,32 Z M20,30 L22,30 L22,34 L20,34 L20,30 Z M24,24 L26,24 L26,28 L24,28 L24,24 Z M22,20 L24,20 L24,24 L22,24 L22,20 Z M20,16 L22,16 L22,20 L20,20 L20,16 Z M22,16 L28,16 L28,18 L22,18 L22,16 Z M16,14 L20,14 L20,18 L16,18 L16,14 Z M28,18 L32,18 L32,20 L28,20 L28,18 Z M34,22 L36,22 L36,24 L34,24 L34,22 Z M34,24 L38,24 L38,26 L40,26 L40,30 L38,30 L38,32 L34,32 L32,32 L32,30 L30,30 L30,26 L32,26 L32,24 L34,24 Z M32,20 L34,20 L34,22 L32,22 L32,20 Z M32,26 L32,28 L34,28 L34,26 L32,26 Z"
              className="notehead note-Fsharp3"
            ></path>
            <path
              d="M32,20 L32,4 L34,4 L34,32 L32,32 L32,22 L30,22 L30,20 L32,20 Z M24,18 L30,18 L30,20 L24,20 L24,18 Z M16,26 L18,26 L18,36 L16,36 L16,26 Z M20,20 L24,20 L24,22 L20,22 L20,20 Z M20,38 L26,38 L26,40 L20,40 L20,38 Z M18,36 L20,36 L20,38 L18,38 L18,36 Z M18,22 L20,22 L20,26 L18,26 L18,22 Z M30,32 L32,32 L32,36 L30,36 L30,32 Z M26,36 L30,36 L30,38 L26,38 L26,36 Z M28,30 L28,34 L26,34 L26,32 L24,32 L24,36 L22,36 L22,34 L20,34 L20,32 L22,32 L22,30 L20,30 L20,28 L22,28 L22,24 L24,24 L24,26 L26,26 L26,22 L28,22 L28,24 L30,24 L30,26 L28,26 L28,28 L30,28 L30,30 L28,30 Z M26,30 L26,28 L24,28 L24,30 L26,30 Z"
              className="notehead note-Gsharp3"
            ></path>
            <path
              d="M26,24 L26,20 L32,20 L32,24 L38,24 L38,28 L36,28 L36,30 L22,30 L22,28 L20,28 L20,24 L26,24 Z M24,22 L26,22 L26,24 L24,24 L24,22 Z M32,22 L34,22 L34,24 L32,24 L32,22 Z M18,18 L22,18 L22,22 L18,22 L18,18 Z M24,14 L28,14 L28,18 L24,18 L24,14 Z M30,14 L34,14 L34,18 L30,18 L30,14 Z M36,18 L40,18 L40,22 L36,22 L36,18 Z"
              className="notehead note-Asharp3"
              fill-rule="nonzero"
            ></path>
            <path
              d="M36,24 L32,24 L32,22 L50,22 L50,24 L46,24 L46,28 L36,28 L36,24 Z M37,10 L41,10 L41,12 L37,12 L37,10 Z M37,14 L41,14 L41,16 L37,16 L37,14 Z M41,12 L45,12 L45,14 L41,14 L41,12 Z M18,18 L20,18 L20,16 L16,16 L16,22 L22,22 L22,24 L16,24 L16,30 L14,30 L14,24 L13,24 L14,24 L14,32 L12,32 L12,24 L13,24 L10,24 L10,22 L14,22 L14,18 L16,18 L16,22 L18,22 L18,18 Z M8,34 L8,30 L10,30 L10,32 L12,32 L12,34 L8,34 Z M20,18 L22,18 L22,20 L20,20 L20,18 Z"
              className="notehead note-Csharp4"
            ></path>
            <path
              d="M0,16 L8,16 L8,20 L0,20 L0,16 Z M60,28 L60,18 L58,18 L58,16 L56,16 L56,10 L58,10 L58,12 L60,12 L60,14 L62,14 L62,18 L64,18 L64,28 L62,28 L62,32 L60,32 L60,34 L58,34 L58,36 L56,36 L56,30 L58,30 L58,28 L60,28 Z M32,28 L30,28 L30,18 L32,18 L32,14 L34,14 L34,12 L36,12 L36,10 L38,10 L38,16 L36,16 L36,18 L34,18 L34,28 L36,28 L36,30 L38,30 L38,36 L36,36 L36,34 L34,34 L34,32 L32,32 L32,28 Z M52,24 L52,18 L54,18 L54,26 L52,26 L52,28 L50,28 L50,30 L44,30 L44,28 L48,28 L48,26 L50,26 L50,24 L52,24 Z M48,16 L48,20 L46,20 L46,18 L44,18 L44,14 L46,14 L46,16 L48,16 Z M42,22 L40,22 L40,18 L42,18 L42,20 L44,20 L44,24 L42,24 L42,22 Z M18,28 L20,28 L20,36 L18,36 L18,32 L16,32 L16,28 L14,28 L14,24 L12,24 L12,20 L10,20 L10,12 L12,12 L12,16 L14,16 L14,20 L16,20 L16,24 L18,24 L18,28 Z M22,32 L30,32 L30,36 L22,36 L22,32 Z"
              className="notehead note-Dsharp4"
            ></path>
          </g>
          <g className="staff-drag" transform="translate(30.000000, 4.000000)">
            <path
              d="M30,30 L32,30 L32,32 L36,32 L36,34 L28,34 L28,32 L30,32 L26,32 L26,28 L30,28 L30,30 Z M14,30 L16,30 L16,32 L20,32 L20,34 L12,34 L12,32 L14,32 L10,32 L10,28 L14,28 L14,30 Z M34,28 L32,28 L32,24 L34,24 L34,22 L38,22 L38,24 L40,24 L40,20 L42,20 L42,28 L40,28 L40,32 L38,32 L38,30 L34,30 L34,28 Z M18,28 L16,28 L16,24 L18,24 L18,22 L22,22 L22,24 L24,24 L24,20 L28,20 L28,28 L24,28 L24,32 L22,32 L22,30 L18,30 L18,28 Z M14,12 L20,12 L20,14 L14,14 L14,12 Z M12,14 L16,14 L16,16 L12,16 L12,14 Z M20,14 L22,14 L22,16 L20,16 L20,14 Z M22,16 L24,16 L24,20 L22,20 L22,16 Z M10,16 L14,16 L14,20 L10,20 L10,16 Z M8,20 L12,20 L12,28 L8,28 L8,20 Z M20,32 L22,32 L22,34 L20,34 L20,32 Z M14,34 L20,34 L20,36 L14,36 L14,34 Z M30,12 L36,12 L36,14 L30,14 L30,12 Z M28,14 L32,14 L32,16 L28,16 L28,14 Z M36,14 L38,14 L38,16 L36,16 L36,14 Z M38,16 L40,16 L40,20 L38,20 L38,16 Z M26,16 L30,16 L30,20 L26,20 L26,16 Z M36,32 L38,32 L38,34 L36,34 L36,32 Z M30,34 L36,34 L36,36 L30,36 L30,34 Z M18,24 L18,26 L20,26 L20,24 L18,24 Z M34,24 L34,26 L36,26 L36,24 L34,24 Z"
              className="notehead note-C3"
              fill-rule="nonzero"
            ></path>
            <path
              d="M34,30 L34,36 L32,36 L32,40 L26,40 L26,34 L28,34 L28,32 L22,32 L22,36 L20,36 L20,40 L14,40 L14,34 L16,34 L16,28 L14,28 L14,22 L16,22 L16,18 L10,18 L10,24 L8,24 L8,28 L2,28 L2,22 L4,22 L4,16 L6,16 L6,10 L8,10 L8,4 L10,4 L10,2 L16,2 L16,8 L14,8 L14,12 L18,12 L18,10 L20,10 L20,4 L22,4 L22,2 L28,2 L28,8 L26,8 L26,12 L24,12 L24,16 L36,16 L36,18 L38,18 L38,12 L40,12 L40,10 L42,10 L42,8 L44,8 L44,6 L56,6 L56,8 L58,8 L58,14 L56,14 L56,20 L54,20 L54,26 L52,26 L52,30 L46,30 L46,24 L48,24 L48,22 L42,22 L42,26 L40,26 L40,30 L34,30 Z M22,16 L22,18 L24,18 L24,16 L22,16 Z M20,18 L20,20 L22,20 L22,18 L20,18 Z M18,20 L18,22 L20,22 L20,20 L18,20 Z M16,22 L16,28 L18,28 L18,22 L16,22 Z M50,12 L46,12 L46,14 L44,14 L44,16 L50,16 L50,12 Z M34,18 L34,24 L36,24 L36,18 L34,18 Z M32,24 L32,30 L34,30 L34,24 L32,24 Z M30,26 L30,22 L26,22 L26,24 L24,24 L24,26 L30,26 Z"
              className="notehead note-D3"
            ></path>
            <path
              d="M22,22 L18,22 L18,24 L16,24 L16,26 L14,26 L14,28 L12,28 L12,30 L10,30 L10,24 L12,24 L12,22 L14,22 L14,20 L16,20 L16,16 L18,16 L18,10 L20,10 L20,8 L22,8 L22,6 L28,6 L28,8 L30,8 L30,10 L32,10 L32,16 L30,16 L30,18 L28,18 L28,20 L22,20 L22,22 Z M12,30 L16,30 L16,32 L12,32 L12,30 Z M16,32 L22,32 L22,34 L16,34 L16,32 Z M22,30 L28,30 L28,32 L22,32 L22,30 Z M36,30 L40,30 L40,32 L36,32 L36,30 Z M40,32 L42,32 L42,34 L40,34 L40,32 Z M34,34 L40,34 L40,36 L34,36 L34,34 Z M28,28 L36,28 L36,30 L28,30 L28,28 Z M20,10 L20,12 L22,12 L22,10 L20,10 Z M20,14 L20,16 L22,16 L22,14 L20,14 Z M22,16 L22,18 L24,18 L24,16 L22,16 Z M26,16 L26,18 L28,18 L28,16 L26,16 Z M28,14 L28,16 L30,16 L30,14 L28,14 Z M28,10 L28,12 L30,12 L30,10 L28,10 Z M26,8 L26,10 L28,10 L28,8 L26,8 Z M22,8 L22,10 L24,10 L24,8 L22,8 Z M24,10 L24,12 L26,12 L26,10 L24,10 Z M22,12 L22,14 L24,14 L24,12 L22,12 Z M24,14 L24,16 L26,16 L26,14 L24,14 Z M26,12 L26,14 L28,14 L28,12 L26,12 Z"
              className="notehead note-E3"
            ></path>
            <path
              d="M21,30 L23,30 L23,32 L27,32 L27,34 L19,34 L19,32 L21,32 L17,32 L17,28 L21,28 L21,30 Z M35,10 L37,10 L37,12 L33,12 L33,8 L35,8 L35,10 Z M18,8 L18,6 L20,6 L20,10 L16,10 L16,8 L18,8 Z M12,12 L12,10 L14,10 L14,14 L10,14 L10,12 L12,12 Z M19,18 L19,16 L33,16 L33,18 L35,18 L35,22 L33,22 L33,20 L31,20 L31,26 L29,26 L29,22 L27,22 L27,24 L25,24 L25,22 L23,22 L23,20 L19,20 L19,22 L17,22 L17,18 L19,18 Z M15,22 L19,22 L19,28 L15,28 L15,22 Z M31,32 L33,32 L33,34 L31,34 L31,32 Z M21,34 L31,34 L31,36 L21,36 L21,34 Z M33,28 L35,28 L35,32 L33,32 L33,28 Z M35,22 L37,22 L37,28 L35,28 L35,22 Z"
              className="notehead note-F3"
              fill-rule="nonzero"
            ></path>
            <path
              d="M34,18 L34,16 L36,16 L36,14 L38,14 L38,20 L32,20 L32,18 L34,18 Z M24,14 L24,12 L32,12 L32,14 L34,14 L34,16 L30,16 L30,14 L26,14 L26,16 L24,16 L24,18 L22,18 L22,20 L20,20 L20,24 L22,24 L22,26 L30,26 L30,28 L32,28 L32,30 L34,30 L34,36 L32,36 L32,38 L30,38 L30,40 L20,40 L20,42 L16,42 L16,44 L8,44 L8,40 L10,40 L10,38 L12,38 L12,36 L18,36 L18,34 L26,34 L26,30 L20,30 L20,28 L18,28 L18,26 L16,26 L16,18 L18,18 L18,16 L20,16 L20,14 L24,14 Z"
              className="notehead note-G3"
              fill-rule="nonzero"
            ></path>
            <path
              d="M20,20 L20,16 L26,16 L26,20 L32,20 L32,24 L30,24 L30,26 L16,26 L16,24 L14,24 L14,20 L20,20 Z M18,18 L20,18 L20,20 L18,20 L18,18 Z M26,18 L28,18 L28,20 L26,20 L26,18 Z M12,14 L16,14 L16,18 L12,18 L12,14 Z M18,10 L22,10 L22,14 L18,14 L18,10 Z M24,10 L28,10 L28,14 L24,14 L24,10 Z M30,14 L34,14 L34,18 L30,18 L30,14 Z"
              className="notehead note-A3"
              fill-rule="nonzero"
            ></path>
            <path
              d="M36,14 L36,20 L38,20 L38,28 L34,28 L34,18 L32,18 L32,14 L30,14 L30,12 L32,12 L32,10 L40,10 L40,12 L42,12 L42,10 L48,10 L48,12 L50,12 L50,16 L52,16 L52,20 L54,20 L54,18 L58,18 L58,22 L54,22 L54,28 L50,28 L50,24 L48,24 L48,20 L46,20 L46,14 L44,14 L44,22 L40,22 L40,18 L38,18 L38,14 L36,14 Z M20,24 L20,30 L18,30 L18,32 L16,32 L16,34 L8,34 L8,32 L6,32 L6,27 L4,27 L4,22 L2,22 L2,16 L0,16 L0,12 L12,12 L12,14 L14,14 L14,16 L16,16 L16,14 L14,14 L14,12 L12,12 L12,6 L14,6 L14,4 L22,4 L22,6 L26,6 L26,10 L28,10 L28,14 L30,14 L30,18 L32,18 L32,26 L28,26 L28,22 L26,22 L26,18 L22,18 L22,24 L20,24 Z M18,24 L20,24 L20,22 L18,22 L18,24 Z M16,22 L16,20 L18,20 L18,16 L16,16 L16,20 L14,20 L14,22 L16,22 Z M18,14 L22,14 L22,8 L16,8 L16,10 L18,10 L18,14 Z M10,24 L10,30 L14,30 L14,28 L16,28 L16,26 L14,26 L14,24 L10,24 Z M8,20 L12,20 L12,18 L10,18 L10,16 L6,16 L6,19 L8,19 L8,20 Z M50,8 L48,8 L48,2 L56,2 L56,16 L52,16 L52,12 L50,12 L50,8 Z"
              className="notehead note-B3"
              fill-rule="nonzero"
            ></path>
            <path
              d="M34,30 L34,32 L16,32 L16,30 L14,30 L14,26 L16,26 L16,22 L18,22 L18,18 L20,18 L20,12 L22,12 L22,8 L24,8 L24,6 L26,6 L26,8 L28,8 L28,12 L30,12 L30,18 L32,18 L32,22 L34,22 L34,26 L36,26 L36,30 L34,30 Z M18,26 L18,28 L20,28 L20,26 L18,26 Z M20,24 L20,26 L22,26 L22,24 L20,24 Z M22,22 L22,24 L24,24 L24,22 L22,22 Z M24,20 L24,22 L26,22 L26,20 L24,20 Z M26,18 L26,20 L28,20 L28,18 L26,18 Z M30,26 L30,28 L32,28 L32,26 L30,26 Z M28,22 L28,24 L30,24 L30,22 L28,22 Z M26,24 L26,26 L28,26 L28,24 L26,24 Z M24,26 L24,28 L26,28 L26,26 L24,26 Z M26,12 L26,14 L28,14 L28,12 L26,12 Z M24,8 L24,10 L26,10 L26,8 L24,8 Z M24,14 L24,16 L26,16 L26,14 L24,14 Z M22,16 L22,18 L24,18 L24,16 L22,16 Z M20,18 L20,20 L22,20 L22,18 L20,18 Z M33,6 L37,6 L37,10 L33,10 L33,6 Z M16,2 L20,2 L20,6 L16,6 L16,2 Z M6,20 L10,20 L10,24 L6,24 L6,20 Z M41,16 L43,16 L43,18 L41,18 L41,16 Z M43,18 L45,18 L45,22 L43,22 L43,18 Z M41,22 L43,22 L43,24 L41,24 L41,22 Z M43,24 L45,24 L45,26 L43,26 L43,24 Z M10,0 L12,0 L12,2 L10,2 L10,0 Z M8,2 L10,2 L10,6 L8,6 L8,2 Z M10,12 L12,12 L12,14 L10,14 L10,12 Z M12,14 L14,14 L14,18 L12,18 L12,14 Z M37,0 L39,0 L39,2 L37,2 L37,0 Z M39,2 L41,2 L41,6 L39,6 L39,2 Z"
              className="notehead note-C4"
            ></path>
            <polygon
              className="notehead note-D4"
              points="14 8 12 8 12 6 16 6 16 8 18 8 18 10 20 10 20 12 22 12 22 14 24 14 24 16 26 16 26 14 24 14 24 12 22 12 22 10 20 10 20 8 18 8 18 6 22 6 22 8 24 8 24 10 26 10 26 12 28 12 28 14 30 14 30 8 32 8 32 6 34 6 34 22 32 22 32 26 30 26 30 28 28 28 28 30 22 30 22 28 20 28 20 26 18 26 18 24 16 24 16 22 14 22 14 20 12 20 12 16 14 16 14 18 16 18 16 20 18 20 18 22 20 22 20 20 18 20 18 18 16 18 16 16 14 16 14 14 12 14 12 10 14 10 14 12 16 12 16 14 18 14 18 16 20 16 20 18 22 18 22 16 20 16 20 14 18 14 18 12 16 12 16 10 14 10"
            ></polygon>
            <path
              d="M20,24 L16,24 L16,22 L14,22 L14,18 L34,18 L34,22 L32,22 L32,24 L28,24 L28,26 L20,26 L20,24 Z M18,14 L18,16 L16,16 L16,14 L14,14 L14,12 L12,12 L12,6 L16,6 L16,8 L18,8 L18,6 L22,6 L22,12 L20,12 L20,14 L18,14 Z M32,14 L32,16 L30,16 L30,14 L28,14 L28,12 L26,12 L26,6 L30,6 L30,8 L32,8 L32,6 L36,6 L36,12 L34,12 L34,14 L32,14 Z"
              className="notehead note-E4"
            ></path>
            <path
              d="M18,22 L20,22 L20,20 L16,20 L16,18 L22,18 L22,20 L24,20 L24,22 L22,22 L22,24 L18,24 L18,22 Z M28,22 L30,22 L30,20 L26,20 L26,18 L32,18 L32,20 L34,20 L34,22 L32,22 L32,24 L28,24 L28,22 Z M20,28 L30,28 L30,30 L20,30 L20,28 Z M38,12 L40,12 L40,16 L42,16 L42,32 L40,32 L40,34 L36,34 L36,36 L30,36 L30,34 L32,34 L32,30 L34,30 L34,28 L36,28 L36,18 L34,18 L34,14 L32,14 L32,16 L18,16 L18,14 L16,14 L16,18 L14,18 L14,28 L16,28 L16,30 L18,30 L18,34 L20,34 L20,36 L14,36 L14,34 L10,34 L10,32 L8,32 L8,16 L10,16 L10,12 L12,12 L12,8 L14,8 L14,6 L18,6 L18,4 L32,4 L32,6 L36,6 L36,8 L38,8 L38,12 Z M24,22 L26,22 L26,26 L24,26 L24,22 Z"
              className="notehead note-Csharp3"
            ></path>
            <path
              d="M32,12 L32,16 L30,16 L30,14 L28,14 L28,12 L30,12 L30,10 L32,10 L32,8 L28,8 L28,6 L34,6 L34,12 L32,12 Z M28,20 L24,20 L24,22 L22,22 L22,26 L24,26 L24,28 L18,28 L18,26 L16,26 L16,28 L14,28 L14,30 L12,30 L12,32 L8,32 L8,28 L10,28 L10,26 L12,26 L12,24 L14,24 L14,22 L12,22 L12,16 L14,16 L14,18 L18,18 L18,20 L16,20 L16,22 L20,22 L20,20 L22,20 L22,18 L24,18 L24,16 L20,16 L20,12 L18,12 L18,6 L24,6 L24,8 L20,8 L20,10 L22,10 L22,12 L24,12 L24,14 L26,14 L26,16 L28,16 L28,18 L30,18 L30,20 L32,20 L32,22 L36,22 L36,20 L34,20 L34,18 L38,18 L38,16 L40,16 L40,22 L38,22 L38,24 L40,24 L40,26 L42,26 L42,28 L44,28 L44,32 L40,32 L40,30 L38,30 L38,28 L36,28 L36,26 L34,26 L34,28 L28,28 L28,26 L30,26 L30,22 L28,22 L28,20 Z M28,8 L28,12 L26,12 L26,10 L24,10 L24,8 L28,8 Z M18,16 L20,16 L20,18 L18,18 L18,16 Z M34,16 L34,18 L32,18 L32,16 L34,16 Z"
              className="notehead note-Dsharp3"
            ></path>
            <path
              d="M16,18 L16,24 L14,24 L14,32 L12,32 L12,6 L14,6 L14,4 L18,4 L18,6 L20,6 L20,8 L22,8 L22,10 L24,10 L24,12 L26,12 L26,16 L28,16 L28,18 L30,18 L30,22 L32,22 L32,24 L36,24 L36,26 L40,26 L40,30 L38,30 L38,32 L22,32 L22,30 L20,30 L20,26 L18,26 L18,18 L16,18 Z M14,6 L14,8 L16,8 L16,6 L14,6 Z M16,8 L16,10 L18,10 L18,8 L16,8 Z M18,10 L18,14 L20,14 L20,10 L18,10 Z M20,14 L20,18 L22,18 L22,14 L20,14 Z M22,18 L22,22 L24,22 L24,18 L22,18 Z M24,22 L24,24 L26,24 L26,22 L24,22 Z M26,24 L26,26 L32,26 L32,24 L26,24 Z"
              className="notehead note-Fsharp3"
            ></path>
            <path
              d="M24,24 L22,24 L22,20 L24,20 L24,18 L28,18 L28,20 L26,20 L24,20 L24,22 L26,22 L26,24 L30,24 L30,22 L32,22 L32,18 L30,18 L30,16 L20,16 L20,18 L18,18 L18,26 L20,26 L20,28 L22,28 L22,30 L14,30 L14,28 L12,28 L12,20 L14,20 L14,16 L16,16 L16,14 L18,14 L18,12 L20,12 L20,10 L30,10 L30,12 L32,12 L32,14 L34,14 L34,16 L36,16 L36,20 L38,20 L38,28 L36,28 L36,30 L30,30 L30,28 L26,28 L26,26 L24,26 L24,24 Z"
              className="notehead note-Gsharp3"
            ></path>
            <path
              d="M20,26 L22,26 L22,28 L16,28 L16,22 L18,22 L18,20 L20,20 L20,14 L22,14 L22,10 L16,10 L16,12 L14,12 L14,14 L16,14 L16,16 L18,16 L18,20 L12,20 L12,18 L10,18 L10,12 L12,12 L12,10 L14,10 L14,8 L24,8 L24,10 L26,10 L26,18 L24,18 L24,20 L22,20 L22,22 L20,22 L20,26 Z M16,30 L22,30 L22,34 L20,34 L20,36 L16,36 L16,30 Z M22,24 L24,24 L24,26 L22,26 L22,24 Z M32,6 L32,4 L36,4 L36,6 L38,6 L38,12 L36,12 L36,16 L34,16 L34,24 L30,24 L30,6 L32,6 Z M30,26 L36,26 L36,30 L34,30 L34,32 L30,32 L30,26 Z"
              className="notehead note-Asharp3"
            ></path>
            <path
              d="M40,16 L42,16 L42,28 L30,28 L30,24 L24,24 L24,20 L28,20 L28,16 L24,16 L24,12 L28,12 L28,8 L24,8 L24,6 L22,6 L22,4 L28,4 L28,6 L30,6 L30,8 L40,8 L40,16 Z M40,18 L38,18 L38,14 L34,14 L34,10 L30,10 L30,14 L34,14 L34,18 L30,18 L30,22 L34,22 L34,26 L38,26 L38,22 L40,22 L40,18 Z M16,22 L16,20 L20,20 L20,24 L24,24 L24,26 L16,26 L16,30 L18,30 L18,38 L20,38 L20,44 L18,44 L18,40 L16,40 L16,32 L14,32 L14,24 L12,24 L12,16 L10,16 L10,6 L8,6 L8,2 L12,2 L12,6 L22,6 L22,8 L24,8 L24,12 L20,12 L20,8 L16,8 L16,12 L12,12 L12,14 L14,14 L14,16 L16,16 L16,20 L14,20 L14,22 L16,22 Z M16,12 L20,12 L20,16 L16,16 L16,12 Z M20,16 L24,16 L24,20 L20,20 L20,16 Z M34,18 L38,18 L38,22 L34,22 L34,18 Z"
              className="notehead note-Csharp4"
              fill-rule="nonzero"
            ></path>
            <path
              d="M36,8 L34,8 L34,6 L38,6 L38,10 L36,10 L36,8 Z M32,8 L34,8 L34,10 L32,10 L32,14 L28,14 L28,6 L32,6 L32,8 Z M22,6 L26,6 L26,8 L22,8 L22,12 L24,12 L24,14 L20,14 L20,12 L18,12 L18,4 L20,4 L20,2 L22,2 L22,6 Z M54,8 L52,8 L52,6 L56,6 L56,8 L58,8 L58,12 L54,12 L54,8 Z M48,8 L46,8 L46,6 L50,6 L50,8 L52,8 L52,12 L48,12 L48,8 Z M42,8 L46,8 L46,12 L42,12 L42,8 Z M58,6 L60,6 L60,8 L58,8 L58,6 Z M24,10 L26,10 L26,12 L24,12 L24,10 Z M54,24 L54,26 L34,26 L34,24 L36,24 L36,22 L56,22 L56,24 L54,24 Z M28,18 L34,18 L34,20 L32,20 L32,22 L30,22 L30,24 L28,24 L28,26 L30,26 L30,28 L32,28 L32,32 L28,32 L28,30 L26,30 L26,28 L24,28 L24,26 L22,26 L22,28 L20,28 L20,32 L16,32 L16,26 L18,26 L18,22 L20,22 L20,18 L24,18 L24,22 L26,22 L26,20 L28,20 L28,18 Z M12,30 L12,32 L2,32 L2,30 L0,30 L0,24 L2,24 L2,20 L4,20 L4,18 L14,18 L14,20 L16,20 L16,26 L14,26 L14,30 L12,30 Z M10,28 L10,24 L12,24 L12,22 L6,22 L6,26 L4,26 L4,28 L10,28 Z"
              className="notehead note-Dsharp4"
              fill-rule="nonzero"
            ></path>
          </g>
          <g className="staff-butts" transform="translate(28.000000, 0.000000)">
            <path
              d="M24,36 L24,34 L28,34 L28,36 L36,36 L36,40 L38,40 L38,44 L40,44 L40,48 L12,48 L12,44 L14,44 L14,40 L16,40 L16,36 L24,36 Z M20,38 L20,44 L18,44 L18,46 L24,46 L24,44 L22,44 L22,38 L20,38 Z M24,40 L24,42 L26,42 L26,40 L24,40 Z M26,40 L26,42 L28,42 L28,40 L26,40 Z M32,40 L32,42 L34,42 L34,40 L32,40 Z M26,38 L26,40 L28,40 L28,38 L26,38 Z M30,40 L30,42 L32,42 L32,40 L30,40 Z M30,38 L30,40 L32,40 L32,38 L30,38 Z M32,38 L32,40 L34,40 L34,38 L32,38 Z M24,38 L24,40 L26,40 L26,38 L24,38 Z M18,38 L18,40 L20,40 L20,38 L18,38 Z M26,44 L26,46 L34,46 L34,44 L26,44 Z M24,28 L28,28 L28,30 L24,30 L24,28 Z M22,30 L24,30 L24,34 L22,34 L22,30 Z M28,30 L30,30 L30,34 L28,34 L28,30 Z"
              className="notehead note-C3"
            ></path>
            <path
              d="M36,26 L38,26 L38,28 L34,28 L32,28 L32,30 L30,30 L30,32 L30,36 L28,36 L28,32 L26,32 L24,32 L24,36 L22,36 L22,32 L22,30 L20,30 L20,28 L18,28 L14,28 L14,26 L16,26 L16,24 L14,24 L14,20 L18,20 L18,22 L20,22 L20,24 L32,24 L32,22 L34,22 L34,20 L38,20 L38,24 L36,24 L36,26 Z M14,34 L14,32 L16,32 L16,30 L20,30 L20,34 L16,34 L16,36 L14,36 L14,40 L12,40 L12,34 L14,34 Z M38,36 L36,36 L36,34 L32,34 L32,30 L36,30 L36,32 L38,32 L38,34 L40,34 L40,40 L38,40 L38,36 Z M28,26 L24,26 L24,28 L26,28 L28,28 L28,26 Z M10,40 L12,40 L12,46 L10,46 L10,40 Z M12,46 L14,46 L14,48 L12,48 L12,46 Z M40,40 L42,40 L42,46 L40,46 L40,40 Z M38,46 L40,46 L40,48 L38,48 L38,46 Z M36,44 L36,46 L34,46 L16,46 L16,44 L14,44 L14,42 L16,42 L16,40 L20,40 L20,42 L32,42 L32,40 L36,40 L36,42 L38,42 L38,44 L36,44 Z M22,38 L30,38 L30,36 L36,36 L36,38 L32,38 L32,40 L20,40 L20,38 L16,38 L16,36 L22,36 L22,38 Z M12,28 L14,28 L14,32 L12,32 L12,28 Z M38,28 L40,28 L40,32 L38,32 L38,28 Z"
              className="notehead note-D3"
            ></path>
            <path
              d="M32,42 L32,40 L34,40 L34,42 L38,42 L38,44 L43,44 L43,46 L37,46 L37,44 L34,44 L32,44 L32,46 L30,46 L30,44 L28,44 L28,42 L26,42 L26,40 L24,40 L24,38 L22,38 L22,36 L20,36 L20,34 L22,34 L22,32 L20,32 L20,30 L22,30 L22,26 L24,26 L24,30 L26,30 L26,28 L28,28 L28,26 L32,26 L32,30 L30,30 L30,32 L32,32 L32,30 L34,30 L34,32 L36,32 L36,34 L34,34 L34,36 L32,36 L32,40 L28,40 L28,36 L30,36 L30,34 L28,34 L28,36 L26,36 L26,38 L28,38 L28,40 L30,40 L30,42 L32,42 Z M38,38 L38,40 L36,40 L36,38 L34,38 L34,36 L36,36 L36,34 L38,34 L38,30 L40,30 L40,32 L42,32 L42,30 L40,30 L40,28 L44,28 L44,32 L44,34 L42,34 L42,36 L40,36 L40,38 L38,38 Z M14,32 L16,32 L16,36 L14,36 L14,34 L12,34 L12,32 L12,28 L14,28 L14,32 Z M26,24 L26,20 L28,20 L28,26 L24,26 L24,24 L26,24 Z M22,44 L22,40 L24,40 L24,44 L28,44 L28,46 L26,46 L26,48 L24,48 L24,46 L20,46 L20,44 L22,44 Z M20,38 L22,38 L22,40 L20,40 L20,44 L18,44 L18,38 L16,38 L16,36 L20,36 L20,38 Z M34,24 L34,22 L36,22 L36,24 L38,24 L38,28 L36,28 L36,26 L32,26 L32,24 L34,24 Z M18,28 L20,28 L20,30 L18,30 L18,32 L16,32 L16,22 L18,22 L18,28 Z M18,18 L20,18 L20,22 L18,22 L18,18 Z M20,16 L22,16 L22,18 L20,18 L20,16 Z M22,18 L24,18 L24,20 L22,20 L22,18 Z M20,20 L22,20 L22,22 L20,22 L20,20 Z M10,20 L18,20 L18,22 L10,22 L10,20 Z M14,26 L16,26 L16,28 L14,28 L14,26 Z M38,40 L40,40 L40,42 L38,42 L38,40 Z M34,28 L36,28 L36,30 L34,30 L34,28 Z M18,32 L20,32 L20,34 L18,34 L18,32 Z M20,24 L22,24 L22,26 L20,26 L20,24 Z"
              className="notehead note-E3"
            ></path>
            <path
              d="M35,40 L35,38 L37,38 L37,36 L37,34 L39,34 L39,36 L41,36 L41,40 L39,40 L39,42 L37,42 L37,44 L33,44 L33,42 L31,42 L31,40 L33,40 L35,40 Z M32,18 L36,18 L36,22 L32,22 L32,18 Z M16,36 L20,36 L20,40 L16,40 L16,36 Z M22,28 L24,28 L24,32 L22,32 L22,28 Z M18,30 L22,30 L22,32 L18,32 L18,30 Z M24,24 L24,22 L26,22 L26,24 L28,24 L28,30 L26,30 L26,32 L24,32 L24,30 L24,24 Z M36,14 L36,12 L38,12 L38,10 L40,10 L40,14 L38,14 L38,16 L36,16 L34,16 L34,14 L36,14 Z M32,10 L34,10 L34,14 L32,14 L32,10 Z M34,8 L38,8 L38,10 L34,10 L34,8 Z M29,36 L31,36 L31,40 L29,40 L29,36 Z M31,34 L33,34 L33,36 L31,36 L31,34 Z M33,32 L37,32 L37,34 L33,34 L33,32 Z M18,32 L24,32 L24,34 L18,34 L18,32 Z M18,20 L24,20 L24,22 L18,22 L18,20 Z M14,24 L16,24 L16,30 L14,30 L14,24 Z M16,30 L18,30 L18,32 L16,32 L16,30 Z M16,22 L18,22 L18,24 L16,24 L16,22 Z M24,6 L28,6 L28,10 L24,10 L24,6 Z M16,12 L18,12 L18,14 L16,14 L16,12 Z"
              className="notehead note-F3"
            ></path>
            <path
              d="M34,24 L34,28 L30,28 L30,24 L24,24 L24,22 L36,22 L36,24 L34,24 Z M20,24 L20,28 L16,28 L16,24 L10,24 L10,22 L22,22 L22,24 L20,24 Z M18,34 L28,34 L28,36 L18,36 L18,34 Z"
              className="notehead note-G3"
            ></path>
            <path
              d="M16,28 L16,26 L18,26 L18,22 L14,22 L14,24 L12,24 L12,28 L16,28 Z M18,28 L18,30 L10,30 L10,28 L8,28 L8,24 L10,24 L10,22 L12,22 L12,20 L20,20 L20,22 L22,22 L22,26 L20,26 L20,28 L18,28 Z M12,12 L16,12 L16,14 L12,14 L12,12 Z M12,16 L16,16 L16,18 L12,18 L12,16 Z M16,14 L20,14 L20,16 L16,16 L16,14 Z M28,24 L36,24 L36,26 L28,26 L28,24 Z M36,22 L44,22 L44,24 L36,24 L36,22 Z M44,20 L52,20 L52,22 L44,22 L44,20 Z M36,26 L44,26 L44,28 L36,28 L36,26 Z M44,28 L52,28 L52,30 L44,30 L44,28 Z"
              className="notehead note-A3"
            ></path>
            <path
              d="M16,34 L28,34 L28,36 L12,36 L12,34 L14,34 L14,32 L16,32 L16,34 Z M36,16 L38,16 L38,14 L40,14 L40,26 L38,26 L38,28 L36,28 L36,30 L32,30 L32,32 L30,32 L30,18 L32,18 L32,16 L34,16 L34,14 L36,14 L36,16 Z M36,18 L36,20 L38,20 L38,18 L36,18 Z M36,22 L36,24 L34,24 L34,26 L36,26 L36,24 L38,24 L38,22 L36,22 Z M34,28 L36,28 L34,28 Z M36,10 L36,12 L22,12 L22,10 L36,10 Z M18,18 L18,32 L16,32 L16,18 L18,18 Z M38,12 L38,14 L36,14 L36,12 L38,12 Z M22,12 L22,14 L20,14 L20,12 L22,12 Z M20,14 L20,18 L18,18 L18,14 L20,14 Z M28,32 L30,32 L30,34 L28,34 L28,32 Z"
              className="notehead note-B3"
            ></path>
            <path
              d="M34,18 L34,20 L28,20 L28,18 L26,18 L26,16 L24,16 L24,14 L22,14 L22,12 L24,12 L34,12 L34,14 L36,14 L36,18 L34,18 Z M34,26 L36,26 L36,30 L34,30 L34,32 L32,32 L30,32 L30,30 L28,30 L28,28 L28,26 L26,26 L26,24 L26,22 L30,22 L30,24 L32,24 L34,24 L34,26 Z M22,20 L24,20 L24,26 L22,26 L22,28 L20,28 L18,28 L18,26 L16,26 L16,14 L18,14 L18,16 L20,16 L20,18 L22,18 L22,20 Z"
              className="notehead note-C4"
            ></path>
            <path
              d="M0,16 L8,16 L8,20 L0,20 L0,16 Z M58,28 L58,18 L56,18 L56,16 L54,16 L54,10 L56,10 L56,12 L58,12 L58,14 L60,14 L60,18 L62,18 L62,28 L60,28 L60,32 L58,32 L58,34 L56,34 L56,36 L54,36 L54,30 L56,30 L56,28 L58,28 Z M30,28 L28,28 L28,18 L30,18 L30,14 L32,14 L32,12 L34,12 L34,10 L36,10 L36,16 L34,16 L34,18 L32,18 L32,28 L34,28 L34,30 L36,30 L36,36 L34,36 L34,34 L32,34 L32,32 L30,32 L30,28 Z M50,24 L50,18 L52,18 L52,26 L50,26 L50,28 L48,28 L48,30 L42,30 L42,28 L46,28 L46,26 L48,26 L48,24 L50,24 Z M46,16 L46,20 L44,20 L44,18 L42,18 L42,14 L44,14 L44,16 L46,16 Z M40,22 L38,22 L38,18 L40,18 L40,20 L42,20 L42,24 L40,24 L40,22 Z M18,28 L20,28 L20,36 L18,36 L18,32 L16,32 L16,28 L14,28 L14,24 L12,24 L12,20 L10,20 L10,12 L12,12 L12,16 L14,16 L14,20 L16,20 L16,24 L18,24 L18,28 Z M22,32 L30,32 L30,36 L22,36 L22,32 Z"
              className="notehead note-D4"
            ></path>
            <path
              d="M24,18 L24,20 L22,20 L22,12 L24,12 L24,10 L30,10 L30,12 L32,12 L32,16 L30,16 L30,18 L24,18 Z M16,8 L18,8 L18,12 L16,12 L16,8 Z M34,8 L36,8 L36,12 L34,12 L34,8 Z M34,16 L36,16 L36,20 L34,20 L34,16 Z M24,30 L46,30 L46,32 L24,32 L24,30 Z M14,12 L16,12 L16,22 L14,22 L14,12 Z M36,12 L38,12 L38,16 L36,16 L36,12 Z M20,4 L24,4 L24,6 L20,6 L20,4 Z M26,22 L32,22 L32,24 L26,24 L26,22 Z M24,20 L26,20 L26,22 L24,22 L24,20 Z M32,20 L34,20 L34,22 L32,22 L32,20 Z M32,6 L34,6 L34,8 L32,8 L32,6 Z M18,6 L20,6 L20,8 L18,8 L18,6 Z M24,2 L28,2 L28,4 L24,4 L24,2 Z M28,4 L32,4 L32,6 L28,6 L28,4 Z M16,22 L18,22 L18,26 L16,26 L16,22 Z M18,26 L20,26 L20,28 L18,28 L18,26 Z M20,28 L24,28 L24,30 L20,30 L20,28 Z M46,28 L50,28 L50,30 L46,30 L46,28 Z M50,26 L52,26 L52,28 L50,28 L50,26 Z M40,24 L50,24 L50,26 L40,26 L40,24 Z M38,22 L40,22 L40,24 L38,24 L38,22 Z M40,20 L48,20 L48,22 L40,22 L40,20 Z M48,18 L50,18 L50,20 L48,20 L48,18 Z M42,16 L48,16 L48,18 L42,18 L42,16 Z M40,14 L42,14 L42,16 L40,16 L40,14 Z M42,12 L44,12 L44,14 L42,14 L42,12 Z M44,8 L46,8 L46,12 L44,12 L44,8 Z M42,6 L44,6 L44,8 L42,8 L42,6 Z M40,2 L42,2 L42,6 L40,6 L40,2 Z M42,0 L44,0 L44,2 L42,2 L42,0 Z"
              className="notehead note-E4"
            ></path>
            <path
              d="M37,34 L39,34 L39,38 L37,38 L37,34 Z M37,28 L41,28 L41,30 L37,30 L37,28 Z M37,30 L39,30 L39,32 L37,32 L37,30 Z M41,24 L43,24 L43,28 L41,28 L41,24 Z M37,22 L41,22 L41,24 L37,24 L37,22 Z M35,24 L37,24 L37,26 L35,26 L35,24 Z M17,22 L19,22 L19,26 L17,26 L17,22 Z M17,16 L21,16 L21,18 L17,18 L17,16 Z M17,18 L19,18 L19,20 L17,20 L17,18 Z M21,12 L23,12 L23,16 L21,16 L21,12 Z M17,10 L21,10 L21,12 L17,12 L17,10 Z M15,12 L17,12 L17,14 L15,14 L15,12 Z M22,40 L22,39 L24,39 L24,37 L30,37 L30,19 L32,19 L32,40 L36,40 L36,42 L32,42 L32,43 L30,43 L30,45 L24,45 L24,43 L22,43 L22,42 L18,42 L18,40 L22,40 Z M16,40 L16,44 L14,44 L14,42 L12,42 L12,46 L10,46 L10,44 L8,44 L8,42 L10,42 L10,40 L8,40 L8,38 L10,38 L10,34 L12,34 L12,36 L14,36 L14,32 L16,32 L16,34 L18,34 L18,36 L16,36 L16,38 L18,38 L18,40 L16,40 Z M14,40 L14,38 L12,38 L12,40 L14,40 Z"
              className="notehead note-Csharp3"
            ></path>
            <path
              d="M36,22 L36,24 L38,24 L38,28 L34,28 L34,26 L32,26 L32,24 L20,24 L20,26 L18,26 L18,28 L14,28 L14,24 L16,24 L16,22 L14,22 L14,20 L20,20 L20,18 L22,18 L22,12 L24,12 L24,16 L28,16 L28,12 L30,12 L30,18 L32,18 L32,20 L38,20 L38,22 L36,22 Z M14,14 L12,14 L12,8 L14,8 L14,12 L16,12 L16,14 L20,14 L20,18 L16,18 L16,16 L14,16 L14,14 Z M38,12 L38,8 L40,8 L40,14 L38,14 L38,16 L36,16 L36,18 L32,18 L32,14 L36,14 L36,12 L38,12 Z M28,22 L28,20 L24,20 L24,22 L28,22 Z M10,8 L10,2 L12,2 L12,8 L10,8 Z M12,2 L12,0 L14,0 L14,2 L12,2 Z M40,8 L40,2 L42,2 L42,8 L40,8 Z M38,2 L38,0 L40,0 L40,2 L38,2 Z M36,4 L38,4 L38,6 L36,6 L36,8 L32,8 L32,6 L20,6 L20,8 L16,8 L16,6 L14,6 L14,4 L16,4 L16,2 L36,2 L36,4 Z M22,10 L22,12 L16,12 L16,10 L20,10 L20,8 L32,8 L32,10 L36,10 L36,12 L30,12 L30,10 L22,10 Z M12,20 L12,16 L14,16 L14,20 L12,20 Z M38,20 L38,16 L40,16 L40,20 L38,20 Z"
              className="notehead note-Dsharp3"
            ></path>
            <path
              d="M20,32 L22,32 L22,30 L20,30 L20,28 L22,28 L26,28 L26,30 L28,30 L28,34 L26,34 L26,36 L22,36 L20,36 L20,32 Z M18,30 L20,30 L20,34 L18,34 L18,30 Z M22,24 L24,24 L24,28 L22,28 L22,24 Z M20,20 L22,20 L22,24 L20,24 L20,20 Z M18,16 L20,16 L20,20 L18,20 L18,16 Z M20,16 L26,16 L26,18 L20,18 L20,16 Z M14,14 L18,14 L18,18 L14,18 L14,14 Z M26,18 L30,18 L30,20 L26,20 L26,18 Z M32,22 L34,22 L34,24 L32,24 L32,22 Z M32,24 L36,24 L36,26 L38,26 L38,30 L36,30 L36,32 L32,32 L30,32 L30,30 L28,30 L28,26 L30,26 L30,24 L32,24 Z M30,20 L32,20 L32,22 L30,22 L30,20 Z M30,26 L30,28 L32,28 L32,26 L30,26 Z"
              className="notehead note-Fsharp3"
            ></path>
            <path
              d="M22,28 L22,26 L20,26 L20,24 L22,24 L22,22 L24,22 L24,24 L28,24 L28,20 L32,20 L32,24 L34,24 L34,22 L38,22 L38,26 L36,26 L36,28 L38,28 L38,30 L40,30 L40,32 L42,32 L42,34 L40,34 L40,36 L36,36 L36,38 L36,40 L34,40 L34,42 L32,42 L32,40 L30,40 L30,38 L30,36 L26,36 L26,38 L24,38 L24,40 L22,40 L22,34 L18,34 L18,32 L16,32 L16,28 L18,28 L22,28 Z M40,18 L42,18 L42,20 L40,20 L40,18 Z M10,32 L14,32 L14,36 L10,36 L10,32 Z M10,28 L12,28 L12,30 L10,30 L10,28 Z M42,22 L46,22 L46,26 L42,26 L42,22 Z M40,36 L42,36 L42,38 L40,38 L40,36 Z M16,34 L18,34 L18,36 L16,36 L16,34 Z M17,20 L19,20 L19,22 L17,22 L17,20 Z"
              className="notehead note-Gsharp3"
            ></path>
            <polygon
              className="notehead note-Asharp3"
              points="28 26 28 28 26 28 26 26 24 26 24 24 22 24 22 18 26 18 26 20 28 20 28 18 32 18 32 24 30 24 30 26"
            ></polygon>
            <path
              d="M34,12 L34,14 L36,14 L36,16 L30,16 L30,14 L30,12 L30,10 L36,10 L36,12 L34,12 Z M22,12 L22,14 L24,14 L24,16 L18,16 L18,14 L18,12 L18,10 L24,10 L24,12 L22,12 Z M28,20 L26,20 L26,14 L28,14 L28,18 L30,18 L30,20 L28,20 Z M22,22 L24,22 L30,22 L32,22 L32,20 L34,20 L34,26 L32,26 L32,24 L30,24 L30,28 L24,28 L24,24 L22,24 L22,26 L20,26 L20,20 L22,20 L22,22 Z M34,18 L36,18 L36,20 L34,20 L34,18 Z M34,26 L36,26 L36,28 L34,28 L34,26 Z M18,26 L20,26 L20,28 L18,28 L18,26 Z M18,18 L20,18 L20,20 L18,20 L18,18 Z M26,24 L26,26 L28,26 L28,24 L26,24 Z"
              className="notehead note-Csharp4"
            ></path>
            <path
              d="M62,16 L62,20 L54,20 L54,16 L62,16 Z M4,28 L6,28 L6,30 L8,30 L8,36 L6,36 L6,34 L4,34 L4,32 L2,32 L2,28 L0,28 L0,18 L2,18 L2,14 L4,14 L4,12 L6,12 L6,10 L8,10 L8,16 L6,16 L6,18 L4,18 L4,28 Z M32,28 L32,32 L30,32 L30,34 L28,34 L28,36 L26,36 L26,30 L28,30 L28,28 L30,28 L30,18 L28,18 L28,16 L26,16 L26,10 L28,10 L28,12 L30,12 L30,14 L32,14 L32,18 L34,18 L34,28 L32,28 Z M12,24 L14,24 L14,26 L16,26 L16,28 L20,28 L20,30 L14,30 L14,28 L12,28 L12,26 L10,26 L10,18 L12,18 L12,24 Z M16,16 L18,16 L18,14 L20,14 L20,18 L18,18 L18,20 L16,20 L16,16 Z M22,22 L22,24 L20,24 L20,20 L22,20 L22,18 L24,18 L24,22 L22,22 Z M44,28 L44,24 L46,24 L46,20 L48,20 L48,16 L50,16 L50,12 L52,12 L52,20 L50,20 L50,24 L48,24 L48,28 L46,28 L46,32 L44,32 L44,36 L42,36 L42,28 L44,28 Z M40,32 L40,36 L32,36 L32,32 L40,32 Z"
              className="notehead note-Dsharp4"
            ></path>
          </g>
          <g className="staff-mario" transform="translate(32.000000, 4.000000)">
            <path
              d="M20,28 L20,26 L16,26 L16,24 L10,24 L10,22 L18,22 L18,24 L20,24 L20,18 L22,18 L22,16 L30,16 L30,18 L24,18 L24,28 L22,28 L22,32 L18,32 L18,28 L20,28 Z M26,38 L30,38 L30,40 L36,40 L36,38 L38,38 L38,40 L38,44 L30,44 L22,44 L12,44 L8,44 L6,44 L6,36 L8,36 L8,38 L12,38 L12,40 L22,40 L22,38 L24,38 L24,36 L26,36 L26,38 Z M32,28 L36,28 L36,32 L32,32 L32,28 Z"
              className="notehead note-C3"
            ></path>
            <path
              d="M16,38 L14,38 L14,30 L16,30 L16,32 L20,32 L20,30 L24,30 L24,32 L28,32 L28,30 L30,30 L30,28 L32,28 L32,34 L30,34 L30,40 L28,40 L28,38 L24,38 L24,40 L20,40 L20,38 L16,38 Z M26,24 L26,22 L28,22 L28,24 L30,24 L30,28 L28,28 L28,30 L26,30 L26,28 L24,28 L24,24 L26,24 Z M16,24 L20,24 L20,28 L16,28 L16,24 Z"
              className="notehead note-D3"
            ></path>
            <path
              d="M10,44 L10,36 L8,36 L8,40 L6,40 L6,30 L8,30 L8,32 L10,32 L10,30 L14,30 L14,28 L12,28 L12,24 L14,24 L14,22 L16,22 L16,24 L22,24 L22,22 L24,22 L24,16 L22,16 L22,14 L26,14 L26,12 L34,12 L34,14 L36,14 L36,16 L38,16 L38,18 L36,18 L36,20 L30,20 L30,22 L28,22 L28,26 L26,26 L26,28 L30,28 L30,30 L32,30 L32,32 L30,32 L30,34 L26,34 L26,36 L24,36 L24,28 L22,28 L22,30 L20,30 L20,32 L18,32 L18,34 L16,34 L16,36 L22,36 L22,40 L20,40 L20,38 L12,38 L12,42 L22,42 L22,40 L26,40 L26,42 L24,42 L24,44 L10,44 Z M12,36 L10,36 L12,36 Z M34,44 L26,44 L26,42 L32,42 L32,40 L34,40 L34,44 Z M22,12 L22,14 L16,14 L16,12 L22,12 Z M16,14 L16,16 L14,16 L14,14 L16,14 Z M14,16 L14,22 L12,22 L12,16 L14,16 Z M32,38 L32,40 L28,40 L28,38 L32,38 Z M28,36 L28,38 L26,38 L26,36 L28,36 Z M22,18 L22,20 L20,20 L20,18 L22,18 Z"
              className="notehead note-E3"
            ></path>
            <path
              d="M16,30 L16,44 L14,44 L14,30 L12,30 L12,44 L10,44 L10,30 L8,30 L8,26 L8,18 L8,16 L38,16 L38,18 L38,26 L38,30 L36,30 L36,44 L26,44 L26,30 L16,30 Z M10,18 L10,26 L28,26 L28,18 L10,18 Z M12,18 L14,18 L14,26 L12,26 L12,18 Z"
              className="notehead note-F3"
            ></path>
            <path
              d="M26,32 L18,32 L16,32 L16,30 L14,30 L14,28 L18,28 L18,26 L26,26 L26,28 L30,28 L30,30 L28,30 L28,32 L26,32 Z M26,16 L28,16 L28,18 L26,18 L26,20 L24,20 L24,16 L20,16 L20,20 L18,20 L18,18 L16,18 L16,16 L18,16 L18,14 L26,14 L26,16 Z M22,20 L24,20 L24,22 L22,22 L20,22 L20,20 L22,20 Z M30,26 L26,26 L26,24 L30,24 L30,22 L32,22 L32,28 L30,28 L30,26 Z M14,24 L18,24 L18,26 L14,26 L14,28 L12,28 L12,22 L14,22 L14,24 Z M14,18 L16,18 L16,22 L14,22 L14,18 Z M28,18 L30,18 L30,22 L28,22 L28,18 Z M18,22 L20,22 L20,24 L18,24 L18,22 Z M24,22 L26,22 L26,24 L24,24 L24,22 Z"
              className="notehead note-G3"
            ></path>
            <path
              d="M30,14 L26,14 L26,10 L24,10 L24,8 L30,8 L30,10 L32,10 L32,16 L30,16 L30,14 Z M16,22 L18,22 L18,24 L22,24 L22,26 L16,26 L14,26 L14,18 L16,18 L16,22 Z M10,28 L12,28 L12,30 L10,30 L10,28 Z M12,26 L14,26 L14,28 L12,28 L12,26 Z M22,22 L24,22 L24,24 L22,24 L22,22 Z M18,20 L20,20 L20,22 L18,22 L18,20 Z M20,18 L22,18 L22,20 L20,20 L20,18 Z M22,16 L24,16 L24,18 L22,18 L22,16 Z M24,20 L26,20 L26,22 L24,22 L24,20 Z M26,18 L28,18 L28,20 L26,20 L26,18 Z M28,16 L30,16 L30,18 L28,18 L28,16 Z M16,16 L18,16 L18,18 L16,18 L16,16 Z M18,14 L20,14 L20,16 L18,16 L18,14 Z M20,12 L22,12 L22,14 L20,14 L20,12 Z M22,10 L24,10 L24,12 L22,12 L22,10 Z"
              className="notehead note-A3"
            ></path>
            <path
              d="M14,20 L14,26 L10,26 L10,14 L12,14 L12,12 L16,12 L16,14 L14,14 L14,18 L16,18 L16,14 L18,14 L18,26 L16,26 L16,20 L14,20 Z M32,24 L30,24 L30,22 L34,22 L34,24 L36,24 L36,26 L32,26 L32,24 Z M32,18 L30,18 L30,14 L32,14 L32,12 L36,12 L36,14 L34,14 L34,18 L36,18 L36,20 L32,20 L32,18 Z M44,24 L48,24 L48,26 L44,26 L40,26 L40,12 L44,12 L48,12 L48,14 L44,14 L44,18 L46,18 L46,20 L44,20 L44,24 Z M24,24 L26,24 L26,26 L22,26 L22,24 L20,24 L20,12 L24,12 L24,24 Z M4,20 L4,26 L0,26 L0,12 L4,12 L6,12 L6,14 L4,14 L4,18 L6,18 L6,20 L4,20 Z M6,14 L8,14 L8,18 L6,18 L6,14 Z M26,12 L28,12 L28,24 L26,24 L26,12 Z M36,14 L38,14 L38,16 L36,16 L36,14 Z M36,20 L38,20 L38,24 L36,24 L36,20 Z"
              className="notehead note-B3"
            ></path>
            <path
              d="M18,10 L20,10 L20,12 L18,12 L18,10 Z M18,20 L20,20 L20,22 L18,22 L18,20 Z M16,12 L18,12 L18,20 L16,20 L16,12 Z M20,22 L24,22 L24,24 L20,24 L20,22 Z M20,8 L24,8 L24,10 L20,10 L20,8 Z M26,12 L28,12 L28,20 L26,20 L26,12 Z M24,10 L26,10 L26,12 L24,12 L24,10 Z M24,20 L26,20 L26,22 L24,22 L24,20 Z M22,12 L24,12 L24,20 L22,20 L22,12 Z M20,18 L22,18 L22,20 L20,20 L20,18 Z"
              className="notehead note-C4"
            ></path>
            <path
              d="M20,6 L20,4 L24,4 L24,6 L26,6 L26,12 L24,12 L24,16 L20,16 L20,12 L18,12 L18,6 L20,6 Z M20,18 L24,18 L24,22 L20,22 L20,18 Z"
              className="notehead note-D4"
            ></path>
            <path
              d="M22,40 L22,12 L18,12 L18,10 L14,10 L14,8 L10,8 L10,6 L22,6 L22,5 L22,6 L14,6 L14,4 L22,4 L22,5 L22,4 L18,4 L18,2 L22,2 L22,0 L24,0 L24,40 L27,40 L27,44 L19,44 L19,40 L22,40 Z"
              className="notehead note-E4"
            ></path>
            <path
              d="M10,44 L8,44 L8,12 L10,12 L10,10 L12,10 L12,8 L14,8 L14,6 L16,6 L16,4 L30,4 L30,6 L32,6 L32,8 L34,8 L34,10 L36,10 L36,12 L38,12 L38,44 L36,44 L10,44 Z M18,30 L18,34 L20,34 L20,30 L18,30 Z M12,32 L12,34 L14,34 L14,32 L12,32 Z M12,38 L12,40 L14,40 L14,38 L12,38 Z M18,38 L18,40 L20,40 L20,38 L18,38 Z M12,26 L12,28 L14,28 L14,26 L12,26 Z M12,14 L12,16 L14,16 L14,14 L12,14 Z M18,8 L18,10 L20,10 L20,8 L18,8 Z M18,14 L18,16 L20,16 L20,14 L18,14 Z M16,26 L16,30 L20,30 L20,26 L16,26 Z M16,28 L18,28 L18,30 L16,30 L16,28 Z M28,30 L26,30 L26,34 L28,34 L28,30 Z M34,32 L32,32 L32,34 L34,34 L34,32 Z M34,38 L32,38 L32,40 L34,40 L34,38 Z M28,38 L26,38 L26,40 L28,40 L28,38 Z M34,26 L32,26 L32,28 L34,28 L34,26 Z M34,14 L32,14 L32,16 L34,16 L34,14 Z M28,8 L26,8 L26,10 L28,10 L28,8 Z M28,14 L26,14 L26,16 L28,16 L28,14 Z M30,26 L26,26 L26,30 L30,30 L30,26 Z M28,28 L30,28 L30,30 L28,30 L28,28 Z M32,20 L32,22 L34,22 L34,20 L32,20 Z M12,20 L12,22 L14,22 L14,20 L12,20 Z M18,20 L18,22 L20,22 L20,20 L18,20 Z M26,20 L26,22 L28,22 L28,20 L26,20 Z"
              className="notehead note-Csharp3"
            ></path>
            <path
              d="M20,32 L16,32 L16,34 L14,34 L14,36 L8,36 L8,34 L6,34 L6,26 L8,26 L8,24 L14,24 L14,26 L16,26 L16,28 L26,28 L26,32 L24,32 L24,36 L22,36 L22,34 L20,34 L20,32 Z M10,34 L12,34 L12,26 L10,26 L10,34 Z M32,28 L32,26 L36,26 L36,28 L38,28 L38,30 L38,32 L36,32 L36,36 L38,36 L38,38 L38,40 L30,40 L30,38 L30,36 L32,36 L32,32 L30,32 L30,30 L30,28 L32,28 Z"
              className="notehead note-Dsharp3"
            ></path>
            <path
              d="M26,22 L26,6 L28,6 L28,28 L26,28 L26,30 L22,30 L22,32 L16,32 L16,30 L14,30 L14,26 L16,26 L16,28 L18,28 L18,30 L20,30 L20,28 L22,28 L22,26 L20,26 L20,24 L18,24 L18,22 L26,22 Z M16,24 L18,24 L18,26 L16,26 L16,24 Z"
              className="notehead note-Fsharp3"
            ></path>
            <path
              d="M14,22 L14,20 L12,20 L12,22 L12,24 L16,24 L16,26 L14,26 L14,28 L12,28 L12,26 L10,26 L10,18 L12,18 L12,16 L14,16 L14,18 L16,18 L16,16 L14,16 L14,14 L16,14 L16,12 L26,12 L26,14 L28,14 L28,16 L30,16 L30,18 L32,18 L32,26 L30,26 L30,28 L28,28 L28,26 L26,26 L26,24 L30,24 L30,20 L26,20 L26,24 L24,24 L24,28 L22,28 L22,24 L20,24 L20,28 L18,28 L18,24 L16,24 L16,22 L14,22 Z M24,14 L20,14 L20,18 L24,18 L24,14 Z M14,28 L16,28 L16,30 L14,30 L14,28 Z M26,28 L28,28 L28,30 L26,30 L26,28 Z M16,30 L26,30 L26,32 L16,32 L16,30 Z M18,20 L18,22 L20,22 L20,20 L18,20 Z"
              className="notehead note-Gsharp3"
            ></path>
            <path
              d="M26,16 L26,14 L28,14 L28,18 L30,18 L30,24 L28,24 L28,20 L26,20 L24,20 L24,16 L26,16 Z M20,14 L20,18 L18,18 L16,18 L16,14 L18,14 L18,12 L20,12 L20,14 Z M18,26 L26,26 L26,28 L18,28 L18,26 Z M14,18 L16,18 L16,24 L14,24 L14,18 Z M24,12 L26,12 L26,14 L24,14 L24,12 Z M20,10 L24,10 L24,12 L20,12 L20,10 Z M26,24 L28,24 L28,26 L26,26 L26,24 Z M16,24 L18,24 L18,26 L16,26 L16,24 Z M18,20 L22,20 L22,24 L18,24 L18,20 Z"
              className="notehead note-Asharp3"
            ></path>
            <path
              d="M18,10 L20,10 L20,12 L18,12 L18,10 Z M18,20 L20,20 L20,22 L18,22 L18,20 Z M16,12 L18,12 L18,20 L16,20 L16,12 Z M20,22 L24,22 L24,24 L20,24 L20,22 Z M20,8 L24,8 L24,10 L20,10 L20,8 Z M26,12 L28,12 L28,20 L26,20 L26,12 Z M24,10 L26,10 L26,12 L24,12 L24,10 Z M24,20 L26,20 L26,22 L24,22 L24,20 Z M22,12 L24,12 L24,20 L22,20 L22,12 Z M20,18 L22,18 L22,20 L20,20 L20,18 Z M4,10 L6,10 L6,12 L4,12 L4,10 Z M4,20 L6,20 L6,22 L4,22 L4,20 Z M2,12 L4,12 L4,20 L2,20 L2,12 Z M6,22 L10,22 L10,24 L6,24 L6,22 Z M6,8 L10,8 L10,10 L6,10 L6,8 Z M12,12 L14,12 L14,20 L12,20 L12,12 Z M10,10 L12,10 L12,12 L10,12 L10,10 Z M10,20 L12,20 L12,22 L10,22 L10,20 Z M8,12 L10,12 L10,20 L8,20 L8,12 Z M6,18 L8,18 L8,20 L6,20 L6,18 Z M32,10 L34,10 L34,12 L32,12 L32,10 Z M32,20 L34,20 L34,22 L32,22 L32,20 Z M30,12 L32,12 L32,20 L30,20 L30,12 Z M34,22 L38,22 L38,24 L34,24 L34,22 Z M34,8 L38,8 L38,10 L34,10 L34,8 Z M40,12 L42,12 L42,20 L40,20 L40,12 Z M38,10 L40,10 L40,12 L38,12 L38,10 Z M38,20 L40,20 L40,22 L38,22 L38,20 Z M36,12 L38,12 L38,20 L36,20 L36,12 Z M34,18 L36,18 L36,20 L34,20 L34,18 Z"
              className="notehead note-Csharp4"
            ></path>
            <path
              d="M20,8 L22,8 L22,4 L24,4 L24,10 L22,10 L20,10 L18,10 L18,4 L20,4 L20,8 Z M28,6 L28,8 L30,8 L30,10 L28,10 L28,12 L26,12 L26,4 L28,4 L30,4 L30,6 L28,6 Z M14,6 L14,4 L16,4 L16,12 L18,12 L18,14 L16,14 L14,14 L12,14 L12,12 L14,12 L14,8 L12,8 L12,6 L14,6 Z M30,6 L32,6 L32,8 L30,8 L30,6 Z"
              className="notehead note-Dsharp4"
            ></path>
          </g>

          <path
            d="M14,32 L18,32 L18,24 L16,24 L16,22 L16,18 L14,18 L14,20 L12,20 L12,30 L14,30 L14,32 Z M14,34 L12,34 L12,32 L10,32 L10,30 L8,30 L8,20 L10,20 L10,18 L12,18 L12,16 L14,16 L14,16 L14,6 L14,4 L18,4 L18,6 L16,6 L16,14 L18,14 L18,6 L20,6 L20,8 L22,8 L22,14 L20,14 L20,16 L18,16 L18,20 L20,20 L20,22 L24,22 L24,24 L26,24 L26,30 L24,30 L24,32 L22,32 L22,30 L22,24 L20,24 L20,32 L22,32 L22,34 L20,34 L20,38 L18,38 L18,34 L14,34 Z M12,40 L12,42 L10,42 L10,40 L10,36 L14,36 L14,40 L12,40 Z M12,42 L16,42 L16,44 L12,44 L12,42 Z M16,38 L18,38 L18,42 L16,42 L16,38 Z M14,24 L16,24 L16,28 L14,28 L14,24 Z"
            className="staff-clef lcd-base"
          ></path>
        </g>
      </g>

      <g id="synth-start">
        <rect
          id="hitarea"
          fill-opacity="0"
          fill-rule="nonzero"
          x="0"
          y="0"
          width="270"
          height="152"
        ></rect>
        <path
          d="M94,20 L96,20 L96,32 L94,32 L94,34 L92,34 L92,36 L82,36 L82,42 L80,42 L80,44 L70,44 L70,42 L68,42 L68,18 L70,18 L70,22 L72,22 L72,20 L74,20 L74,18 L70,18 L70,16 L92,16 L92,18 L94,18 L94,20 Z M82,22 L82,30 L86,30 L86,22 L82,22 Z"
          id="letter-p"
          className="lcd-base"
        ></path>
        <polygon
          id="letter-l"
          className="lcd-base"
          points="128 36 128 38 130 38 130 42 128 42 128 44 106 44 106 42 104 42 104 18 106 18 106 22 108 22 108 20 110 20 110 18 106 18 106 16 116 16 116 18 118 18 118 36"
        ></polygon>
        <path
          d="M164,20 L164,22 L166,22 L166,42 L164,42 L164,44 L160,44 L160,42 L158,42 L158,30 L152,30 L152,42 L150,42 L150,44 L140,44 L140,42 L138,42 L138,20 L140,20 L140,22 L142,22 L142,20 L144,20 L144,18 L142,18 L142,16 L160,16 L160,18 L162,18 L162,20 L164,20 Z M152,22 L152,26 L158,26 L158,22 L152,22 Z"
          id="letter-a"
          className="lcd-base"
        ></path>
        <polygon
          id="letter-y"
          className="lcd-base"
          points="198 26 198 28 196 28 196 30 194 30 194 42 192 42 192 44 184 44 184 42 182 42 182 30 180 30 180 28 178 28 178 26 176 26 176 24 174 24 174 18 176 18 176 22 178 22 178 20 180 20 180 18 176 18 176 16 184 16 184 18 186 18 186 20 190 20 190 18 192 18 192 16 200 16 200 18 202 18 202 24 200 24 200 26"
        ></polygon>
        <path
          d="M108,20 L108,22 L106,22 L106,18 L110,18 L110,20 L108,20 Z M72,20 L72,22 L70,22 L70,18 L74,18 L74,20 L72,20 Z M142,20 L142,22 L140,22 L140,18 L144,18 L144,20 L142,20 Z M178,20 L178,22 L176,22 L176,18 L180,18 L180,20 L178,20 Z"
          className="lcd-highlight"
        ></path>
      </g>
    </svg>
  </div>
);
