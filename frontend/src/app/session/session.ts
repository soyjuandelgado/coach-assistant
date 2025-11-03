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
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { CoacheeProfile } from './coachee-profile/coachee-profile';
import { InsertData } from './insert-data/insert-data';
import { PreviousInfoDialog } from './previous-info-dialog/previous-info-dialog';
import { EmotionsDialog } from './emotions-dialog/emotions-dialog';
import { LessonDialog } from './lesson-dialog/lesson-dialog';
import { SessionDrawer } from './session-drawer/session-drawer';

import { Router } from '@angular/router';
import { FullScreen } from '../shared/services/full-screen/full-screen';
import { SessionsService } from '../shared/services/sessions/sessions-service';
import { IProcess } from '../shared/models/process.interface';
import { ProcessesService } from '../shared/services/processes/processes-service';
import { ConfirmationService } from 'primeng/api';
import { ICoachee } from '../shared/models/coachee.interface';
import { NotesService } from '../shared/services/notes/notes-service';
import { INote } from '../shared/models/note.interface';
import { TasksService } from '../shared/services/tasks/tasks-service';
import { ITask } from '../shared/models/task.interface';
import { ITaskDto } from '../shared/models/task.dto';
import { INoteDto } from '../shared/models/note.dto';

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
    ConfirmDialogModule,
    CoacheeProfile,
    InsertData,
    PreviousInfoDialog,
    EmotionsDialog,
    LessonDialog,
    SessionDrawer,
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
  private tasksService = inject(TasksService);
  protected session = this.sessionsService.session;
  protected process = signal<IProcess | undefined>(undefined);
  protected coachee = signal<ICoachee | undefined>(undefined);

  visible = false;
  visibleNotes = false;
  visibleEmotions = false;
  visibleProfile = false;
  visibleLesson = false;
  lessonImage = signal('');

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

  updateSessionGoal(sessionId: string, newGoal: string) {
    this.sessionsService.updateSessionGoal$(sessionId, newGoal).subscribe({
      error: (err) => {
        this.showErrorDialog(err);
      },
    });
  }

  createTask(newTask: ITask) {
    const sessionId = this.id();
    this.tasksService.createTask$(sessionId, newTask).subscribe({
      error: (err) => {
        this.showErrorDialog(err);
        //TODO: eliminar la nota de la pantalla. Hacer guardado temporal en localStorage
      },
    });
  }

  setGoal(newGoal: string) {
    this.goal.set(newGoal);
    this.updateGoal(newGoal);
  }
  addNote(newNote: INoteDto) {
    this.createNote(newNote as INote);
    if (newNote.type == 'N') this.notes().push(newNote.text);
    else this.notes().push(newNote.type + ' ' + newNote.text);
  }
  addTask(newTask: ITaskDto) {
    this.createTask(newTask as ITask);
    this.tasks().push(newTask.text);
  }

  addEmotion(emotion: string) {
    const newNote: INoteDto = {
      type: 'E',
      text: emotion,
    };
    this.addNote(newNote);
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

  showExitDialog(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Seguro que quiere salir de la sesión?',
      header: '¡Atención!',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      acceptVisible: true,
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Salir',
        severity: 'danger',
      },

      accept: () => {
        this.goCoachees();
      },
    });
  }
  showDialogNotes() {
    this.visibleNotes = true;
  }

  showDialogEmotions() {
    this.visible = false;
    this.visibleEmotions = true;
  }

  showDialogLesson(imageSrc: string) {
    this.lessonImage.set(imageSrc);
    this.visible = false;
    this.visibleLesson = true;
  }

  showProfile() {
    this.visible = false;
    this.visibleProfile = true;
  }

  leaveSession(event: Event) {
    this.showExitDialog(event);
  }

  goCoachees() {
    this.router.navigate(['/coachees']);
  }
}
