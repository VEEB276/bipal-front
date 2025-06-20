import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InfoPersonalComponent } from "../components/info-personal/info-personal.component";

@Component({
  selector: 'app-gestionar-hv',
  imports: [InfoPersonalComponent],
  templateUrl: './gestionar-hv.component.html',
  styleUrl: './gestionar-hv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionarHvComponent { }
