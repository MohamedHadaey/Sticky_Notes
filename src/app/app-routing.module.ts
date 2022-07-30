import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './Guards/auth.guard';



const routes: Routes = [
  {path:"" , redirectTo:"login",pathMatch:"full"},
  {path:"register" , component:RegisterComponent},
  {path:"login" , component:LoginComponent},
  {path:"profile",canActivate:[AuthGuard], component:ProfileComponent},
  {path:"**" , component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
