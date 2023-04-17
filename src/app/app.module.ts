import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PmaHeaderComponent } from './components/pma-header/pma-header.component';
import { PmaFooterComponent } from './components/pma-footer/pma-footer.component';
import { PmaWelcomeComponent } from './components/pma-welcome/pma-welcome.component';
import { FocusDirective } from './directives/focus.directive';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './components/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { TokenInterceptor } from './classes/token.interceptor';
import { MainRouteComponent } from './components/main-route/main-route.component';
import { InlineFormModule } from './shared/modules/inline-form/inlineForm.module';
import { BoardModule } from './components/board/board.module';



@NgModule({
  declarations: [
    AppComponent,
    PmaHeaderComponent,
    PmaFooterComponent,
    PmaWelcomeComponent,
    FocusDirective,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    MainRouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InlineFormModule,
    BoardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
