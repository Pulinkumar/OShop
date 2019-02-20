import { ShoppingCart } from "shared/models/shopping-cart";
import { ActivatedRoute } from "@angular/router";
import { Product } from "shared/models/product";
import { ProductService } from "shared/services/product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import "rxjs/add/operator/switchMap";
import { ShoppingCartService } from "app/shared/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService
      .getAll()
      .switchMap(product => {
        this.products = product;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get("category");
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter(p => p.category === this.category)
      : this.products;
  }
}
