import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PopoverModule } from 'primeng/popover';
import { DrawerModule } from 'primeng/drawer';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { TabsModule } from 'primeng/tabs';
import { DialogModule } from 'primeng/dialog';

import { CoacheeProfile } from './coachee-profile/coachee-profile';
import { InsertData } from './insert-data/insert-data';

import { Router } from '@angular/router';
import { FullScreen } from '../shared/services/full-screen/full-screen';
import { SessionsService } from '../shared/services/sessions/sessions-service';
import { IProcess } from '../shared/models/process.interface';
import { ProcessesService } from '../shared/services/processes/processes-service';
import { ConfirmationService } from 'primeng/api';
import { ICoachee } from '../shared/models/coachee.interface';
import { NotesService } from '../shared/services/notes/notes-service';
import { INote } from '../shared/models/notes.interface';
import { ISession } from '../shared/models/session.interface';

interface Emotion {
  name: string;
  energy: number;
  pleasant: number;
}
interface DetailOption {
  id: number;
  date: Date;
  text: string;
  type: string;
}
interface TaskOption {
  id: number;
  date: Date;
  text: string;
  scheduled: Date;
  score: number;
}

@Component({
  selector: 'app-session',
  imports: [
    InputNumberModule,
    FormsModule,
    TextareaModule,
    SelectButtonModule,
    TableModule,
    DatePipe,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    ToolbarModule,
    PopoverModule,
    DrawerModule,
    DividerModule,
    PanelModule,
    TabsModule,
    DialogModule,
    CoacheeProfile,
    InsertData,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './session.html',
  styleUrl: './session.css',
  providers: [ConfirmationService],
})
export class Session {
  private fullScreenService = inject(FullScreen);
  // Exponemos la señal del servicio a la plantilla
  public isFullScreen = this.fullScreenService.isFullScreen;

  // Método para llamar al servicio
  public toggleFullScreen(): void {
    this.fullScreenService.toggle();
  }

  protected id = input.required<string>();
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private sessionsService = inject(SessionsService);
  private processesService = inject(ProcessesService);
  private notesService = inject(NotesService);
  protected session = this.sessionsService.session;
  protected process = signal<IProcess | undefined>(undefined);
  protected coachee = signal<ICoachee | undefined>(undefined);

  visible = false;
  visibleNotes = false;
  visibleEmotions = false;
  visibleProfile = false;

  goal = signal('');
  notes = signal<string[]>([]);
  tasks = signal<string[]>([]);

  constructor() {
    effect(() => {
      const sessionId = this.id();
      this.sessionsService.getSession(sessionId);
    });

    effect(() => {
      const session = this.session();
      if (session) {
        if (session.process) {
          this.getProcess(session!.process!.id!);
        }
      }
    });
  }

  getProcess(processId: string) {
    this.processesService.getProcess$(processId).subscribe({
      next: (response: IProcess) => {
        this.process.set(response);
        this.coachee.set(response.coachee);
      },
      error: (err) => {
        this.showErrorDialog(err);
      },
    });
  }

  createNote(newNote: INote) {
    const sessionId = this.id();
    this.notesService.createNote$(sessionId, newNote).subscribe({
      error: (err) => {
        this.showErrorDialog(err);
        //TODO: eliminar la nota de la pantalla. Hacer guardado temporal en localStorage
      },
    });
  }

  updateGoal(goal: string) {
    this.session()!.goal = goal;
    this.updateSessionGoal(this.id(), goal);
  }

  updateSessionGoal(sessionId: string, newGoal: string){
    this.sessionsService.updateSessionGoal$(sessionId, newGoal).subscribe({
      error: (err) => {
          this.showErrorDialog(err);
      },
    });
  }


  setGoal(newGoal: string) {
    this.goal.set(newGoal);
    this.updateGoal(newGoal);
  }
  addNote(newNote: { type: string; text: string }) {
    this.createNote(newNote as INote);
    if (newNote.type == 'N') this.notes().push(newNote.text);
    else this.notes().push(newNote.type + ' ' + newNote.text);
  }
  addTask(newTask: string) {
    this.tasks().push(newTask);
  }

  showErrorDialog(error: string) {
    this.confirmationService.confirm({
      message: error,
      header: 'Error',
      icon: 'pi pi-times-circle',
      rejectLabel: 'Cerrar',
      acceptVisible: false,
    });
  }

  showDialogNotes() {
    this.visibleNotes = true;
  }

  showDialogEmotions() {
    this.visible = false;
    this.visibleEmotions = true;
  }

  showProfile() {
    this.visible = false;
    this.visibleProfile = true;
  }

  goCoachees() {
    this.router.navigate(['/coachees']);
  }

  // emotions = [
  //   'Enfurecido', 'Aterrado', 'Estresado', 'Inquieto', 'Impactado',
  //   'Sorprendido', 'Animado', 'Jubiloso', 'Eufórico', 'Extasiado',
  //   'Desesperado', 'Furioso', 'Frustrado', 'Tenso', 'Atónito',
  //   'Hiperactivo', 'Jovial', 'Motivado', 'Inspirado', 'Exultante',
  //   'Exasperado', 'Asustado', 'Enfadado', 'Nervioso', 'Agitado',
  //   'Enérgico', 'Vivaz', 'Emocionado', 'Optimista', 'Entusiasta',
  //   'Ansioso', 'Aprensivo', 'Preocupado', 'Irritado', 'Enojado',
  //   'Complacido', 'Centrado', 'Feliz', 'Orgulloso', 'Ilusionado',
  //   'Indignado', 'Afligido', 'Afectado', 'Intranquilo', 'Molesto',
  //   'Agradable', 'Alegre', 'Esperanzado', 'Juguetón', 'Dichoso',
  //   'Rechazado', 'Taciturno', 'Decepcionado', 'Decaído', 'Apático',
  //   'A gusto', 'Despreocupado', 'Contento', 'Afectuoso', 'Realizado',
  //   'Pesimista', 'Malhumorado', 'Desanimado', 'Triste', 'Aburrido',
  //   'Calmado', 'Seguro', 'Satisfecho', 'Agradecido', 'Conmovido',
  //   'Alienado', 'Infeliz', 'Solitario', 'Descorazonado', 'Cansado',
  //   'Relajado', 'Distendido', 'Sosegado', 'Afortunado', 'Equilibrado',
  //   'Desalentado', 'Deprimido', 'Huraño', 'Rendido', 'Fatigado',
  //   'Apacible', 'Reflexivo', 'Pacífico', 'Descansado', 'Desenfadado',
  //   'Devastado', 'Desesperanzado', 'Desolado', 'Consumido', 'Agotado',
  //   'Soñoliento', 'Complaciente', 'Tranquilo', 'Afable', 'Sereno'
  // ];

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

  detailEmotions() {
    const rows = [];
    for (let i = 0; i < this.emotions.length; i += 10) {
      rows.push({
        col1: this.emotions[i].name || '',
        col2: this.emotions[i + 1].name || '',
        col3: this.emotions[i + 2].name || '',
        col4: this.emotions[i + 3].name || '',
        col5: this.emotions[i + 4].name || '',
        col6: this.emotions[i + 5].name || '',
        col7: this.emotions[i + 6].name || '',
        col8: this.emotions[i + 7].name || '',
        col9: this.emotions[i + 8].name || '',
        col10: this.emotions[i + 9].name || '',
      });
    }
    return rows;
  }

  colorsByZone(rowIndex: number, colIndex: number): string {
    if (rowIndex <= 4 && colIndex <= 4) return '#fca5a5'; // rojo claro
    if (rowIndex <= 4 && colIndex >= 5) return '#fef08a'; // amarillo claro
    if (rowIndex >= 5 && colIndex <= 4) return '#93c5fd'; // azul claro
    if (rowIndex >= 5 && colIndex >= 5) return '#86efac'; // verde claro
    return '';
  }

  detailOptions = signal<DetailOption[]>([
    { id: 1, date: new Date('2025-10-15 15:04'), type: 'I', text: 'La semana bien' },
    { id: 2, date: new Date('2025-10-15 15:10'), type: 'E', text: 'Feliz' },
    { id: 3, date: new Date('2025-10-15 15:12'), type: 'G', text: 'Duda entre entregar o no' },
    { id: 4, date: new Date('2025-10-15 15:17'), type: 'G', text: 'Decide diseñar el producto' },
    { id: 5, date: new Date('2025-10-15 15:24'), type: 'R', text: 'No tiene diseñador' },
    {
      id: 6,
      date: new Date('2025-10-15 15:25'),
      type: 'R',
      text: 'No sabe donde encontrarlo ni precio',
    },
    { id: 7, date: new Date('2025-10-15 15:29'), type: 'O', text: 'Buscar diseñador por internet' },
    { id: 8, date: new Date('2025-10-15 15:33'), type: 'O', text: 'Diseño propio, sin contratar' },
    {
      id: 9,
      date: new Date('2025-10-15 15:33'),
      type: 'W',
      text: 'Calcular cual es el presupuesto',
    },
    { id: 10, date: new Date('2025-10-15 15:33'), type: 'W', text: 'Buscar diseñador esta semana' },
  ]);

  selectedDetail = signal<DetailOption | undefined>(undefined);

  taskOptions = signal<TaskOption[]>([
    {
      id: 1,
      date: new Date('2025-10-15 15:58'),
      text: 'Buscar diseñadores',
      scheduled: new Date('2025-10-17 23:59'),
      score: 10,
    },
    {
      id: 2,
      date: new Date('2025-10-15 16:05'),
      text: 'Pedir 3 presupuestos',
      scheduled: new Date('2025-10-18 23:59'),
      score: 10,
    },
    {
      id: 3,
      date: new Date('2025-10-15 16:10'),
      text: 'Contratar diseñador y enviarme mensaje',
      scheduled: new Date('2025-10-20 19:00'),
      score: 9,
    },
  ]);

  selectedTask = signal<TaskOption | undefined>(undefined);

  stateOptions: any[] = [
    { label: 'Objetivo', value: 'objetivo' },
    { label: 'Issues', value: 'issues' },
    { label: 'Goal', value: 'goal' },
    { label: 'Reality', value: 'reality' },
    { label: 'Options', value: 'options' },
    { label: 'Will', value: 'will' },
    { label: 'Tareas', value: 'tasks' },
  ];

  stateOptionsTab: any[] = [
    { label: 'Issues', value: 'issues' },
    { label: 'Goal', value: 'goal' },
    { label: 'Reality', value: 'reality' },
    { label: 'Options', value: 'options' },
    { label: 'Will', value: 'will' },
  ];

  value = 'issues';
}
