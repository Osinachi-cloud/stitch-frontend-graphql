import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup'
import { SignupComponent } from './components/auth/signup/signup.component';
import { SinginComponent } from './components/auth/singin/singin.component';
import { PasswordresetComponent } from './components/auth/passwordreset/passwordreset.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule,} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PasswordRequestFormComponent } from './components/auth/password-request-form/password-request-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/dashboard/sidenav/sidenav.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { BodyComponent } from './components/dashboard/body/body.component';
import { OrdersComponent } from './components/dashboard/orders/orders.component';
import { SublevelMenuComponent } from './components/dashboard/sidenav/sublevel-menu.component';
import { DocumentationComponent } from './components/dashboard/documentation/documentation.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DefaultArcObject } from 'd3-shape';
import { ScaleLinear, ScalePoint, ScaleTime, ScaleBand } from 'd3-scale';
import { CurveFactory } from 'd3-shape';
import { BaseType } from 'd3-selection';
import { ApolloModule } from 'apollo-angular';
import { MenuModule } from 'primeng/menu';
// import { HttpLinkModule } from 'apollo-angular-link-http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastrModule } from 'ngx-toastr';
import { ContactVerificationComponent } from './components/auth/contact-verification/contact-verification.component';
import { LandingPageComponent } from './components/dashboard/landing-page/landing-page.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { ProductListComponent } from './components/dashboard/product-list/product-list.component';
import { ButtonComponent } from './shared/button/button.component';
import { FooterComponent } from './shared/footer/footer.component';
// import { InventoryComponent } from './components/dashboard/inventory/inventory.component';
import { AddProductItemComponent } from './components/dashboard/add-product-item/add-product-item.component';
import { VendorSignInComponent } from './components/auth/vendor-sign-in/vendor-sign-in.component';
import { CartComponent } from './components/dashboard/cart/cart.component';
import { ProductlikesComponent } from './components/dashboard/productlikes/productlikes.component';
import { AnalyticsComponent } from './components/dashboard/analytics/analytics.component';
import { SingleproductComponent } from './components/dashboard/singleproduct/singleproduct.component';
import { InventoryComponent } from './components/dashboard/inventory/inventory.component';
import { InitiateOrderComponent } from './components/dashboard/initiate-order/initiate-order.component';
import { TableLoaderComponent } from './components/loaders/table-loader/table-loader.component';
import { SpinLoaderComponent } from './components/loaders/spin-loader/spin-loader.component';
import { Col3LoaderComponent } from './components/loaders/col-3-loader/col-3-loader.component';
import { CartLoaderComponent } from './components/loaders/cart-loader/cart-loader.component';
import { ProductLikeLoaderComponent } from './components/loaders/product-like-loader/product-like-loader.component';
import { ProductDisplayLoaderComponent } from './components/loaders/product-display-loader/product-display-loader.component';
import { VendorsOrdersComponent } from './components/dashboard/vendors-orders/vendors-orders.component';
import { BodyMeasurementComponent } from './components/dashboard/body-measurement/body-measurement.component';
import { CheckoutComponent } from './components/dashboard/checkout/checkout.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SinginComponent,
    PasswordresetComponent,
    PasswordRequestFormComponent,
    DashboardComponent,
    SidenavComponent,
    OverviewComponent,
    BodyComponent,
    OrdersComponent,
    SublevelMenuComponent,
    DocumentationComponent,
    ContactVerificationComponent,
    LandingPageComponent,
    NavbarComponent,
    ProductListComponent,
    ButtonComponent,
    FooterComponent,
    InventoryComponent,
    AddProductItemComponent,
    VendorSignInComponent,
    CartComponent,
    ProductlikesComponent,
    AnalyticsComponent,
    SingleproductComponent,
    InitiateOrderComponent,
    TableLoaderComponent,
    SpinLoaderComponent,
    Col3LoaderComponent,
    CartLoaderComponent,
    ProductLikeLoaderComponent,
    ProductDisplayLoaderComponent,
    VendorsOrdersComponent,
    BodyMeasurementComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxOtpInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxChartsModule,
    ApolloModule,
    MenuModule,
    ToastModule,
    ToastrModule,
    HttpClientModule,
    // NgbModule
    // HttpLinkModule
    

  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }

// imports: [BrowserModule, NgbModule],
// declarations: [NgbdDropdownBasic],
// exports: [NgbdDropdownBasic],
// bootstrap: [NgbdDropdownBasic]
