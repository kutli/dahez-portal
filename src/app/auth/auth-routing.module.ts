import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }