import { Component, input, output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

interface Emotion {
  name: string;
  energy: number;
  pleasant: number;
}

@Component({
  selector: 'app-emotions-dialog',
  imports: [ButtonModule, DialogModule, TableModule],
  templateUrl: './emotions-dialog.html',
  styleUrl: './emotions-dialog.css',
  providers: [ConfirmationService],
})
export class EmotionsDialog {
  visible = input(false);
  visibleChange = output<boolean>();
  emotionClicked = output<string>();
  emotionSelected: Emotion | null = null;

  close() {
    this.emotionSelected = null;
    this.visibleChange.emit(false);
  }

  sendEmotion() {
    if (this.emotionSelected) {
      this.emotionClicked.emit(this.emotionSelected.name);
      this.close();
    }
  }

  selectEmotion(emotion: Emotion) {
    if (!emotion) return;
    this.emotionSelected = emotion;
  }

  emotions: Emotion[] = [
    { name: 'Enfurecido', energy: 10, pleasant: 1 },
    { name: 'Aterrado', energy: 10, pleasant: 2 },
    { name: 'Estresado', energy: 10, pleasant: 3 },
    { name: 'Inquieto', energy: 10, pleasant: 4 },
    { name: 'Impactado', energy: 10, pleasant: 5 },
    { name: 'Sorprendido', energy: 10, pleasant: 6 },
    { name: 'Animado', energy: 10, pleasant: 7 },
    { name: 'Jubiloso', energy: 10, pleasant: 8 },
    { name: 'Eufórico', energy: 10, pleasant: 9 },
    { name: 'Extasiado', energy: 10, pleasant: 10 },
    { name: 'Desesperado', energy: 9, pleasant: 1 },
    { name: 'Furioso', energy: 9, pleasant: 2 },
    { name: 'Frustrado', energy: 9, pleasant: 3 },
    { name: 'Tenso', energy: 9, pleasant: 4 },
    { name: 'Atónito', energy: 9, pleasant: 5 },
    { name: 'Hiperactivo', energy: 9, pleasant: 6 },
    { name: 'Jovial', energy: 9, pleasant: 7 },
    { name: 'Motivado', energy: 9, pleasant: 8 },
    { name: 'Inspirado', energy: 9, pleasant: 9 },
    { name: 'Exultante', energy: 9, pleasant: 10 },
    { name: 'Exasperado', energy: 8, pleasant: 1 },
    { name: 'Asustado', energy: 8, pleasant: 2 },
    { name: 'Enfadado', energy: 8, pleasant: 3 },
    { name: 'Nervioso', energy: 8, pleasant: 4 },
    { name: 'Agitado', energy: 8, pleasant: 5 },
    { name: 'Enérgico', energy: 8, pleasant: 6 },
    { name: 'Vivaz', energy: 8, pleasant: 7 },
    { name: 'Emocionado', energy: 8, pleasant: 8 },
    { name: 'Optimista', energy: 8, pleasant: 9 },
    { name: 'Entusiasta', energy: 8, pleasant: 10 },
    { name: 'Ansioso', energy: 7, pleasant: 1 },
    { name: 'Aprensivo', energy: 7, pleasant: 2 },
    { name: 'Preocupado', energy: 7, pleasant: 3 },
    { name: 'Irritado', energy: 7, pleasant: 4 },
    { name: 'Enojado', energy: 7, pleasant: 5 },
    { name: 'Complacido', energy: 7, pleasant: 6 },
    { name: 'Centrado', energy: 7, pleasant: 7 },
    { name: 'Feliz', energy: 7, pleasant: 8 },
    { name: 'Orgulloso', energy: 7, pleasant: 9 },
    { name: 'Ilusionado', energy: 7, pleasant: 10 },
    { name: 'Indignado', energy: 6, pleasant: 1 },
    { name: 'Afligido', energy: 6, pleasant: 2 },
    { name: 'Afectado', energy: 6, pleasant: 3 },
    { name: 'Intranquilo', energy: 6, pleasant: 4 },
    { name: 'Molesto', energy: 6, pleasant: 5 },
    { name: 'Agradable', energy: 6, pleasant: 6 },
    { name: 'Alegre', energy: 6, pleasant: 7 },
    { name: 'Esperanzado', energy: 6, pleasant: 8 },
    { name: 'Juguetón', energy: 6, pleasant: 9 },
    { name: 'Dichoso', energy: 6, pleasant: 10 },
    { name: 'Rechazado', energy: 5, pleasant: 1 },
    { name: 'Taciturno', energy: 5, pleasant: 2 },
    { name: 'Decepcionado', energy: 5, pleasant: 3 },
    { name: 'Decaído', energy: 5, pleasant: 4 },
    { name: 'Apático', energy: 5, pleasant: 5 },
    { name: 'A gusto', energy: 5, pleasant: 6 },
    { name: 'Despreocupado', energy: 5, pleasant: 7 },
    { name: 'Contento', energy: 5, pleasant: 8 },
    { name: 'Afectuoso', energy: 5, pleasant: 9 },
    { name: 'Realizado', energy: 5, pleasant: 10 },
    { name: 'Pesimista', energy: 4, pleasant: 1 },
    { name: 'Malhumorado', energy: 4, pleasant: 2 },
    { name: 'Desanimado', energy: 4, pleasant: 3 },
    { name: 'Triste', energy: 4, pleasant: 4 },
    { name: 'Aburrido', energy: 4, pleasant: 5 },
    { name: 'Calmado', energy: 4, pleasant: 6 },
    { name: 'Seguro', energy: 4, pleasant: 7 },
    { name: 'Satisfecho', energy: 4, pleasant: 8 },
    { name: 'Agradecido', energy: 4, pleasant: 9 },
    { name: 'Conmovido', energy: 4, pleasant: 10 },
    { name: 'Alienado', energy: 3, pleasant: 1 },
    { name: 'Infeliz', energy: 3, pleasant: 2 },
    { name: 'Solitario', energy: 3, pleasant: 3 },
    { name: 'Descorazonado', energy: 3, pleasant: 4 },
    { name: 'Cansado', energy: 3, pleasant: 5 },
    { name: 'Relajado', energy: 3, pleasant: 6 },
    { name: 'Distendido', energy: 3, pleasant: 7 },
    { name: 'Sosegado', energy: 3, pleasant: 8 },
    { name: 'Afortunado', energy: 3, pleasant: 9 },
    { name: 'Equilibrado', energy: 3, pleasant: 10 },
    { name: 'Desalentado', energy: 2, pleasant: 1 },
    { name: 'Deprimido', energy: 2, pleasant: 2 },
    { name: 'Huraño', energy: 2, pleasant: 3 },
    { name: 'Rendido', energy: 2, pleasant: 4 },
    { name: 'Fatigado', energy: 2, pleasant: 5 },
    { name: 'Apacible', energy: 2, pleasant: 6 },
    { name: 'Reflexivo', energy: 2, pleasant: 7 },
    { name: 'Pacífico', energy: 2, pleasant: 8 },
    { name: 'Descansado', energy: 2, pleasant: 9 },
    { name: 'Desenfadado', energy: 2, pleasant: 10 },
    { name: 'Devastado', energy: 1, pleasant: 1 },
    { name: 'Desesperanzado', energy: 1, pleasant: 2 },
    { name: 'Desolado', energy: 1, pleasant: 3 },
    { name: 'Consumido', energy: 1, pleasant: 4 },
    { name: 'Agotado', energy: 1, pleasant: 5 },
    { name: 'Soñoliento', energy: 1, pleasant: 6 },
    { name: 'Complaciente', energy: 1, pleasant: 7 },
    { name: 'Tranquilo', energy: 1, pleasant: 8 },
    { name: 'Afable', energy: 1, pleasant: 9 },
    { name: 'Sereno', energy: 1, pleasant: 10 },
  ];

  colorsByZone(rowIndex: number): string {
    if (rowIndex <= 4) return '#fca5a5'; // Rojo claro (Alta energía, Desagradable)
    if (rowIndex >= 5 && rowIndex <= 9) return '#93c5fd'; // Azul claro (Baja energía, Desagradable)
    if (rowIndex >= 10 && rowIndex <= 14) return '#fef08a'; // Amarillo claro (Alta energía, Agradable)
    if (rowIndex >= 15) return '#86efac'; // Verde claro (Baja energía, Agradable)
    return '';
  }
  detailEmotions() {
    const unpleasantEmotions = this.emotions.filter((e) => e.pleasant < 6);
    const pleasantEmotions = this.emotions.filter((e) => e.pleasant >= 6);

    const sortedEmotions = [...unpleasantEmotions, ...pleasantEmotions];

    const rows = [];
    for (let i = 0; i < sortedEmotions.length; i += 5) {
      rows.push({
        col1: sortedEmotions[i] || null,
        col2: sortedEmotions[i + 1] || null,
        col3: sortedEmotions[i + 2] || null,
        col4: sortedEmotions[i + 3] || null,
        col5: sortedEmotions[i + 4] || null,
      });
    }
    return rows;
  }
}
