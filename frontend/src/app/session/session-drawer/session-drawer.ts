import { Component, computed, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { IProcess } from '../../shared/models/process.interface';

@Component({
  selector: 'app-session-drawer',
  imports: [ButtonModule, DrawerModule, DividerModule],
  templateUrl: './session-drawer.html',
  styleUrl: './session-drawer.css',
})
export class SessionDrawer {
  visible = input(false);
  visibleChange = output<boolean>();
  process = input<IProcess>();
  showDialogEmotions = output();
  showProfile = output();
  showDialogLesson = output<string>();
  leaveSession = output<Event>();

  sessions = computed(() => {
    if (this.process() && this.process()?.sessions) {
      return this.process()?.sessions;
    } else {
      return;
    }
  });

  callShowDialogEmotions() {
    this.showDialogEmotions.emit();
  }

  callShowProfile() {
    this.showProfile.emit();
  }

  callShowDialogLesson(imageSrc: string) {
    this.showDialogLesson.emit(imageSrc);
  }

  callLeaveSession(event: Event) {
    this.leaveSession.emit(event);
  }
}
