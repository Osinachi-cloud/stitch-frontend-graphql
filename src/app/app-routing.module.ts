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

const routes: Routes = [
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

  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
