import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { DataAccessProductsModule } from '@ngxs-app/data-access-products';
import { ProductItemComponent } from './product-item/product-item.component';
import { UiProductsModule } from '@ngxs-app/ui-products';

@NgModule({
  imports: [
    CommonModule,
    UiProductsModule,
    DataAccessProductsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ProductsComponent },
      {
        path: 'new',
        component: ProductItemComponent
      },
      {
        path: ':pizzaId',
        component: ProductItemComponent
      },
    ])
  ],
  declarations: [ProductsComponent, ProductItemComponent]
})
export class FeatureProductsModule {}
