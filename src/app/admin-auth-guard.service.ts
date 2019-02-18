import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private userService: UserService, private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.map(appUser => appUser.isAdmin);
  }
}
