import { Component, input, output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-lesson-dialog',
  imports: [ButtonModule, DialogModule, ImageModule],
  templateUrl: './lesson-dialog.html',
  styleUrl: './lesson-dialog.css',
  providers: [ConfirmationService],
})
export class LessonDialog {
  visible = input(false);
  visibleChange = output<boolean>();
  imageSrc = input('');

close() {
    this.visibleChange.emit(false);
  }
}
