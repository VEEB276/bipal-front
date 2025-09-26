import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import moment from 'moment';

@Injectable()
export class EsCoDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    console.log('🔍 EsCoDateAdapter.parse called with:', value, typeof value);
    
    if (value == null || value === '') return null;
    
    if (value instanceof Date && !isNaN(value.getTime())) {
      console.log('✅ Already a valid Date:', value);
      return value;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      
      // DD/MM/YYYY (entrada manual del usuario)
      const ddmmyyyy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      let match = ddmmyyyy.exec(trimmed);
      if (match) {
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1;
        const year = parseInt(match[3], 10);
        const date = new Date(year, month, day);
        if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
          console.log('✅ Parsed DD/MM/YYYY:', trimmed, '→', date);
          return date;
        }
      }
      
      // YYYY-MM-DD (backend)
      const yyyymmdd = /^(\d{4})-(\d{2})-(\d{2})$/;
      match = yyyymmdd.exec(trimmed);
      if (match) {
        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1;
        const day = parseInt(match[3], 10);
        const date = new Date(year, month, day);
        if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
          console.log('✅ Parsed YYYY-MM-DD:', trimmed, '→', date);
          return date;
        }
      }
      
      console.log('❌ Could not parse string:', trimmed);
    }
    
    console.log('❌ Invalid value type or value:', value);
    return null;
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
