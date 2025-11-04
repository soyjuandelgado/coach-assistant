import { Component, computed, input, output, Signal } from '@angular/core';
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

  // 2. Usamos computed() para derivar la ruta completa
  // Esta señal se actualizará automáticamente si imageSrc cambia.
  fullImagePath: Signal<string> = computed(() => {
    const fileName = this.imageSrc();
    if (!fileName) {
      return 'assets/images/no-image.jpg'; // O una ruta a una imagen placeholder
    }
    return `assets/images/${fileName}`;
  });

  close() {
    this.visibleChange.emit(false);
  }
}
