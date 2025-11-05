import { DOCUMENT, ElementRef, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullScreen {
  private document = inject(DOCUMENT);

  // Señal para almacenar el estado de la pantalla completa
  private isFullScreenSignal = signal(this.isFullScreenActive());
  
  // Señal pública de solo lectura para el exterior
  public isFullScreen = this.isFullScreenSignal.asReadonly();

  constructor() {
    // Escuchar cambios en el estado de pantalla completa del navegador
    this.document.addEventListener('fullscreenchange', this.onFullScreenChange.bind(this));
  }

  /**
   * Solicita entrar en modo de pantalla completa.
   * Se puede pasar un ElementRef para poner un elemento específico en pantalla completa.
   * Si no se pasa ningún elemento, se utiliza el body del documento.
   */
  public async enter(elementRef?: ElementRef<HTMLElement>): Promise<void> {
    const element = elementRef?.nativeElement || this.document.documentElement;
    
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      }
    } catch (error) {
      console.error('Error al intentar activar la pantalla completa:', error);
    }
  }

  /**
   * Sale del modo de pantalla completa.
   */
  public async exit(): Promise<void> {
    if (!this.isFullScreenActive()) return;

    try {
      if (this.document.exitFullscreen) {
        await this.document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error al intentar desactivar la pantalla completa:', error);
    }
  }

  /**
   * Alterna entre el modo de pantalla completa y el modo normal.
   */
  public async toggle(elementRef?: ElementRef<HTMLElement>): Promise<void> {
    if (this.isFullScreenActive()) {
      await this.exit();
    } else {
      await this.enter(elementRef);
    }
  }

  // Método privado para actualizar la señal cuando cambia el estado
  private onFullScreenChange(): void {
    this.isFullScreenSignal.set(this.isFullScreenActive());
  }

  // Método privado para comprobar el estado actual
  private isFullScreenActive(): boolean {
    return !!this.document.fullscreenElement;
  }  
}
