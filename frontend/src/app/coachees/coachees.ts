import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { FullScreen } from '../shared/services/full-screen';
import { Router } from '@angular/router';
import { CoacheesService } from '../shared/services/coachees-service';
import { ICoachee } from '../shared/models/coachee.interface';

interface Coachee {
  id: number;
  name: string;
}

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
  //     name: 'Pedro',
  //     surname: 'Perez',
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

  selectedCoachee = signal<Coachee | undefined>(undefined);
}
