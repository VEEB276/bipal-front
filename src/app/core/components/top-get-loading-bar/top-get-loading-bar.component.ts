import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { AsyncPipe } from "@angular/common";
import { HttpGetLoadingService } from "../../services/http-get-loading.service";

@Component({
  selector: "app-top-get-loading-bar",
  standalone: true,
  imports: [MatProgressBarModule, AsyncPipe],
  template: `
    @if (loading$ | async) {
    <div class="get-loading-bar-wrapper">
      <mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
    </div>
    }
  `,
  styles: [
    `
      .get-loading-bar-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1100;
        pointer-events: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopGetLoadingBarComponent {
  private readonly svc = inject(HttpGetLoadingService);
  readonly loading$ = this.svc.loading$;
}
