import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');

  //prueba de teclado en pantalla
  viewportHeight: number = window.innerHeight;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.viewportHeight = window.innerHeight;
    // Aquí puedes ajustar la altura de tu contenedor principal
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.style.height = this.viewportHeight + 'px';
    }
  }
}
