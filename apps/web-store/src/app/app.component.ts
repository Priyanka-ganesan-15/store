import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from "@store/data-access";
import { map } from 'rxjs';


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
  products!: string;

  constructor(private productSvc: ProductService) {
   this.productSvc.getProducts().pipe(
      map (res=> {
        console.log(res)
        this.products = JSON.stringify(res)
      })
    ).subscribe()

  }

}
