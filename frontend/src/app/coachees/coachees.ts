import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { FullScreen } from '../shared/services/full-screen';
import { Router } from '@angular/router';
import { CoacheesService } from '../shared/services/coachees-service';
import { ICoachee } from '../shared/models/coachee.interface';
import { ProcessesService } from '../shared/services/processes-service';
import { IProcess } from '../shared/models/process.interface';

@Component({
  selector: 'app-coachees',
  imports: [TableModule, ButtonModule, ToolbarModule],
  templateUrl: './coachees.html',
  styleUrl: './coachees.css',
})
export class Coachees {
  private fullScreenService = inject(FullScreen);
  // Exponemos la señal del servicio a la plantilla
  public isFullScreen = this.fullScreenService.isFullScreen;

  // Método para llamar al servicio
  public toggleFullScreen(): void {
    this.fullScreenService.toggle();
  }

  service = inject(CoacheesService);
  coachees = this.service.coachees;
  private router = inject(Router);

  visible = false;
  visibleNotes = false;

  showDialogNotes() {
    this.visibleNotes = true;
  }

  goSummary() {
    this.router.navigate(['/summary']);
  }
  goSession() {
    this.router.navigate(['/session']);
  }

  // createCoachee() {
  //   const userId = '0241cf11-82ba-4804-abe8-f1d958f30183';
  //   const coachee: ICoachee = {
  //     name: 'Maria',
  //     surname: 'García',
  //     birthdate: new Date("2000-10-24"),
  //   };
  //   this.service.createCoachee(userId, coachee);
  // }

  // updateCoachee(coacheeId: string) {
  //   const coachee: ICoachee = {
  //     name: 'Modificado',
  //     surname: 'Modificado',
  //   };
  //   this.service.updateCoachee(coacheeId, coachee);
  // }

  // deleteCoachee(coacheeId: string) {
  //   this.service.deleteCoachee(coacheeId);
  // }

  // removeCoachee(coacheeId: string) {
  //   this.service.removeCoachee(coacheeId);
  // }

  // restoreCoachee() {
  //   this.service.restoreCoachee("765a5370-0f61-40c9-97c9-c3d34693de4b");
  // }

  selectedCoachee = signal<ICoachee | undefined>(undefined);

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
