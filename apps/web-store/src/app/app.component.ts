
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ProductService } from "@store/data-access";


@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
   providers: [ProductService]
  
})
export class AppComponent {
  title = 'web-store';
  products;

  constructor(private productSvc: ProductService) {
    this.products = this.productSvc.getProducts()

  }

}
