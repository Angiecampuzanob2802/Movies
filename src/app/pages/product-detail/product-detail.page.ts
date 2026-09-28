import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
  IonButtons, IonThumbnail, IonLabel, IonItem, IonList, IonIcon,
  IonText, IonGrid, IonRow, IonCol, IonButton ,IonFab, IonFabButton, IonSpinner } from '@ionic/angular/standalone';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [IonSpinner,
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
    IonButtons, IonThumbnail, IonLabel, IonItem, IonList, IonIcon,
    IonText, IonGrid, IonRow, IonCol, IonButton ,IonFab, IonFabButton
  ]
})
export class ProductDetailPage implements OnInit {

  product: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(parseInt(id));
    }
  }

  loadProduct(id: number) {
    this.isLoading = true;
    this.productsService.getProductById(id).subscribe({
      next: (response: any) => {
        this.product = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar el producto';
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

}