import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatOptionModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { HomePageComponent } from './page/home-page/home-page.component';
import { LabelPageComponent } from './page/label-page/label-page.component';
import { PriorityPageComponent } from './page/priority-page/priority-page.component';
import { TodoListComponent } from './component/todo/todo-list/todo-list.component';
import { OrderByPriorityPipe } from './pipe/order-by-priority.pipe';
import { AuthPageComponent } from './page/auth-page/auth-page.component';
import { LoginComponent } from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RequestInterceptor} from './class/request-interceptor';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';
import {ResponseInterceptor} from './class/response-interceptor';
import { ProfileComponent } from './component/profile/profile.component';
import { TodoPageComponent } from './page/todo-page/todo-page.component';
import {TodoShowComponent} from './component/todo/todo-show/todo-show.component';
import { TodoCreateComponent } from './component/todo/todo-create/todo-create.component';
import { PriorityListComponent } from './component/priority/priority-list/priority-list.component';
import { PriorityCreateComponent } from './component/priority/priority-create/priority-create.component';
import { PriorityEditComponent } from './component/priority/priority-edit/priority-edit.component';
import { LabelListComponent } from './component/label/label-list/label-list.component';
import { LabelCreateComponent } from './component/label/label-create/label-create.component';
import { LabelEditComponent } from './component/label/label-edit/label-edit.component';
import { TestPageComponent } from './page/test-page/test-page.component';
import { AutoCompleteComponent } from './component/auto-complete/auto-complete.component';
import { OrderByPipe } from './pipe/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LabelPageComponent,
    PriorityPageComponent,
    TodoListComponent,
    OrderByPriorityPipe,
    AuthPageComponent,
    LoginComponent,
    ProfilePageComponent,
    ProfileComponent,
    TodoPageComponent,
    TodoShowComponent,
    TodoCreateComponent,
    PriorityListComponent,
    PriorityCreateComponent,
    PriorityEditComponent,
    LabelListComponent,
    LabelCreateComponent,
    LabelEditComponent,
    TestPageComponent,
    AutoCompleteComponent,
    OrderByPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
  ],
  entryComponents: [
    PriorityCreateComponent
  ],
  providers: [
    OrderByPipe,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
