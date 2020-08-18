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
registerLocaleData(localeFr);

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
  {path : 'cart-items' , component : CartItemsComponent}
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
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
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
