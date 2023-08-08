import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './otp/otp.component';
import { NumberComponent } from './number/number.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'number',
    pathMatch: 'full',
  },

  {
    path:'number',
    component:NumberComponent
  },

  {
    path:'otp',
    component:OtpComponent
  },

  {
    path:'details',
    component: DetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
