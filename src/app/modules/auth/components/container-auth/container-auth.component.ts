import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-container-auth',
  imports: [MatCard, MatButtonModule,],
  templateUrl: './container-auth.component.html',
  styleUrl: './container-auth.component.scss'
})
export class ContainerAuthComponent implements OnInit {
  //injectamos las dependencias
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  emailUser =  signal<string>("");
  documentoUser = signal<number>(null);
  comprobarCodigoP:boolean=true;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.emailUser.set(params['email'] || "");
      this.documentoUser.set(parseInt(params['documento']) || null);
    });
    console.log("Email recibido en crear-usuario:", this.emailUser(), this.documentoUser());
  }

  volver() {
    this.router.navigate(['/auth']);
  }

  verificarCodigoValido( mostrarComprobarCodigo:boolean) {
    // console.log(evt);
    this.comprobarCodigoP=mostrarComprobarCodigo;
  }

}
