import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

// * ngBootstrap

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PermissionDirective } from './util/directives/permission.directive';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    NotFoundComponent,
    PermissionDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AuthModule
  ],
/*  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],*/
  bootstrap: [AppComponent]
})
export class AppModule { }
