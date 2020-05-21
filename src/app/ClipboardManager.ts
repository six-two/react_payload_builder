import copy from 'copy-to-clipboard';

export class ClipboardManager {
  text: string | null;

  constructor() {
    this.text = "";
  }

  setTextToCopy(text: string | null): void {
    if (text !== this.text) {
      this.text = text;
    }
  }

  copyCurrent(): void {
    if (this.text !== null) {
      copy(this.text);
    }
  }

  canCopy(): boolean {
    return this.text !== null;
  }
}

export const instance: ClipboardManager = new ClipboardManager();

export default instance;
