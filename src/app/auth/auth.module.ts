import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AuthRoutingModule,
        HttpClientModule
    ],
    providers: []
})
export class AuthModule { }
