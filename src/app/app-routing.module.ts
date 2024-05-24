import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SinginComponent } from './components/auth/singin/singin.component';
import { PasswordresetComponent } from './components/auth/passwordreset/passwordreset.component';
import { PasswordRequestFormComponent } from './components/auth/password-request-form/password-request-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { OrdersComponent } from './components/dashboard/orders/orders.component';
import { DocumentationComponent } from './components/dashboard/documentation/documentation.component';
import { ContactVerificationComponent } from './components/auth/contact-verification/contact-verification.component';
import { LandingPageComponent } from './components/dashboard/landing-page/landing-page.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { ProductListComponent } from './components/dashboard/product-list/product-list.component';
import { FooterComponent } from './shared/footer/footer.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent }, 
  { path: 'navbar', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'email-verification', component: ContactVerificationComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SinginComponent },
  { path: 'password-reset', component: PasswordresetComponent },
  { path: 'submit-password', component: PasswordRequestFormComponent},
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: OverviewComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'api-documentation', component: DocumentationComponent}
  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
