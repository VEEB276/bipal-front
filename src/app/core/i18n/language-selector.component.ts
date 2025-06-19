import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from './i18n.service';
import { SUPPORTED_LANGUAGES } from './i18n.config';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-selector">
      <button 
        class="current-language" 
        (click)="toggleDropdown()"
        [attr.aria-expanded]="isDropdownOpen">
        <span class="flag">{{ getCurrentLanguageFlag() }}</span>
        <span class="name">{{ getCurrentLanguageName() }}</span>
        <span class="arrow" [class.open]="isDropdownOpen">▼</span>
      </button>
      
      <div class="dropdown" *ngIf="isDropdownOpen" (click)="$event.stopPropagation()">
        <button 
          *ngFor="let lang of supportedLanguages"
          class="language-option"
          [class.active]="lang.code === currentLanguage"
          (click)="selectLanguage(lang.code)">
          <span class="flag">{{ lang.flag }}</span>
          <span class="name">{{ lang.name }}</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .language-selector {
      position: relative;
      display: inline-block;
    }

    .current-language {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 0.25rem;
      background: white;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .current-language:hover {
      border-color: #007bff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .arrow {
      transition: transform 0.2s ease;
      font-size: 0.8rem;
    }

    .arrow.open {
      transform: rotate(180deg);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 0.25rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 1000;
      margin-top: 0.25rem;
    }

    .language-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.75rem 1rem;
      border: none;
      background: white;
      cursor: pointer;
      transition: background-color 0.2s ease;
      text-align: left;
    }

    .language-option:hover {
      background-color: #f8f9fa;
    }

    .language-option.active {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .flag {
      font-size: 1.2rem;
    }

    .name {
      font-weight: 500;
    }
  `]
})
export class LanguageSelectorComponent {
  supportedLanguages = SUPPORTED_LANGUAGES;
  currentLanguage!: string;
  isDropdownOpen = false;

  constructor(private i18nService: I18nService) {
    this.currentLanguage = this.i18nService.getCurrentLanguage();
    
    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', () => {
      this.isDropdownOpen = false;
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLanguage(langCode: string): void {
    this.i18nService.changeLanguage(langCode);
    this.currentLanguage = langCode;
    this.isDropdownOpen = false;
  }

  getCurrentLanguageFlag(): string {
    const currentLang = this.supportedLanguages.find(lang => lang.code === this.currentLanguage);
    return currentLang?.flag || '🌐';
  }

  getCurrentLanguageName(): string {
    const currentLang = this.supportedLanguages.find(lang => lang.code === this.currentLanguage);
    return currentLang?.name || 'Idioma';
  }
}
