import "./synth.css";

import { useStore } from "@nanostores/react";
import { Howl } from "howler";
import { useEffect } from "react";

import {
  $activeInstrument,
  $activeNotehead,
  $isActive,
  $isLoading,
  $isShowingKeyboardLetters,
  $latestKey,
  $pressedKeys,
  activateSynth,
  nextInstrument,
  prevInstrument,
  setActiveNotehead,
} from "../../stores/synth";
import { KeyboardHandler } from "./KeyboardHandler";
import { SynthBase } from "./SynthBase";
import { type NoteName } from "./SynthKey";
import { SynthKeys } from "./SynthKeys";
import { SynthScreen } from "./SynthScreen";
import { SynthStart } from "./SynthStart";
import { unmute } from "./unmute";

export const Synth = () => {
  const isActive = useStore($isActive);
  const isLoading = useStore($isLoading);
  const activeInstrument = useStore($activeInstrument);
  const activeNotehead = useStore($activeNotehead);
  const pressedKeys = useStore($pressedKeys);
  const latestKey = useStore($latestKey);
  const isShowingKeyboardLetters = useStore($isShowingKeyboardLetters);

  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const SOUNDS_DIRECTORY = "/sounds/";

  const audioContext = window.AudioContext ? new window.AudioContext() : null;

  useEffect(() => {
    unmute(audioContext, false, false);
  }, []);

  const sounds = {
    ui: {
      click: {
        howl: new Howl({
          src: [`${SOUNDS_DIRECTORY}click.mp3`],
        }),
      },

      ding: {
        howl: new Howl({
          src: [`${SOUNDS_DIRECTORY}ding.mp3`],
        }),
      },
    },
    instruments: [
      {
        name: "Piano",
        staffType: "normal",
        howl: new Howl({
          src: [`${SOUNDS_DIRECTORY}piano.mp3`],
          sprite: {
            A3: [0, 3776.2131519274376],
            Asharp3: [5000, 4848.390022675737],
            B3: [11000, 5923.968253968254],
            C3: [18000, 4685.034013605442],
            C4: [24000, 6752.970521541951],
            Csharp3: [32000, 5236.213151927437],
            Csharp4: [39000, 4604.285714285716],
            D3: [45000, 4814.603174603179],
            D4: [51000, 5732.607709750568],
            Dsharp3: [58000, 5294.943310657593],
            Dsharp4: [65000, 4705.011337868484],
            E3: [71000, 4688.752834467124],
            E4: [77000, 4537.25623582767],
            F3: [83000, 3645.7369614512486],
            Fsharp3: [88000, 4553.219954648526],
            G3: [94000, 4056.712018140587],
            Gsharp3: [100000, 3850.2040816326544],
          },
        }),
      },
      {
        name: "Harp",
        staffType: "normal",
        howl: new Howl({
          src: [`${SOUNDS_DIRECTORY}harp.mp3`],
          sprite: {
            A3: [0, 12151.768707482994],
            Asharp3: [14000, 12141.70068027211],
            B3: [28000, 7021.3378684807285],
            C3: [37000, 10906.64399092971],
            C4: [49000, 7013.015873015874],
            Csharp3: [58000, 10908.888888888896],
            Csharp4: [70000, 7000],
            D3: [78000, 10893.67346938775],
            D4: [90000, 6654.648526077097],
            Dsharp3: [98000, 10879.977324263038],
            Dsharp4: [110000, 6651.292517006808],
            E3: [118000, 10858.526077097507],
            E4: [130000, 6641.383219954661],
            F3: [138000, 10847.2335600907],
            Fsharp3: [150000, 10835.170068027197],
            G3: [162000, 12151.904761904774],
            Gsharp3: [176000, 12164.671201814059],
          },
        }),
      },
      {
        name: "Xylophone",
        staffType: "normal",
        howl: new Howl({
          src: [`${SOUNDS_DIRECTORY}xylophone.mp3`],
          sprite: {
            A3: [0, 898.2993197278911],
            Asharp3: [2000, 820.4535147392291],
            B3: [4000, 791.5873015873016],
            C3: [6000, 1268.27664399093],
            C4: [9000, 811.2244897959187],
            Csharp3: [11000, 1346.417233560091],
            Csharp4: [14000, 780.6349206349204],
            D3: [16000, 1340.7256235827667],
            D4: [19000, 784.0136054421762],
            Dsharp3: [21000, 1418.8662131519259],
            Dsharp4: [24000, 828.3673469387764],
            E3: [26000, 1311.3605442176884],
            E4: [29000, 781.3832199546482],
            F3: [31000, 1234.0816326530585],
            Fsharp3: [34000, 1279.7732426303837],
            G3: [37000, 830.7936507936518],
            Gsharp3: [39000, 862.6077097505699],
          },
        }),
      },
      {
        name: "Banjo",
        staffType: "normal",
        howl: new Howl({
          src: [`${SOUNDS_DIRECTORY}banjo.mp3`],
          sprite: {
            A3: [0, 2340.3401360544217],
            Asharp3: [4000, 2356.4172335600906],
            B3: [8000, 2190.181405895691],
            C3: [12000, 2238.2993197278915],
            C4: [16000, 2223.197278911563],
            Csharp3: [20000, 2314.376417233561],
            Csharp4: [24000, 2355.4421768707493],
            D3: [28000, 2359.50113378685],
            D4: [32000, 2356.870748299322],
            Dsharp3: [36000, 2354.943310657596],
            Dsharp4: [40000, 2253.401360544217],
            E3: [44000, 2276.848072562359],
            E4: [48000, 2241.4512471655357],
            F3: [52000, 2358.004535147394],
            Fsharp3: [56000, 2355.1020408163267],
            G3: [60000, 2357.48299319728],
            Gsharp3: [64000, 2234.444444444449],
          },
        }),
      },
      {
        name: "Ocarina",
        staffType: "normal",
        howl: new Howl({
          src: [`${SOUNDS_DIRECTORY}ocarina.mp3`],
          sprite: {
            A3: [0, 195.37414965986395],
            Asharp3: [2000, 183.33333333333312],
            B3: [4000, 198.66213151927425],
            C3: [6000, 172.2222222222225],
            C4: [8000, 190.3628117913829],
            Csharp3: [10000, 183.0158730158722],
            Csharp4: [12000, 201.9501133786843],
            D3: [14000, 188.5260770975048],
            D4: [16000, 193.96825396825434],
            Dsharp3: [18000, 203.85487528344726],
            Dsharp4: [20000, 182.9251700680281],
            E3: [22000, 210.61224489795904],
            E4: [24000, 180.38548752834416],
            F3: [26000, 200.13605442176896],
            Fsharp3: [28000, 204.3990929705224],
            G3: [30000, 205.39682539682502],
            Gsharp3: [32000, 192.58503401360372],
          },
        }),
      },
      {
        name: "Drag",
        staffType: "drag",
        howl: new Howl({
          src: [`${SOUNDS_DIRECTORY}rupaul.mp3`],
          sprite: {
            A3: [0, 2972.154195011338],
            Asharp3: [4000, 743.0385487528346],
            B3: [6000, 2229.1156462585027],
            C3: [10000, 5201.269841269841],
            C4: [17000, 2972.1541950113383],
            Csharp3: [21000, 2229.1156462585027],
            Csharp4: [25000, 5944.308390022677],
            D3: [32000, 2229.1156462585063],
            D4: [36000, 1486.077097505671],
            Dsharp3: [39000, 2229.1156462585063],
            Dsharp4: [43000, 743.0385487528355],
            E3: [45000, 1486.077097505671],
            E4: [48000, 1486.077097505671],
            F3: [51000, 1486.077097505671],
            Fsharp3: [54000, 2229.1156462585063],
            G3: [58000, 1486.077097505671],
            Gsharp3: [61000, 1486.077097505671],
          },
        }),
      },
      {
        name: "Butts",
        staffType: "butts",
        howl: new Howl({
          src: [`${SOUNDS_DIRECTORY}farts.mp3`],
          sprite: {
            A3: [0, 1255.1927437641723],
            Asharp3: [3000, 1780.9977324263039],
            B3: [6000, 1825.8956916099773],
            C3: [9000, 2000],
            C4: [12000, 325.9410430838994],
            Csharp3: [14000, 2000],
            Csharp4: [17000, 768.4807256235829],
            D3: [19000, 550.0226757369617],
            D4: [21000, 322.44897959183663],
            Dsharp3: [23000, 880.9070294784576],
            Dsharp4: [25000, 2207.6870748299307],
            E3: [29000, 1815.5102040816332],
            E4: [32000, 2511.4512471655316],
            F3: [36000, 1556.1904761904727],
            Fsharp3: [39000, 297.43764172335574],
            G3: [41000, 506.9160997732425],
            Gsharp3: [43000, 393.33333333333087],
          },
        }),
      },
      {
        name: "Super Mario World",
        staffType: "mario",
        howl: new Howl({
          src: [`${SOUNDS_DIRECTORY}mario.mp3`],
          sprite: {
            A3: [0, 433.78684807256235],
            Asharp3: [2000, 489.25170068027234],
            B3: [4000, 571.8367346938775],
            C3: [6000, 653.9229024943314],
            C4: [8000, 395.8276643990928],
            Csharp3: [10000, 987.6643990929708],
            Csharp4: [12000, 332.92517006802666],
            D3: [14000, 337.86848072562316],
            D4: [16000, 651.3832199546492],
            Dsharp3: [18000, 1592.9251700680284],
            Dsharp4: [21000, 474.8299319727885],
            E3: [23000, 244.89795918367463],
            E4: [25000, 826.2131519274369],
            F3: [27000, 658.5487528344664],
            Fsharp3: [29000, 660.1814058956918],
            G3: [31000, 109.75056689342466],
            Gsharp3: [33000, 822.3129251700669],
          },
        }),
      },
    ],
  };

  useEffect(() => {
    if (isActive) {
      setRandomInstrument();
    }
  }, [isActive]);

  const setRandomInstrument = () => {
    $isLoading.set(true);
    const baseSpeed = randomIntFromInterval(30, 50); // Lower is faster
    const force = randomIntFromInterval(5, 30); // How hard do you 'pull down the wheel'?
    const slowestSpeed = 700; // How slow can the roulette go before ending?
    const friction = 1.3; // How quickly to put on the brakes (1 to 1.5)

    let speed = baseSpeed;
    let i = 1;
    let timeout: NodeJS.Timeout;

    const roulette = () => {
      handleNext();
      i++;

      if (speed >= slowestSpeed) {
        sounds.ui.ding.howl.play();
        $isLoading.set(false);
        $isShowingKeyboardLetters.set(true);
        clearTimeout(timeout);
      } else {
        speed *= friction;
        if (i <= force) {
          speed *= 0.8;
        }
        timeout = setTimeout(roulette, speed);
      }
    };

    setTimeout(roulette, speed);
  };

  // When active notehead changes, start a countdown to hide the displayed notehead
  let noteheadTimerId: string | number | NodeJS.Timeout | undefined;

  const startNoteheadTimer = () => {
    if (noteheadTimerId) clearTimeout(noteheadTimerId);
    noteheadTimerId = setTimeout(() => {
      setActiveNotehead(null);
    }, 5000);
  };

  const stopNoteheadTimer = () => {
    clearTimeout(noteheadTimerId);
  };

  useEffect(() => {
    startNoteheadTimer();
    return stopNoteheadTimer;
  }, [activeNotehead]);

  const playNote = (note: NoteName) => {
    sounds.instruments[activeInstrument].howl.play(note);
    if (isShowingKeyboardLetters) $isShowingKeyboardLetters.set(false);
  };

  useEffect(() => {
    if (latestKey) {
      playNote(latestKey.note);
      setActiveNotehead(latestKey.note);
    }
  }, [latestKey]);

  const handleNext = () => {
    nextInstrument();
    sounds.ui.click.howl.play();
  };

  const handlePrev = () => {
    prevInstrument();
    sounds.ui.click.howl.play();
  };

  const handleClickInstrument = () => {
    setRandomInstrument();
  };

  return (
    <SynthBase>
      <KeyboardHandler onInstrumentChange={() => sounds.ui.click.howl.play()} />
      <SynthKeys pressedKeys={pressedKeys} />
      <SynthScreen
        isSynthActive={isActive}
        isSynthLoading={isLoading}
        activeInstrument={activeInstrument}
        activeNotehead={activeNotehead}
        onClickPrev={handlePrev}
        onClickNext={handleNext}
        onClickInstrument={handleClickInstrument}
      />
      <SynthStart isSynthActive={isActive} onClick={activateSynth} />
    </SynthBase>
  );
};
