import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonSearchbar,
  IonList,
  IonItem,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
  IonButtons,
  NavController
} from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import { AudioService } from 'src/app/services/audio.service';
import { chevronUp, chevronDown } from 'ionicons/icons';

register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonSearchbar,
    IonList,
    IonItem,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonMenuButton,
    IonButtons,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperRef: any;

  username: string = 'cinéfilo123';


  submenuPeliculas: boolean = false;


  peliculasDestacadas = [
    { titulo: 'Inception', descripcion: 'Una mente dentro de otra.', imagen: 'assets/img/inception.png' },
    { titulo: 'Interstellar', descripcion: 'El tiempo y el amor en el espacio.', imagen: 'assets/img/interstellar.jpg' },
    { titulo: 'Matrix', descripcion: 'La simulación definitiva.', imagen: 'assets/img/matrix.jpg' }
  ];

  slideOpts = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: { clickable: true },
    allowTouchMove: false,
  };

  constructor(private NavController: NavController,private audioService: AudioService) {
    addIcons({
      'chevron-up': chevronUp,
      'chevron-down': chevronDown,
    });
  }

  ngAfterViewInit() {
    if (this.swiperRef?.swiper) {
      this.swiperRef.swiper.update();
    }
    this.audioService.playAudio();
  }
  logout() {
    this.audioService.pauseAudio(); // 🔇 Detiene el audio
    localStorage.removeItem('currentUser');
    this.NavController.navigateRoot('/login');
    console.log('Sesión cerrada');
  }

}
