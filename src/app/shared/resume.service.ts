import { Injectable } from '@angular/core';
import { PROFILE } from './resume.data';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  readonly url = PROFILE.resumeUrl;

  open(): void {
    const win = window.open(this.url, '_blank', 'noopener,noreferrer');
    if (!win) {
      navigator.clipboard?.writeText(this.url).catch(() => {});
      alert('Popup blocked. The resume link has been copied to your clipboard:\n\n' + this.url);
    }
  }
}
