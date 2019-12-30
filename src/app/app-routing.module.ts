import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
