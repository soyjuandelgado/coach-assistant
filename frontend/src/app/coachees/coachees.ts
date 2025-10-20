import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { FullScreen } from '../shared/services/full-screen';
import { Router } from '@angular/router';

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

  coachees = signal<Coachee[]>([
    { id: 1, name: 'Pedro Pérez' },
    { id: 2, name: 'José García' },
    { id: 3, name: 'Juan Sánchez' },
    { id: 4, name: 'María Gutiérrez' },
    { id: 5, name: 'Ana Domínguez' },
  ]);

  selectedCoachee = signal<Coachee | undefined>(undefined);
}
