import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDivider, MatDividerModule } from "@angular/material/divider";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDividerModule, RouterModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent { }
