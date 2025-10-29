import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ConfirmationService } from 'primeng/api';
import { ICoachee } from '../../shared/models/coachee.interface';

@Component({
  selector: 'app-coachee-profile',
  imports: [DatePipe, ButtonModule, DialogModule, DividerModule],
  templateUrl: './coachee-profile.html',
  styleUrl: './coachee-profile.css',
  providers: [ConfirmationService],
})
export class CoacheeProfile {
  coachee = input<ICoachee>();
  visible = input(false);
  visibleChange = output<boolean>();

  close() {
    this.visibleChange.emit(false);
  }

}
