import { ShoppingCart } from "app/shared/models/shopping-cart";
import { ShoppingCartService } from "app/shared/services/shopping-cart.service";
import { AppUser } from "shared/models/app-user";
import { AuthService } from "shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    public auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
