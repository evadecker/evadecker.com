import { action, atom } from "nanostores";
import type { NoteName } from "src/components/Synth/SynthKey";

const NUM_INSTRUMENTS = 8;

interface KeyPressEvent {
  note: NoteName;
  timestamp: string;
}

export const $isActive = atom<boolean>(false);
export const $isLoading = atom<boolean>(false);
export const $isShowingKeyboardLetters = atom<boolean>(false);
export const $activeInstrument = atom<number>(1);
export const $activeNotehead = atom<NoteName | null>(null);
export const $pressedKeys = atom<NoteName[] | []>([]);
export const $latestKey = atom<KeyPressEvent | null>(null);

export const activateSynth = action($isActive, "activateSynth", (store) => {
  store.set(true);
});

export const deactivateSynth = action($isActive, "deactivateSynth", (store) => {
  store.set(false);
});

export const nextInstrument = action(
  $activeInstrument,
  "nextInstrument",
  (store) => {
    store.set((store.get() + 1) % NUM_INSTRUMENTS);
  }
);

export const prevInstrument = action(
  $activeInstrument,
  "prevInstrument",
  (store) => {
    store.set((store.get() - 1 + NUM_INSTRUMENTS) % NUM_INSTRUMENTS);
  }
);

export const pressKey = action(
  $pressedKeys,
  "pressKey",
  (store, note: NoteName) => {
    hideKeyboardLetters();
    // If key isn't pressed, press it!
    if (![...store.get()].includes(note)) {
      store.set([...store.get(), note]);
      $latestKey.set({ note, timestamp: new Date().toISOString() });
    }
  }
);

export const releaseKey = action(
  $pressedKeys,
  "releaseKey",
  (store, note: NoteName) => {
    // If key is pressed, release it
    if ([...store.get()].includes(note))
      store.set(store.get().filter((k) => k !== note));
  }
);

export const releaseAllKeys = action(
  $pressedKeys,
  "releaseAllKeys",
  (store) => {
    // If any keys any pressed, release them
    if (store.get().length > 0) store.set([]);
  }
);

export const setActiveNotehead = action(
  $activeNotehead,
  "setActiveNotehead",
  (store, note: NoteName | null) => {
    store.set(note);
  }
);

export const hideKeyboardLetters = action(
  $isShowingKeyboardLetters,
  "hideKeyboardLetters",
  (store) => {
    store.set(false);
  }
);
