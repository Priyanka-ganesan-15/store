import { HttpClient } from '@angular/common/http';
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

  getProduct(id:number) {
    return this.http.get(`http://localhost:4200/api/product/${id}`)
  }
}
