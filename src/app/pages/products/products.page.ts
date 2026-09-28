import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
  IonButtons, IonRefresher, IonRefresherContent, IonIcon,
  IonSpinner, IonText, IonItem, IonLabel, IonList, IonThumbnail,
  IonInfiniteScroll, IonInfiniteScrollContent, IonBackButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/angular/standalone';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    IonIcon, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonButton, IonButtons, IonRefresher,
    IonRefresherContent, IonSpinner, IonText, IonItem, IonLabel,
    IonList, IonThumbnail, IonInfiniteScroll, IonInfiniteScrollContent,
    IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    RouterOutlet
  ]
})
export class ProductsPage implements OnInit {
  articulos: any[] = [];
  isLoading = false;
  isLoadingMore = false;
  showAddForm = false;

  errorMessage = '';
  hasMoreData = true;

  editId: number | null = null;
  editArticulo: any = {};

  constructor(private productoService: ProductsService, private navCtrl: NavController) { }
  irAgregarProducto() {
    this.navCtrl.navigateForward('/add-product');
  }


  ngOnInit() {
    this.cargarArticulos();
  }
  cargarArticulos() {
    this.isLoading = true;
    this.errorMessage = '';
    this.articulos = [];
    this.hasMoreData = true;

    this.productoService.recuperarTodos().subscribe({
      next: (result: any) => {
        this.articulos = Array.isArray(result) ? result : [];
        this.isLoading = false;
        this.hasMoreData = result.length > 0;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los productos';
        this.isLoading = false;
        console.error("Error al recuperar los datos", error);
      }
    });
  }

  cargarMasArticulos(event: any) {
    if (!this.hasMoreData) {
      event.target.disabled = true;
      return;
    }

    this.isLoadingMore = true;

    this.productoService.loadMore().subscribe({
      next: (result: any) => {
        const nuevosArticulos = Array.isArray(result) ? result : [];

        this.articulos = [...this.articulos, ...nuevosArticulos];

        this.hasMoreData = nuevosArticulos.length > 0;
        this.isLoadingMore = false;
        event.target.complete();

        if (!this.hasMoreData) {
          event.target.disabled = true;
        }
      },
      error: (error) => {
        console.error("Error al cargar más artículos", error);
        this.isLoadingMore = false;
        event.target.complete();
      }
    });
  }

  refrescarArticulos(event: any) {
    this.cargarArticulos();
    event.target.complete();
  }

  verDetalleProducto(id: number) {
    this.navCtrl.navigateForward(`/product-detail/${id}`, {
      animationDirection: 'forward'
    });
  }
  editarProducto(id: number) {
    this.navCtrl.navigateForward(`/edit-product/${id}`);
  }

  cancelarEdicion() {
    this.editId = null;
    this.editArticulo = {};
  }

  guardarEdicion() {
    this.productoService.actualizarArticulo(this.editArticulo).subscribe({
      next: () => {
        const index = this.articulos.findIndex(a => a.id_producto === this.editArticulo.id_producto);
        if (index !== -1) {
          this.articulos[index] = { ...this.editArticulo };
        }
        this.cancelarEdicion();
      },
      error: (err: any) => {
        console.error('Error actualizando producto', err);
      }
    });
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: (res) => {
          console.log('Producto eliminado', res);
          this.cargarArticulos();
        },
        error: (err) => {
          console.error('Error al eliminar el producto', err);
        }
      });
    }
  }
}
