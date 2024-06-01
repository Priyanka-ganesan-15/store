import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable(
  {providedIn: 'root'}
)
export class ProductService {

  constructor(private http:HttpClient) {}

  getProducts() {
    //return this.http.get("https://my-store/products");

    return [{id:1, name: 'book'}];

  }

  getProduct(id:number) {
    return {id:1, name:'book'};
  }
}
