import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonTextarea, IonImg, } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonImg
  ],
})
export class AddProductPage {
  nombre = '';
  descripcion = '';
  precio: number | null = null;
  imagenBase64: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) { }

  capturarImagen(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  guardarProducto() {
    const producto = {
      accion: 'alta',
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      imagen1: this.imagenBase64,
    };

    this.http.post('http://localhost/Backend/crud.php', producto).subscribe({
      next: async (res: any) => {
        if (res.resultado === 'OK') {
          const alert = await this.alertController.create({
            header: '¡Éxito!',
            message: 'Película agregada correctamente.',
            buttons: ['OK'],
          });
          await alert.present();
          this.router.navigate(['/products']).then(() => {
            window.location.reload();
          });
        } else {
          this.mostrarError('Error al guardar la película: ' + res.mensaje);
        }
      },
      error: () => {
        this.mostrarError('No se pudo conectar con el servidor.');
      },
    });
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['Cerrar'],
    });
    await alert.present();
  }

  cerrar() {
    this.router.navigate(['/products']);
  }
}
