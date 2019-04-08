import { Actions, ofActionDispatched } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RouteNavigate } from "./router.actions";

@Injectable()
export class RouteHandler {
  constructor(private router: Router, private actions$: Actions) {
    this.actions$
      .pipe(ofActionDispatched(RouteNavigate))
      .subscribe(({path}) => this.router.navigate(path));
  }
}
