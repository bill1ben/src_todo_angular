import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {HomePageComponent} from './page/home-page/home-page.component';
import {LabelPageComponent} from './page/label-page/label-page.component';
import {PriorityPageComponent} from './page/priority-page/priority-page.component';
import {AuthPageComponent} from './page/auth-page/auth-page.component';
import {ProfilePageComponent} from './page/profile-page/profile-page.component';
import {TodoPageComponent} from './page/todo-page/todo-page.component';
import {CanAccessToGuard} from './guard/can-access-to.guard';
import {IsAdminGuard} from './guard/is-admin.guard';
import {TestPageComponent} from './page/test-page/test-page.component';


const routes: Routes = [
  {
    path: 'priority',
    component: PriorityPageComponent,
    canActivate: [ CanAccessToGuard , IsAdminGuard ],
    data : { title: 'Priority'}
  },
  {
    path: 'priority/:verb',
    component: PriorityPageComponent,
    canActivate: [ CanAccessToGuard , IsAdminGuard ],
    data : { title: 'Priority'}
  },
  {
    path: 'priority/:verb/:id',
    component: PriorityPageComponent,
    canActivate: [ CanAccessToGuard , IsAdminGuard ],
    data : { title: 'Priority'}
  },
  {
    path: 'label',
    component: LabelPageComponent,
    canActivate: [ CanAccessToGuard ],
    data : { title: 'Label'}
  },
  {
    path: 'label/:verb',
    component: LabelPageComponent,
    canActivate: [ CanAccessToGuard ],
    data : { title: 'Label'}
  },
  {
    path: 'label/:verb/:id',
    component: LabelPageComponent,
    canActivate: [ CanAccessToGuard ],
    data : { title: 'Label'}
  },
  {
    path: 'auth',
    component: AuthPageComponent,
    data : { title: 'Authentification'}
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [ CanAccessToGuard ],
    data : { title: 'Mon Profile'}
  },
  {
    path: 'home',
    component: HomePageComponent,
    data : { title: 'Accueil'}
  },
  {
    path: 'test',
    component: TestPageComponent,
    data : { title: 'Test AutoComplete'}
  },
  {
    path: 'todo',
    component: TodoPageComponent,
    data : { title: 'Todo'}
  },
  {
    path: 'todo/:verb',
    component: TodoPageComponent,
    data : { title: 'Todo'}
  },
  {
    path: 'todo/:verb/:id',
    component: TodoPageComponent,
    data : { title: 'Todo'}
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
