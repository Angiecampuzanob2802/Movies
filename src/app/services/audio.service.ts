import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement;
  private isAudioPlaying = false;

  constructor() {
    this.audio = new Audio('assets/audio/terror.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.5;

    const shouldPlay = localStorage.getItem('audioPlaying');
    if (shouldPlay === 'true') {
      this.playAudio();
    }
  }

  playAudio() {
    if (!this.isAudioPlaying) {
      this.audio.play().then(() => {
        this.isAudioPlaying = true;
        localStorage.setItem('audioPlaying', 'true');
      }).catch(err => console.error('Error al reproducir:', err));
    }
  }

  pauseAudio() {
    if (this.isAudioPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isAudioPlaying = false;
      localStorage.setItem('audioPlaying', 'false');
    }
  }

  isPlaying(): boolean {
    return this.isAudioPlaying;
  }
}
