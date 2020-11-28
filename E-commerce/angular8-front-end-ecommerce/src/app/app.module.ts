import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import {FormsModule , ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule} from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';

import {authInterceptorProviders } from './_helpers/auth.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardService } from './_helpers/auth.gard';
import { CategorieComponent } from './components/categorie/categorie.component';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { from } from 'rxjs';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { NgbModelComponent } from './components/ngb-model/ngb-model.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CategoryDashComponent } from './components/category-dash/category-dash.component';
registerLocaleData(localeFr);
import { QuillModule } from 'ngx-quill';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import {ToastrModule} from 'ngx-toastr';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {CardModule} from 'ngx-card/ngx-card';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Error500Component } from './components/error500/error500.component';
import { PaymentStatuComponent } from './components/payment-statu/payment-statu.component';


const routes : Routes=[
  {path:'home' , component : HomeComponent},
  {path:'login' , component : LoginComponent},
  {path:'register' , component : RegisterComponent},
  {path:'profile' , component : ProfileComponent},
  {path:'user' , component : BoardUserComponent },
  {path:'admin' , component : BoardAdminComponent },
  {path:'' , component : HomeComponent},
  {path : 'notFound', component : NotFoundComponent},
  
  {path : 'category/:id' , component : HomeComponent},
  {path : 'product/:id' , component : ProductDetailsComponent},
  {path : 'cart-items' , component : CartItemsComponent},
  {path : 'category-dashbord' , component : CategoryDashComponent},
  {path : 'update-product/:id' , component : UpdateProductComponent},
  {path : 'checkout' , component : CheckoutComponent},
  {path : '**', component : NotFoundComponent}

]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardUserComponent,
    BoardAdminComponent,
    NotFoundComponent,
    CategorieComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartItemsComponent,
    NgbModelComponent,
    NavBarComponent,
    CategoryDashComponent,
    UpdateProductComponent,
    SafeHtmlPipe,
    CheckoutComponent,
    Error500Component,
    PaymentStatuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot(),
    RouterModule.forRoot(routes),
    CardModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    authInterceptorProviders
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  entryComponents : [NgbModelComponent]
})
export class AppModule { }
