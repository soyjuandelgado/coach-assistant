import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FullScreen } from '../shared/services/full-screen/full-screen';
import { CoacheesService } from '../shared/services/coachees/coachees-service';
import { ConfirmationService } from 'primeng/api';
import { NewSessionDialog } from '../new-session-dialog/new-session-dialog';
import { IProcess } from '../shared/models/process.interface';
import { AuthService } from '../shared/auth/auth-service';
import { PopoverModule } from 'primeng/popover';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-coachees',
  imports: [
    TableModule,
    ButtonModule,
    ToolbarModule,
    PopoverModule,
    DividerModule,
    ConfirmDialogModule,
    DialogModule,
    RouterLink,
    NewSessionDialog,
  ],
  templateUrl: './coachees.html',
  styleUrl: './coachees.css',
  providers: [ConfirmationService],
})
export class Coachees {
  private fullScreenService = inject(FullScreen);
  // Exponemos la señal del servicio a la plantilla
  public isFullScreen = this.fullScreenService.isFullScreen;

  // Método para llamar al servicio
  public toggleFullScreen(): void {
    this.fullScreenService.toggle();
  }

  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private service = inject(CoacheesService);
  private authService = inject(AuthService);
  protected coachees = this.service.coachees;
  protected loading = this.service.loading;
  protected error = this.service.error;

  visibleNewSession = signal(false);
  selectedProcessId = signal<string | undefined>(undefined);

  constructor() {
    this.service.getCoachees();

    effect(() => {
      const currentError = this.error();

      if (currentError) {
        this.showErrorDialog(currentError);
      }
    });
  }

  goSummary() {
    this.router.navigate(['/summary']);
  }
  goLogin() {
    this.router.navigate(['/login']);
  }

  showRemoveDialog(event: Event, coacheeId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'El Coachee va a ser eliminado.</br>¿Estás seguro?',
      header: '¡Atención!',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      acceptVisible: true,
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
      },

      accept: () => {
        this.removeCoachee(coacheeId);
      },
    });
  }

  showErrorDialog(error: string) {
    this.confirmationService.confirm({
      message: error,
      header: 'Error',
      icon: 'pi pi-times-circle',
      rejectLabel: 'Cerrar',
      acceptVisible: false,
    });
  }

  removeCoachee(coacheeId: string) {
    this.service.removeCoachee(coacheeId);
  }

  showNewSession(processes: IProcess[]) {
    if (!processes || processes.length === 0) {
      return;
    }
    this.selectedProcessId.set(processes[0].id);
    this.visibleNewSession.set(true);
  }

  closeSession() {
    this.authService.handleLogout();
    this.goLogin();
  }
}
