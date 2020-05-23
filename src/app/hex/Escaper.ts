import ByteString from './ByteString';
import { toHex } from '../Common';

// non url safe
const REGEX_PLUS = /\+/g;
const REGEX_SLASH = /\//g;
const REGEX_EQUAL = /=/g;
//url safe
const REGEX_MINUS = /-/g;
const REGEX_UNDERSCORE = /_/g;

export function uriSafeEncode(data: string): string {
  const base64 = btoa(data);
  return base64
    .replace(REGEX_PLUS, '-')
    .replace(REGEX_SLASH, '_')
    .replace(REGEX_EQUAL, '');
}

export function uriSafeDecode(base64: string): string {
  base64 = base64
    .replace(REGEX_MINUS, '+')
    .replace(REGEX_UNDERSCORE, '/');

  // add padding again
  let lastBlockSize = base64.length % 4;
  if (lastBlockSize !== 0) {
    base64 += ('===').slice(0, 4 - lastBlockSize);
  }
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

export function byteToValue(byte: string): number {
  if (byte.length === 4) {
    return parseInt(byte.slice(2), 16);
  } else {
    return byte.charCodeAt(0);
  }
}

export function toHexdumpChar(byte: string): string {
  let numVal = byteToValue(byte);
  if (32 <= numVal && numVal <= 126) {
    // is printable ASCII char
    return String.fromCharCode(numVal);
  } else {
    return ".";
  }
}

export function byteToHex(byte: string): string {
  return toHex(byteToValue(byte), 2);
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
