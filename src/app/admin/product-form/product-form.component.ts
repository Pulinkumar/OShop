import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../../product.service";
import { CategoryService } from "./../../category.service";
import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/take";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent {
  categories$;
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private caterogyService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = caterogyService.getAll();

    this.id = route.snapshot.paramMap.get("id");
    if (this.id)
      this.productService
        .get(this.id)
        .take(1)
        .subscribe(p => (this.product = p));
  }

  delete() {
    if (!confirm("Are you sure want to delete this product?")) return;

    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(["/admin/products"]);
  }
}
