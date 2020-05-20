import copy from 'copy-to-clipboard';

export class ClipboardManager {
  copiedText: string | null;
  text: string | null;

  constructor() {
    this.copiedText = null;
    this.text = "";
  }

  setTextToCopy(text: string | null): void {
    this.text = text;
  }

  copyCurrent(): void {
    if (this.text !== null) {
      this.copiedText = this.text;
      copy(this.text);
    }
  }

  canCopy(): boolean {
    return this.text !== null;
  }

  isAlreadyCopied(): boolean {
    return this.text === this.copiedText;
  }
}

export const instance: ClipboardManager = new ClipboardManager();

export default instance;
