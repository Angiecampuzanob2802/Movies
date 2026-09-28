import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonProgressBar,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInput
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular/standalone';

import { AuthService } from 'src/app/services/auth.service';
import { AudioService } from './../../services/audio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonProgressBar,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonInput
  ]
})
export class LoginPage implements OnInit {

  // -------------------------------
  // PROPIEDADES
  // -------------------------------
  isLoading: boolean = true;
  username: string = '';
  password: string = '';

  // -------------------------------
  // CONSTRUCTOR
  // -------------------------------
  constructor(
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController,
    private audioService: AudioService,
    private alertCtrl: AlertController
  ) {}

  // -------------------------------
  // CICLO DE VIDA
  // -------------------------------
  async ngOnInit() {
    await this.simulateLoading();
    this.isLoading = false;
    this.forceVideoPlay();
  }

  // -------------------------------
  // MÉTODOS
  // -------------------------------
  async onLogin() {
    if (!this.username || !this.password) {
      const alert = await this.alertCtrl.create({
        header: 'Campos vacíos',
        message: 'Por favor ingresa usuario y contraseña.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      async (response: any) => {
        console.log('Respuesta del servidor:', response);

        if (response.success) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          console.log('✅ Login exitoso, redirigiendo a /home');

          // ✅ Reproducir audio tras login exitoso
          this.audioService.playAudio();

          // Navegar a /home
          this.navCtrl.navigateForward('/home', {
            animationDirection: 'forward'
          });
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Credenciales incorrectas.',
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      async (error) => {
        console.error('❌ Error en la solicitud:', error);
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudo conectar con el servidor.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );

    // Limpiar los campos tras el intento
    this.username = '';
    this.password = '';
  }

  private async simulateLoading() {
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  private forceVideoPlay() {
    const videoElement = document.querySelector('video') as HTMLVideoElement;

    if (videoElement) {
      videoElement.play().catch(() => {
        const interactionHandler = () => {
          videoElement.play()
            .then(() => document.removeEventListener('click', interactionHandler))
            .catch(err => console.error('❌ Error al reproducir:', err));
        };
        document.addEventListener('click', interactionHandler, { once: true });
      });
    }
  }
}
