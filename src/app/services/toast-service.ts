import { inject, Service } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Service()
export class ToastService {
    private toast = inject(MatSnackBar)

    showSuccessToast(message: string) {
        this.toast.open(message, '', {duration: 3000, panelClass: 'success-toast'})
    }

    showErrorToast(message: string) {
        this.toast.open(message, '', {duration: 3000, panelClass: 'error-toast'})
    }
}
