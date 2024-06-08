import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Product {
  ID : string,
  name : string
}

@Injectable(
  {providedIn: 'root'}
)
export class ProductService {

  constructor(private http:HttpClient) {}

   getProducts() {
    return  this.http.get<Product[]>("http://localhost:4200/api/products");
  }

  getProduct(id:string) {
    return this.http.get(`http://localhost:4200/api/product/${id}`)
  }

  createProduct(product: Product){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Product>("http://localhost:4200/api/product", product, { headers });
  }

  deleteProduct(id:string){
    return this.http.delete(`http://localhost:3333/api/products/${id}`);
  }

}
