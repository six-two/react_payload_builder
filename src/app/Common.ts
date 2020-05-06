// Do not allow arbitrary large values for repeatCount, paddToLength, etc to
// prevent you from accidentially DoS'ing yourself. Happened to me ;D
export const MAX_REPEAT_INT = 100000 - 1;
export const OUTPUT_COLORS = ["red", "green", "blue"];

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
