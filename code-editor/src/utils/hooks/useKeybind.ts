import { useEffect } from "react";

const keyboardCodes = {
  Backspace: "Backspace",
  Tab: "Tab",
  Enter: "Enter",
  ShiftLeft: "ShiftLeft",
  ControlLeft: "ControlLeft",
  MetaLeft: "MetaLeft",
  AltLeft: "AltLeft",
  CapsLock: "CapsLock",
  Escape: "Escape",
  Space: " ",
  ArrowLeft: "ArrowLeft",
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  ArrowDown: "ArrowDown",
  PageUp: "PageUp",
  PageDown: "PageDown",
  Home: "Home",
  End: "End",
  Insert: "Insert",
  Delete: "Delete",
  Digit0: "0",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  KeyA: "a",
  KeyB: "b",
  KeyC: "c",
  KeyD: "d",
  KeyE: "e",
  KeyF: "f",
  KeyG: "g",
  KeyH: "h",
  KeyI: "i",
  KeyJ: "j",
  KeyK: "k",
  KeyL: "l",
  KeyM: "m",
  KeyN: "n",
  KeyO: "o",
  KeyP: "p",
  KeyQ: "q",
  KeyR: "r",
  KeyS: "s",
  KeyT: "t",
  KeyU: "u",
  KeyV: "v",
  KeyW: "w",
  KeyX: "x",
  KeyY: "y",
  KeyZ: "z",
};
export const useKeybind = (
  combination: Array<keyof typeof keyboardCodes>,
  callback: (e: KeyboardEvent) => void
) => {
  const pressedKeys = new Set<string>();

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.delete(e.code);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      pressedKeys.add(e.code);
      const isPressed = combination.every((k) => pressedKeys.has(k));
      if (isPressed) {
        callback(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });
};
