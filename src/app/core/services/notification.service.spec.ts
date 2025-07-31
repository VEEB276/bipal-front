import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: spy }
      ]
    });
    
    service = TestBed.inject(NotificationService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show success message with correct configuration', () => {
    const message = 'Success message';
    
    service.showSuccess(message);
    
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  });

  it('should show error message with correct configuration', () => {
    const message = 'Error message';
    
    service.showError(message);
    
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  });

  it('should show warning message with correct configuration', () => {
    const message = 'Warning message';
    
    service.showWarning(message);
    
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-warning']
    });
  });

  it('should show message with custom duration', () => {
    const message = 'Custom duration message';
    const customDuration = 3000;
    
    service.showSuccess(message, customDuration);
    
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Cerrar', {
      duration: customDuration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  });

  it('should show message with correct panel class for each type', () => {
    service.showMessage('test', 'success');
    expect(snackBarSpy.open).toHaveBeenCalledWith('test', 'Cerrar', 
      jasmine.objectContaining({ panelClass: ['snackbar-success'] })
    );

    service.showMessage('test', 'error');
    expect(snackBarSpy.open).toHaveBeenCalledWith('test', 'Cerrar', 
      jasmine.objectContaining({ panelClass: ['snackbar-error'] })
    );

    service.showMessage('test', 'warning');
    expect(snackBarSpy.open).toHaveBeenCalledWith('test', 'Cerrar', 
      jasmine.objectContaining({ panelClass: ['snackbar-warning'] })
    );
  });
});