# NOTAS

- Coaches
- Coachees
  - Perfil con:
    - Tests realizados y resultados
    - Anotaciones
    - Estrategia a seguir
  - Datos accesibles solo por el coach asignado
- Tests
  - Tela de araña, Ellis, Rueda de la Vida
  - Preguntas
  - Gráficos
  - Interpretacion de respuestas (IA?)
  - Sugerencias de continuación (IA?)
- Planes de acción con fechas y calendario
- Agenda de sesiones
  - Visibilidad determinada para coach y coachee
  - Modificar citas
- Notas de sesión
  - Plantilla
  - Resumen
  - Plan de acción coach/coachee
  - Conceptos a tratar
  - Introduccion de datos MUY simple y rápida, a mano.

## Pasos

- [x] Definir el _project goal_
- [x] Crear las historias de usuario epicas
- [x] Investigar escritura a mano, a ser posible con elementos integrados en el front y sin necesidad de conexion
  - [x] **Se puede usar el GBoard como escritura a mano instalando el idioma. Se trata como un idioma más** [LINK](https://support.google.com/gboard/answer/9108773?hl=en&co=GENIE.Platform%3DAndroid&oco=0)
  - [ ] [handwritting](https://www.chenyuho.com/project/handwritingjs/)
  - [ ] [iinkjs](https://www.npmjs.com/package/iink-ts)
  - [ ] [MyScript](https://developer.myscript.com/features/text)
  - [ ] https://codepen.io/tomapaunovic/pen/BapVoqb?anon=true&view=pen
  - [ ] Tesseract.js
- [x] Buscar info de Signal Forms
- [x] Hacer pantallas básicas
  - [x] Pantalla de login sin logica
  - [x] Pantalla de sesion
  - [x] Pantalla de resumen
- [ ] Añadir comprobación de visibilidad de los elementos con el teclado en pantalla
- [ ] Seleccionar etiquetas al escribir
  - [ ] @persona
  - [ ] emocion!
  - [ ] #etiqueta
  - [ ] > objetivo
  - [ ] G/R/O/W: seccion
  - [ ] :
- [ ] Girar elementos 90º para info tipo cuadro emociones
- [ ] Tour guiado la primera vez
- [ ] Pantalla horizontal:
  - [ ] En el caso de sesion, mostrar Desarrollo en la izquierda y objetivo, tareas e introduccion de datos a la derecha. Tener en cuenta cambiar la disposicion en personas zurdas.
- [ ] Configurar zoom para hacer crecer los elementos en caso de necesitarlo
- [ ] Mover is_grow de process a session
- [x] Añadir a process:
  - [x] Fecha inicio
  - [x] Fecha fin
  - [x] periodicidad
  - [x] observaciones
  - [x] --- economicos legal
    - [x] precio sesion
    - [x] forma pago
    - [x] plazo pago en dias
    - [x] contrato firmado
    - [x] LOPD firmada
    - [x] RGPD firmada

- [ ] Pantalla Coachee
  - [x] Boton crear proceso
  - [x] boton ver proceso
  - [ ] Menu lateral
    - [ ] Nueva sesion
    - [ ] Nuevo resumen
    - [ ] Historial
  - [ ] Al guardar datos correctamente, navegar a Coachees
  - [ ] Mostrar p-toast cuando se guarden los cambios

- [ ] Pantalla coachees
  - [ ] Menu lateral
    - [ ] Perfil coach
    - [ ] Ultimas 10 sesiones hechas (de cualquier proceso)
    - [ ] Ultimos 10 resumenes hechos (de cualquier proceso)
    - [ ] Salir (pi-power-off)
  - [ ] Tabla
    - [x] Boton en grid para ver los datos del proceso (carpeta abierta pi-folder-open)
    - [x] Desactivar botones que no se pueden usar
    - [ ] Boton archivar / desarchivar (pi-download / pi-upload)
    - [ ] Buscar
    - [ ] Filtrar
    - [ ] ver archivados
  - [ ] al clicar en nueva sesion
    - [ ] muestra datos basicos inicio
    - [ ] tiempo de sesion
    - [ ] si es GROW
    - [ ] boton inicio de sesion
  - [ ] Al clicar en nuevo resumen
    - [ ] pantalla seleccion sesiones sin resumen
  
- [x] Control de errores!!

- [ ] Pantalla Proceso
  - [ ] Modificar tipo y metodo de pago para usar p-select
  - [ ] Mostrar p-toast cuando se guarden los cambios
  - [ ] Menú lateral
    - [ ] Historial de sesiones
  
- [ ] Menú de navegación
  - [ ] Extraerlo a un componente
  - [ ] Colocarlo en app.html
  - [ ] Modificarlo dependiendo de la pantalla visible
  - [ ] ¿Pasar funciones como parámetro para realizar las acciones del menu?

- [ ] Menú lateral
  - [ ] Extraerlo a un componente
  - [ ] Modificarlo dependiendo de la pantalla visible
  - [ ] ¿Pasar funciones como parámetro para realizar las acciones del menu?

- [ ] Desacoplar la navegación de guardar datos (tambien en PROCESS, NEW-SESSION-DIALOG)
  - [ ] pasar un parametro opcional con la funcion a ejecutar en el caso de ok?
  - [ ] se puede cambiar el nombre del boton guardar a guardar y salir.
  - [ ] mirar información de Resolvers
  
- [ ] Modificar carpeta interfaces?
  
## Pantallas

### Sesión

- GROW
- Herramienta
- Dinámica
- Libre

## Perfiles

- Coach
- Supervisor coaches
- Administrador
- Administrativo
- Coachee
  
## Herramientas

- Rueda de Vida
- Rueda de Motivos
- Valores
- Cuadro de emociones
- Test de colores (DISC)
- Test Id. PNL
- Semana vista
  - Real
  - Bloques
  - Ideal
- Listas
  - Miedos
  - Deseos
  - Tengo que / molestias
- Tela de araña
- Ellis
- Autoconocimiento
- Balanza
- Ficha de objetivo
- Linea de vida

## Pildoras

- Circulo de influencia
- Emociones

## Dinámicas (sesion)

## Ideas

- Para hacer una herramienta, mostrarla encima de la pantalla de sesión, dejando disponible la entrada de texto.
- Para palabras clave, en vez de un listado, escribir delante #
- ¿Cómo guardar información sensible?
- ¿Qué añadir en un mapa?
- ¿Añadir IA para sugerencias?
- Mostrar movimiento ocular como ayuda en sesión.

---

### SACAR menu

¡Excelente pregunta! Esta es una arquitectura de "Layout" fundamental.

Para sacar el p-toolbar y convertirlo en el menú principal de la aplicación, debes moverlo al componente "raíz" (AppComponent) y usar un servicio de estado (con Signals) para comunicarte con él.

El componente AppComponent actúa como el "marco" de la página, y <router-outlet> renderiza el componente de la ruta actual (como CoacheesComponent) dentro de ese marco.

Aquí tienes los pasos detallados:

Paso 1: Crear un Servicio de Estado para el Toolbar
Primero, creamos un servicio singleton (providedIn: 'root') que mantendrá el estado del toolbar. Los componentes de las rutas (como CoacheesComponent) escribirán en este servicio, y el AppComponent (que aloja el toolbar) leerá de él.

Usaremos signal para que el AppComponent reaccione al instante.

Crea el servicio:

Bash

ng g s core/ui/toolbar
Edita toolbar.service.ts: Vamos a crear un signal que contenga un objeto de configuración. De esta forma, puedes cambiar el título, los botones o cualquier otra cosa.

TypeScript

// src/app/core/ui/toolbar.service.ts
import { Injectable, signal } from '@angular/core';

// 1. Define una interfaz para el estado del toolbar
export interface ToolbarConfig {
  centerLabel?: string;
  startIcon?: string;
  showEndButton?: boolean;
  // Puedes añadir más propiedades (ej. array de botones de acción)
}

// 2. Define el estado por defecto
const DEFAULT_CONFIG: ToolbarConfig = {
  centerLabel: 'Mi Aplicación',
  startIcon: 'pi pi-bars',
  showEndButton: true
};

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  // 3. Crea el signal con el estado
  private state = signal<ToolbarConfig>(DEFAULT_CONFIG);

  // 4. Expón el signal como solo lectura (public readonly signal)
  public readonly config = this.state.asReadonly();

  // 5. Método para que los componentes actualicen la configuración
  setConfig(config: Partial<ToolbarConfig>): void {
    this.state.update(current => ({ ...current, ...config }));
  }

  // 6. Método para resetear al estado por defecto
  resetConfig(): void {
    this.state.set(DEFAULT_CONFIG);
  }
}
Paso 2: Mover el Toolbar a app.component.ts
Ahora, AppComponent será el dueño del toolbar. Inyectará el ToolbarService para leer el estado.

Modifica app.component.ts:

TypeScript

import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToolbarService } from './core/ui/toolbar.service'; // 👈 1. Importar

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Importar los módulos necesarios
  imports: [RouterOutlet, ToolbarModule, ButtonModule], 
  templateUrl: './app.component.html',
})
export class AppComponent {

