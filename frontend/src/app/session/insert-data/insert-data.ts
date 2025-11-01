import {
  AfterViewInit,
  Component,
  ElementRef,
  effect,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { INoteDto } from '../../shared/models/note.dto';
import { ITaskDto } from '../../shared/models/task.dto';

@Component({
  selector: 'app-insert-data',
  imports: [InputNumberModule, TextareaModule, InputIconModule, ButtonModule, PanelModule],
  templateUrl: './insert-data.html',
  styleUrl: './insert-data.css',
})
export class InsertData implements AfterViewInit {
  @ViewChild('textInput') textInput!: ElementRef<HTMLTextAreaElement>;

  message = signal('');
  is_grow = input(false);
  selected = signal('');
  newGoal = output<string>();
  newNote = output<INoteDto>();
  newTask = output<ITaskDto>();

  constructor() {
    effect(() => {
      if (this.is_grow()) {
        this.selected.set('GI'); // GROW Issue
      } else {
        this.selected.set('N'); // Nota
      }
    });
  }

  ngAfterViewInit(): void {
    this.textInput.nativeElement.focus();
  }

  onMessageChange(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.message.set(value);
  }
  sendMessage(inputElement: HTMLTextAreaElement) {
    const content = this.message().trim();
    if (content) {
      switch (this.selected()) {
        case 'O':
          this.newGoal.emit(content);
          break;
        case 'N':
          this.newNote.emit({ type: this.selected(), text: content } as INoteDto);
          break;
        case 'P':
          this.newTask.emit({ text: content } as ITaskDto);
          break;
        default:
          this.newNote.emit({ type: this.selected().slice(1), text: content } as INoteDto);
          break;
      }
    }
    this.message.set('');
    inputElement.focus();
  }

  handleEnter(event: Event, inputElement: HTMLTextAreaElement): void {
    if (!(event instanceof KeyboardEvent)) return;
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Evita que se cree una nueva línea
      this.sendMessage(inputElement);
    }
  }
}
