import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class EditProductPage implements OnInit {
  product: any = null;
  cargando= true;
  error= " ";
  productId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.productsService.getProductById(id).subscribe({
        next: (data) => {
          if (data && data.id_producto) {
            this.product = data;
          } else {
            this.error = 'PRODUCTO NO ENCONTRADO';
          }
          this.cargando = false;
        },
        error: () => {
          this.error = 'Error al obtener producto';
          this.cargando = false;
        }
      });
    } else {
      this.error = 'ID inválido';
      this.cargando = false;
    }
  }

  guardarCambios() {
    console.log(this.product); // Debug

    this.productsService.actualizarArticulo(this.product).subscribe({
      next: (resp) => {
        if (resp.resultado === 'OK') {
          alert('Producto actualizado correctamente');
          this.router.navigate(['/products']);
        } else {
          alert('Error al actualizar: ' + resp.mensaje);
        }
      },
      error: () => alert('Error en la actualización')
    });
  }

  cancelarEdicion() {
    // Simplemente regresa a la lista o detalle sin guardar
    this.router.navigate(['/products']);
  }
}
