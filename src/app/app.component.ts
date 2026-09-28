import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
IonItem, IonIcon, IonLabel, IonAccordionGroup, IonAccordion, NavController, MenuController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
    IonItem, IonIcon, IonLabel, IonAccordionGroup, IonAccordion],
})
export class AppComponent {
  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,

  ) {}

  async goToTodasLasPeliculas() {
  await this.menuCtrl.close(); // Cierra el menú
  this.navCtrl.navigateRoot(['/products']); // Luego navega
  }
}