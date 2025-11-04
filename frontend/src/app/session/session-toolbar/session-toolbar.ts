import { Component, inject, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { IProcess } from '../../shared/models/process.interface';
import { ICoachee } from '../../shared/models/coachee.interface';
import { ISession } from '../../shared/models/session.interface';
import { FullScreen } from '../../shared/services/full-screen/full-screen';

@Component({
  selector: 'app-session-toolbar',
  imports: [ButtonModule, ToolbarModule],
  templateUrl: './session-toolbar.html',
  styleUrl: './session-toolbar.css',
})
export class SessionToolbar {
  private fullScreenService = inject(FullScreen);
  public isFullScreen = this.fullScreenService.isFullScreen;
  process = input<IProcess>();
  coachee = input<ICoachee>();
  session = input<ISession>();

  showDialogNotes = output();
  showDrawer = output();
  leaveSession = output<Event>();

  public toggleFullScreen(): void {
    this.fullScreenService.toggle();
  }

  callShowDrawer() {
    this.showDrawer.emit();
  }
  callShowDialogNotes() {
    this.showDialogNotes.emit();
  }
  callLeaveSession(event: Event) {
    this.leaveSession.emit(event);
  }
}
