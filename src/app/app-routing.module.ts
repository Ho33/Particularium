import { ProfileTeacherPageModule } from './pages/profileTeacher/profileTeacher.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
	{
	  path: 'login',
	  loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
	},
	{
	  path: 'sign-up',
	  loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
	},
	{
	  path: 'tipo-usuario',
	  loadChildren: () => import('./pages/tipo-usuario/tipo-usuario.module').then( m => m.TipoUsuarioPageModule)
	},
  {
    path: 'logged-in',
    loadChildren: () => import('./pages/logged-in/logged-in.module').then( m => m.LoggedInPageModule)
  },
  {
    path: 'profileStudent',
    loadChildren: () => import('./pages/profileStudent/profileStudent.module').then( m => m.ProfileStudentPageModule)
  },
  {
    path: 'profileTeacher',
    loadChildren: () => import('./pages/profileTeacher/profileTeacher.module').then( m => m.ProfileTeacherPageModule)
  },
  
  
  ];
  
  @NgModule({
	imports: [
	  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
  })
  export class AppRoutingModule { }
  