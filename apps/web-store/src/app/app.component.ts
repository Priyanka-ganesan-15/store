import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from "@store/data-access";
import { map } from 'rxjs';


@Component({
  standalone: true,
  imports: [RouterModule,FormsModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
   providers: [ProductService]
  
})
export class AppComponent {
  title = 'web-store';
  products!: string;
  newProduct: Product = { ID: '', name: '' };
  deleteProductId = '';

  constructor(private productSvc: ProductService) {
    this.loadProducts();
  }

  loadProducts(){
    this.productSvc.getProducts().pipe(
      map (res=> {
        console.log(res)
        this.products = JSON.stringify(res)
      })
    ).subscribe()
  }

  createProduct() {
    this.productSvc.createProduct(this.newProduct).subscribe(
      response => {
        console.log('Product created successfully:', response);
        this.loadProducts();
        this.newProduct = { ID: '', name: '' }; 
      },
      error => {
        console.error('Error creating product:', error);
      }
    );
  }

  deleteProduct() {
    this.productSvc.deleteProduct(this.deleteProductId).subscribe(
      () => {
        console.log(`Product with ID ${this.deleteProductId} deleted successfully`);
        this.loadProducts(); // Reload products after deletion
        this.deleteProductId = ''; // Clear input after deletion
      },
      error => {
        console.error(`Error deleting product with ID ${this.deleteProductId}:`, error);
      }
    );
  }
 
}
