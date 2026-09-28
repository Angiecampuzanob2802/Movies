import { Routes } from '@angular/router';
import { ProductsPage } from './pages/products/products.page';
import { AddProductPage } from './pages/add-product/add-product.page'; // importa el standalone

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
  path: '',
  redirectTo: 'products',
  pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.page').then( m => m.ProductsPage)
  },
  {
    path: 'product-detail/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.page').then( m => m.ProductDetailPage)
  },
  {
    path: 'add-product',
    loadComponent: () => import('./pages/add-product/add-product.page').then( m => m.AddProductPage)
  },
  {
    path: 'edit-product/:id',
    loadComponent: () => import('./pages/edit-product/edit-product.page').then( m => m.EditProductPage)
  },
];