  // 3. Inyectar el servicio y obtener el signal
  private toolbarService = inject(ToolbarService);
  public config = this.toolbarService.config; // 👈 El signal de config

  // Lógica para el botón de pantalla completa (si es global)
  toggleFullScreen(): void {
    console.log('Toggle fullscreen');
    // ... tu lógica
  }
}
Modifica app.component.html: Coloca el <p-toolbar> aquí, seguido del <router-outlet>. El toolbar ahora leerá del signal config().

HTML

<div class="w-full h-full flex flex-col">
  <p-toolbar [style]="{ 'padding': '0' }">
    <ng-template #start>
      <p-button [icon]="config().startIcon" text severity="contrast" />
    </ng-template>

    <ng-template #center>
      <p-button icon="pi pi-users" text severity="help" [label]="config().centerLabel" />
    </ng-template>

    <ng-template #end>
      @if (config().showEndButton) {
        <p-button icon="pi pi-window-maximize" text severity="info" (onClick)="toggleFullScreen()" />
      }
    </ng-template>
  </p-toolbar>

  <main class="flex-grow">
    <router-outlet />
  </main>
</div>
Paso 3: Comunicar desde coachees.component.ts
Finalmente, le decimos a CoacheesComponent que, cuando se cargue, actualice el estado del toolbar.

