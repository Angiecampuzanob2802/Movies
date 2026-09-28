import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost/Backend/crud.php'; // Cambia si usas otra ruta
  private currentPage = 0; // ✅ Declaramos currentPage

  constructor(private http: HttpClient) { }

  agregarProducto(producto: any): Observable<any> {
    const payload = {
      accion: 'alta',
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen1: producto.imagen1
    };
    return this.http.post<any>(this.apiUrl, payload);
  }

  recuperarTodos(pagina: number = 0): Observable<any> {
    const payload = {
      accion: 'listarProductos',
      pagina: pagina,
      limite: 10
    };
    return this.http.post<any>(this.apiUrl, payload);
  }

  loadMore(): Observable<any> {
    this.currentPage++;
    return this.recuperarTodos(this.currentPage);
  }
 getProductById(id: number): Observable<any> {
  const payload = {
    accion: 'obtenerProducto',
    id: id
  };
  return this.http.post<any>(this.apiUrl, payload);
}

  eliminarProducto(id: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      accion: 'eliminarProducto',
      id: id
    });
  }

  crearProducto(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      accion: 'crearProducto',
      producto: product
    });
  }
  actualizarArticulo(producto: any) {
    const body = {
      accion: 'actualizarProducto',
      codigo: producto.id_producto,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      ubicacion: producto.ubicacion
    };

    return this.http.post<any>('http://localhost/Backend/crud.php', body);
  }

}
