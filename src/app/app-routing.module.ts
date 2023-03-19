import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./shared/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'forgot-pass',
    loadChildren: () => import('./shared/forgot-pass/forgot-pass.module').then( m => m.ForgotPassPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./shared/otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./shared/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./shared/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./shared/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./shared/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'change-pass',
    loadChildren: () => import('./shared/change-pass/change-pass.module').then( m => m.ChangePassPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./shared/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./shared/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./shared/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'safety',
    loadChildren: () => import('./shared/safety/safety.module').then( m => m.SafetyPageModule)
  },
  {
    path: 'docview',
    loadChildren: () => import('./shared/docview/docview.module').then( m => m.DocviewPageModule)
  },
  {
    path: 'driver',
    loadChildren: () => import('./driver/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'earnings',
    loadChildren: () => import('./driver/earnings/earnings.module').then( m => m.EarningsPageModule)
  },
  {
    path: 'breakdown',
    loadChildren: () => import('./driver/breakdown/breakdown.module').then( m => m.BreakdownPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./client/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./client/request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'request-reciever',
    loadChildren: () => import('./client/request-reciever/request-reciever.module').then( m => m.RequestRecieverPageModule)
  },
  {
    path: 'confirm-loc',
    loadChildren: () => import('./client/confirm-loc/confirm-loc.module').then( m => m.ConfirmLocPageModule)
  },
  {
    path: 'confirm-otp',
    loadChildren: () => import('./client/confirm-otp/confirm-otp.module').then( m => m.ConfirmOtpPageModule)
  },
  {
    path: 'otp-confirm',
    loadChildren: () => import('./shared/otp-confirm/otp-confirm.module').then( m => m.OtpConfirmPageModule)
  },
  {
    path: 'parcels',
    loadChildren: () => import('./client/parcels/parcels.module').then( m => m.ParcelsPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./client/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'parcel',
    loadChildren: () => import('./shared/parcel/parcel.module').then( m => m.ParcelPageModule)
  },
  {
    path: 'add-card',
    loadChildren: () => import('./client/add-card/add-card.module').then( m => m.AddCardPageModule)
  },
  {
    path: 'fare-breakdown',
    loadChildren: () => import('./client/fare-breakdown/fare-breakdown.module').then( m => m.FareBreakdownPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
