import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

const routes: Routes = [
    { path: "", redirectTo: "/principal", pathMatch: "full" },
    { path: "sign", loadChildren: () => import("./sign/sign.module").then(m => m.SignModule ) },
    { path: "vehicles", loadChildren: () => import("./vehicles/vehicles.module").then(m => m.VehiclesModule )},
    { path: "principal", loadChildren: () => import("./principal/principal.module").then(m => m.PrincipalModule) },
    { path: "infoUsuario", loadChildren: () => import("./info-usuario/info-usuario.module").then(m => m.InfoUsuarioModule)},
    { path: "about", loadChildren: () => import("./about/about.module").then(m => m.AboutModule)},
    { path: "sanziones", loadChildren: () => import("./sanziones/sanziones.module").then(m => m.SanzionesModule)},
    { path: "anuncios", loadChildren: () => import("./Anuncios/Anuncios.module").then(m => m.AnunciosModule)}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
