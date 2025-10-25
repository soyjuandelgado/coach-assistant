import { Component, inject, signal } from '@angular/core';
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
  coachees = this.service.coachees;
  
  selectedCoachee = signal<ICoachee | undefined>(undefined);
 
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

  removeCoachee(coacheeId: string) {
    this.service.removeCoachee(coacheeId);
  }


  // processServ = inject(ProcessesService);
  // processes = this.processServ.processes;
  // selectedProcess = signal<IProcess | undefined>(undefined);

  // createP() {
  //   const coacheeId = '466c16f6-aecb-47f4-94da-aa4c34f023d1';
  //   const process: IProcess = {
  //     type: 'Directivo',
  //     duration_minutes: 90,
  //     is_grow: false,
  //     goal: 'Conseguirlo pronto',
  //   };
  //   this.processServ.createProcess(coacheeId, process);
  // }

  // updateP(processId: string) {
  //   const process: IProcess = {
  //     type: 'Directivo Modificado',
  //     duration_minutes: 60,
  //     is_grow: true,
  //     goal: 'Conseguirlo pronto y bien',
  //   };
  //   this.processServ.updateProcess(processId, process);
  // }

  // deleteP(processId: string) {
  //   this.processServ.deleteProcess(processId);
  // }

  // removeP(processId: string) {
  //   this.processServ.removeProcess(processId);
  // }

  // restoreP() {
  //   this.processServ.restoreProcess("85ce5076-526d-4784-a4aa-f278172d1d9e");
  // }
}
