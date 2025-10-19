import { Component, inject } from '@angular/core';
import { FullScreen } from '../shared/services/full-screen';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-summary',
  imports: [ToolbarModule, ButtonModule, PanelModule, DialogModule],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary {
  private fullScreenService = inject(FullScreen);
  // Exponemos la señal del servicio a la plantilla
  public isFullScreen = this.fullScreenService.isFullScreen;

  // Método para llamar al servicio
  public toggleFullScreen(): void {
    this.fullScreenService.toggle();
  }

  private router = inject(Router);

  goSession() {
    this.router.navigate(['/session']);
  }

  visibleProfile = false;

  showDialogProfile() {
    this.visibleProfile = true;
  }
}
