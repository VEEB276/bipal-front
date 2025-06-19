import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  constructor(private translateService: TranslateService) {
    this.initializeTranslation();
  }

  /**
   * Inicializa la configuración de traducción
   */
  private initializeTranslation(): void {
    // Establecer idioma por defecto
    this.translateService.setDefaultLang('es');
    
    // Usar el idioma por defecto
    this.translateService.use('es');
  }

  /**
   * Obtiene una traducción de forma síncrona
   * @param key Clave de la traducción
   * @param params Parámetros para interpolación
   * @returns Texto traducido
   */
  translate(key: string, params?: any): string {
    return this.translateService.instant(key, params);
  }

  /**
   * Obtiene una traducción de forma asíncrona
   * @param key Clave de la traducción
   * @param params Parámetros para interpolación
   * @returns Observable con el texto traducido
   */
  translateAsync(key: string, params?: any): Observable<string> {
    return this.translateService.get(key, params);
  }

  /**
   * Obtiene múltiples traducciones de forma asíncrona
   * @param keys Array de claves de traducción
   * @param params Parámetros para interpolación
   * @returns Observable con objeto de traducciones
   */
  translateMultiple(keys: string[], params?: any): Observable<any> {
    return this.translateService.get(keys, params);
  }

  /**
   * Cambia el idioma actual
   * @param lang Código del idioma
   */
  changeLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  /**
   * Obtiene el idioma actual
   * @returns Código del idioma actual
   */
  getCurrentLanguage(): string {
    return this.translateService.currentLang || this.translateService.getDefaultLang();
  }

  /**
   * Obtiene los idiomas disponibles
   * @returns Array de códigos de idiomas
   */
  getAvailableLanguages(): string[] {
    return this.translateService.getLangs();
  }

  /**
   * Verifica si existe una traducción para una clave
   * @param key Clave de la traducción
   * @returns true si existe la traducción
   */
  hasTranslation(key: string): boolean {
    return this.translateService.instant(key) !== key;
  }

  /**
   * Recarga las traducciones
   * @param lang Idioma a recargar (opcional)
   */
  reloadTranslations(lang?: string): void {
    const currentLang = lang || this.getCurrentLanguage();
    this.translateService.reloadLang(currentLang);
  }
}