Elimina el <p-toolbar> de coachees.html: El toolbar ya no vive aquí. El div principal es todo lo que queda.

HTML

<div class="w-full h-full flex flex-col gap-2 bg-primary-50">
    <div class="w-full flex flex-col">
        <label for="coachees" class="block mb-1 font-medium">Coachees activos ...</label>
        <p-table [value]="coachees()" ...>
            </p-table>
    </div>
</div>
Modifica coachees.component.ts: Inyecta el ToolbarService y úsalo en el ciclo de vida del componente (constructor y ngOnDestroy).

TypeScript

import { Component, inject, OnDestroy } from '@angular/core';
import { ToolbarService } from '../core/ui/toolbar.service'; // 👈 1. Importar
// ... otros imports (TableModule, ButtonModule, etc.)

@Component({
  selector: 'app-coachees',
  standalone: true,
  imports: [/*... TableModule, ButtonModule ...*/],
  templateUrl: './coachees.component.html',
  // ...
})
export class CoacheesComponent implements OnDestroy {

  private toolbarService = inject(ToolbarService); // 👈 2. Inyectar

  constructor() {
    // 3. ¡Establece la configuración del toolbar para ESTA página!
    this.toolbarService.setConfig({
      centerLabel: 'Coachees',
      showEndButton: true 
      // (puedes añadir otros botones aquí si los definiste en la config)
    });
  }

  // 4. ¡Limpia la configuración al salir de la página!
  ngOnDestroy(): void {
    this.toolbarService.resetConfig();
  }

  // ... resto de tu lógica (coachees signal, etc.)
}
Resumen del Flujo
El usuario navega a /coachees.

Angular carga CoacheesComponent.

El constructor de CoacheesComponent se ejecuta y llama a toolbarService.setConfig({ centerLabel: 'Coachees' }).

El signal dentro del servicio se actualiza.

AppComponent está "escuchando" ese signal (config()), por lo que se actualiza automáticamente y muestra "Coachees" en el p-button central.

El usuario navega fuera (ej. a /coachee/1).

Angular destruye CoacheesComponent.

ngOnDestroy se ejecuta y llama a toolbarService.resetConfig().

El AppComponent vuelve a mostrar el título por defecto ("Mi Aplicación").

El nuevo componente (CoacheeComponent) se carga y puede establecer su propio título (ej. "Editar Coachee").