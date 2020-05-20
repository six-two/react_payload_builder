import copy from 'copy-to-clipboard';
import { store } from './redux/store';
import { updatedClipbordManager } from './redux/actions';

export class ClipboardManager {
  copiedText: string | null;
  text: string | null;

  constructor() {
    this.copiedText = null;
    this.text = "";
  }

  setTextToCopy(text: string | null): void {
    if (text !== this.text) {
      this.text = text;
      store.dispatch(updatedClipbordManager());
    }
  }

  copyCurrent(): void {
    if (this.text !== null) {
      this.copiedText = this.text;
      copy(this.text);
      store.dispatch(updatedClipbordManager());
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
