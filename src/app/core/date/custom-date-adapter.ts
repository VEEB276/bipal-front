import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class EsCoDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if (typeof value === 'string') {
      const parts = value.trim().split('/');
      if (parts.length === 3) {
        const day = Number(parts[0]);
        const month = Number(parts[1]) - 1;
        const year = Number(parts[2]);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          const date = new Date(year, month, day);
            if (date && date.getMonth() === month) {
              return date;
            }
        }
      }
    }
    return value instanceof Date ? value : null;
  }

  override format(date: Date, displayFormat: Object): string {
    if (!date) return '';
    const day = this._to2digit(date.getDate());
    const month = this._to2digit(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}
