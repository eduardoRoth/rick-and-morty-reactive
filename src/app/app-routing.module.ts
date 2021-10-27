import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'personajes',
  },
  {
    path: 'personajes',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/personajes/personajes.module').then(
            (m) => m.PersonajesPageModule
          ),
      },
      {
        path: ':id',
        loadChildren: () =>
          import('./pages/personaje/personaje.module').then(
            (m) => m.PersonajePageModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
