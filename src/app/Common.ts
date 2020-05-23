// Do not allow arbitrary large values for repeatCount, paddToLength, etc to
// prevent you from accidentially DoS'ing yourself. Happened to me ;D
export const MAX_REPEAT_INT = 100000 - 1;
export const OUTPUT_COLORS = ["red", "green", "blue"];

export function toHex(value: number, length: number = 2){
  return value.toString(16).toUpperCase().padStart(length, "0")
}

export function range(min: number, max: number): number[] {
  let array = [];
  for (let i = min; i < max; i++) {
    array.push(i);
  }
  return array;
}

export function centerString(text: string, length: number, paddingChar: string) {
  paddingChar = paddingChar[0];
  let missing = length - text.length;
  if (missing > 0) {
    let startPadding = Math.ceil(missing / 2);
    let endPadding = Math.floor(missing / 2);
    text = paddingChar.repeat(startPadding) + text + paddingChar.repeat(endPadding);
  }
  return text;
}

export function isValidRepeatCountWhileEditing(repeatCountString: string): boolean {
  if (repeatCountString === "") {
    // allow the empty string while editing
    return true;
  } else {
    const repeatCount = Number(repeatCountString);
    return (!isNaN(repeatCount)) && (repeatCount > 0) && (repeatCount <= MAX_REPEAT_INT);
  }
}

export function clamp(minInclusive: number, value: number, maxInclusive: number) {
  return Math.max(minInclusive, Math.min(value, maxInclusive));
};
