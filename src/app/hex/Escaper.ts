import ByteString from './ByteString';

// non url safe
const REGEX_PLUS = /\+/g;
const REGEX_SLASH = /\//g;
const REGEX_EQUAL = /=/g;
//url safe
const REGEX_MINUS = /-/g;
const REGEX_UNDERSCORE = /_/g;
const REGEX_DOT = /\./g;

export function uriSafeEncode(data: string): string {
  const base64 = btoa(data);
  return base64
    .replace(REGEX_PLUS, '-')
    .replace(REGEX_SLASH, '_')
    .replace(REGEX_EQUAL, '.');
}

export function uriSafeDecode(base64: string): string {
  base64 = base64
    .replace(REGEX_MINUS, '+')
    .replace(REGEX_UNDERSCORE, '/')
    .replace(REGEX_DOT, '=');
  return atob(base64);
}

export function escapeBytes(unescaped: ByteString, escapeFunction: (byte: string) => string): ByteString {
  return new ByteString(unescaped.bytes.map(escapeFunction));
}

export function urlEscapeByte(byte: string): string {
  if (byte.length >= 4) {
    // "\x??" -> "%??"
    return "%" + byte.slice(2);
  } else {
    return encodeURIComponent(byte);
  }
}

export function printfEscapeByte(byte: string): string {
  if (byte.length === 1) {
    switch (byte) {
      // escape quote signs since they could mess up passing the payload to a program (eg printf)
      case "'":
        return "\\x27";
      case "\"":
        return "\\x22";
      // escape spaces, since the html (used for displaying) does not handle consecutive whitespaces well
      case " ":
        return "\\x20";
      // escape backslashes, since they can cause a lot of problems
      case "\\":
        return "\\x5c";
    }
  }
  return byte;
}
