import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { NoAuthGuard } from './_guards/no-auth.guard';
import { GraphicComponent } from './graphic/graphic.component';
import { LinksComponent } from './links/links.component';
import { AccesibilityComponent } from './accesibility/accesibility.component';
import { ContactComponent } from './contact/contact.component';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { DataImporterComponent } from './data-importer/data-importer.component';
/**
 * **********************************************
 * ************** Rutas securizadas *************
 * **********************************************
 */
const secureRoutes: Routes = [
  /**
   * Usuarios
   */
  // {
  //   path: 'users',
  //   component: UserModule,
  // },
];



/**
 * *************************************************
 * ************** Rutas no securizadas *************
 * *************************************************
 */
const noSecureRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'sparql',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./sparqleditor/sparqleditor.module').then(
        (m) => m.SparqleditorModule
      ),
  },
  /* Data-Importer path */
  {
    path: 'data-importer',
    component: DataImporterComponent,
  },
  /* Graphics path */
  {
    path: 'graphics',
    component: GraphicComponent,
  },
  {
    path: 'graph',
    component: GraphPageComponent,
  },
  {
    path: 'accessibility',
    component: AccesibilityComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  /***************** Categories *******************/
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'links',
    component: LinksComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

const routes: Routes = [
  /* Login */
  {
    path: 'login',
    component: LoginComponent,
  },

  /**
   * Ruta main securizada.
   */
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: secureRoutes,
  },

  /**
   * Ruta main no securizada.
   */
  {
    path: 'main',
    component: MainComponent,
    canActivate: [NoAuthGuard],
    children: noSecureRoutes,
  },

  // otherwhise redirect to main
  {
    path: '**',
    redirectTo: 'main/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
