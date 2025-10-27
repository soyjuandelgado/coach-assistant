import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FullScreen } from '../shared/services/full-screen/full-screen';
import { CoacheesService } from '../shared/services/coachees/coachees-service';
import { ICoachee } from '../shared/models/coachee.interface';
import { ConfirmationService } from 'primeng/api';
// import { ProcessesService } from '../shared/services/processes/processes-service';
// import { IProcess } from '../shared/models/process.interface';

@Component({
  selector: 'app-coachees',
  imports: [TableModule, ButtonModule, ToolbarModule, ConfirmDialogModule, RouterLink],
  templateUrl: './coachees.html',
  styleUrl: './coachees.css',
  providers: [ConfirmationService],
})
export class Coachees implements OnInit{
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
  protected coachees = this.service.coachees;
  protected loading = this.service.loading;
  protected error = this.service.error;

  selectedCoachee = signal<ICoachee | undefined>(undefined);

  constructor() {
    effect(() => {
      const currentError = this.error();

      if (currentError) {
        this.showErrorDialog(currentError);
      }
    });
  }
  ngOnInit(): void {
    this.service.getCoachees();
  }

  goSummary() {
    this.router.navigate(['/summary']);
  }
  goSession() {
    this.router.navigate(['/session']);
  }

  showRemoveDialog(event: Event, coacheeId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'El Coachee va a ser eliminado.</br>¿Estás seguro?',
      header: '¡Atención!',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
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

  // processServ = inject(ProcessesService);
  // processes = this.processServ.processes;

  // protected coacheeId = '34201a69-a4a0-4475-b94c-fbd7fb67d011';
  // protected processId ='052e3cb7-2edc-4f58-b5f3-8e50bcd81ac2';
  // createP(coacheeId: string) {
  //   const process: IProcess = {
  //     type: 'Directivo',
  //     duration_minutes: 90,
  //     is_grow: false,
  //     goal: 'Conseguirlo pronto',
  //     start_date: new Date(),
  //   };
  //   this.processServ.createProcess(coacheeId, process);
  // }

  // updateP(processId: string) {
  //   const process: IProcess = {
  //     type: 'Directivo Modificado',
  //     duration_minutes: 60,
  //     is_grow: true,
  //     goal: 'Conseguirlo pronto y bien',
  //     frequency_days: 7,
  //     session_price: 50.05,
  //     payment_method: 'Transferencia',
  //     payment_term_days: 30,
  //     contract_signed: true,
  //     lodp_signed: true,
  //     rgpd_signed: true,
  //   };
  //   this.processServ.updateProcess(processId, process);
  // }

  // deleteP(processId: string) {
  //   this.processServ.deleteProcess(processId);
  // }

  // removeP(processId: string) {
  //   this.processServ.removeProcess(processId);
  // }

  // restoreP(processId: string) {
  //   this.processServ.restoreProcess(processId);
  // }
}
