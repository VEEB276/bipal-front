import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatError, MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
import { Subscription, Subject, Observable, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from "rxjs/operators";
import { MatButtonModule } from "@angular/material/button";

/**
 * AutocompleteSelectComponent
 * Reusable autocomplete for selecting one option.
 * No internal loading indicator (as solicitado).
 */
@Component({
  selector: "app-autocomplete-select",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatError,
  ],
  templateUrl: "./autocomplete-select.component.html",
  styleUrls: ["./autocomplete-select.component.scss"],
})
export class AutocompleteSelectComponent implements OnInit, OnDestroy {
  // Control externo que recibirá valor (string | object según valueMode)
  @Input() control!: FormControl;

  @Input() textCtrl = new FormControl("");

  // Lista de opciones (modo controlado externamente)
  @Input() options: any[] = [];

  // Función fetch remota opcional; si se pasa se maneja internamente y options input se ignora
  @Input() fetchFn?: (text: string) => Observable<any[]>;

  @Input() fieldValue: string = "id";
  @Input() fieldText: string = "nombre";
  @Input() placeholder: string = "";
  @Input() delay: number = 300;
  @Input() minLength: number = 1;
  @Input() autoSelectExact: boolean = true;
  @Input() clearOnBlurNoMatch: boolean = true;
  @Input() startWithFirstLoad: boolean = false;
  @Input() valueMode: "object" | "value" = "value";
  @Input() compareWith: (a: any, b: any) => boolean = (a, b) => a === b;
  @Input() noResultsText: string = "Sin resultados";
  @Input() ariaLabel: string = "";
  @Input() panelWidth?: string;
  @Input() disabled: boolean = false;

  @Input()
  set textValue(value) {
    this.textCtrl.setValue(value);
  }

  // Outputs
  @Output() search = new EventEmitter<string>();
  @Output() optionSelected = new EventEmitter<any>();
  @Output() cleared = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  private input$ = new Subject<string>();
  filtered: any[] = [];
  private subs: Subscription[] = [];
  private updatingText = false;

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl();
    }
    if (this.disabled) {
      this.textCtrl.disable({ emitEvent: false });
    }

    // Pipeline de entrada de texto
    this.subs.push(
      this.input$
        .pipe(
          debounceTime(this.delay),
          distinctUntilChanged(),
          filter((txt) => txt.length >= this.minLength || txt.length === 0),
          switchMap((txt) => this.resolveOptions(txt))
        )
        .subscribe((opts) => {
          this.filtered = opts;
          console.log(this.filtered, this.control.value);
          // si hay valor inicial y no se ha seteado texto
          if (this.control.value && !this.textCtrl.value) {
            this.syncTextFromValue();
          }
          this.search.emit(this.textCtrl.value || "");
        })
    );

    // value inicial -> setear label
    // this.syncTextFromValue();

    if (this.textCtrl.value || this.textCtrl != null) {
      this.triggerSearch(this.textCtrl.value || "");
    }

    // React a cambios externos del control (solo en modo object para mantener label)
    if (this.valueMode === "object") {
      this.subs.push(
        this.control.valueChanges.subscribe(() => this.syncTextFromValue())
      );
    }

    // Escucha cambios de texto directos
    this.subs.push(
      this.textCtrl.valueChanges.subscribe((val) => {
        console.log("Change del control:", val);
        if (this.updatingText) return;
        this.triggerSearch(val || "");
      })
    );
  }

  private resolveOptions(text: string): Observable<any[]> {
    if (this.fetchFn) {
      return this.fetchFn(text).pipe(
        tap((list) => (this.filtered = list || []))
      );
    }
    // modo controlado: filtramos local
    if (!text) {
      return of(this.options);
    }
    const lower = text.toLowerCase();
    return of(
      (this.options || []).filter((o) =>
        (this.readText(o) || "").toLowerCase().includes(lower)
      )
    );
  }

  private readValue(option: any) {
    return option?.[this.fieldValue];
  }
  readText(option: any) {
    return option?.[this.fieldText];
  }

  displayWith = (option: any) => {
    if (typeof option === "string") {
      return option;
    }
    return this.readText(option) || "";
  }

  onOptionSelected(option: any) {
    console.log("Opción seleccionada:", option);
    const value = this.valueMode === "value" ? this.readValue(option) : option;
    console.log("Valor a setear en control:", value);
    this.control.setValue(value);
    this.optionSelected.emit(option);
  }

  onBlur() {
    console.log("onBlur fired", this.textCtrl.value);
    const typed = (this.textCtrl.value || "").trim();
    if (!typed) {
      if (this.control.value) {
        this.control.reset();
        this.cleared.emit();
      }
      return;
    }

    const match = this.filtered.find(
      (o) => this.readText(o)?.toLowerCase() === typed.toLowerCase()
    );
    if (match) {
      if (this.autoSelectExact) {
        this.onOptionSelected(match);
      }
      return;
    }
    if (this.clearOnBlurNoMatch) {
      this.textCtrl.setValue("", { emitEvent: false });
      this.control.reset();
      this.cleared.emit();
    }
  }

  clear(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.textCtrl.setValue("", { emitEvent: false });
    this.control.reset();
    this.filtered = [];
    this.cleared.emit();
  }

  openedPanel() {
    this.opened.emit();
  }
  closedPanel() {
    this.closed.emit();
  }

  private triggerSearch(text: string) {
    this.input$.next(text);
  }

  private syncTextFromValue() {
    console.log("Sync text from value", this.control.value);
    if (!this.control.value) {
      this.updatingText = true;
      this.textCtrl.setValue("", { emitEvent: false });
      this.updatingText = false;
      return;
    }
    let option: any;
    if (this.valueMode === "value") {
      option = (this.filtered.length ? this.filtered : this.options).find((o) =>
        this.compareWith(this.readValue(o), this.control.value)
      );
    } else {
      option = this.control.value;
    }
    if (option) {
      this.updatingText = true;
      this.textCtrl.setValue(this.readText(option) || "", { emitEvent: false });
      this.updatingText = false;
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
