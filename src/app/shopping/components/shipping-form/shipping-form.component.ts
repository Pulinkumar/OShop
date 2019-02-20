import { ShoppingCart } from "app/shared/models/shopping-cart";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Order } from "app/shared/models/order";
import { Subscription } from "rxjs/Subscription";
import { Router } from "@angular/router";
import { AuthService } from "app/shared/services/auth.service";
import { OrderService } from "app/shared/services/order.service";

@Component({
  selector: "shipping-form",
  templateUrl: "./shipping-form.component.html",
  styleUrls: ["./shipping-form.component.css"]
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {};
  userSubscription: Subscription;
  userId: string;
  @Input("cart") cart: ShoppingCart;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }
}
