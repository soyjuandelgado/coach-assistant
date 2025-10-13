
# Historias Epicas

## Resumen de los Epics

1. Acceso y Autenticación de Usuarios.
2. Administración y Seguridad del Sistema.
3. Gestión del Perfil y Datos del Coachee.
4. Preparación y Configuración Pre-Sesión.
5. Interacción y Documentación en Sesión (In-Session Tools).
6. Procesamiento y Seguimiento Post-Sesión.

### I. Epic: Acceso y Autenticación de Usuarios

Este Epic engloba las funcionalidades básicas requeridas para que cualquier **Usuario Genérico** pueda ingresar y obtener acceso al sistema.

| Historia de Usuario | Descripción | Rol Principal |
| :--- | :--- | :--- |
| **[HU001]** | Entrada sencilla al sistema | Usuario Genérico |
| **[HU002]** | Alta rápida de usuario | Usuario Genérico |

### II. Epic: Administración y Seguridad del Sistema

Este Epic cubre las funcionalidades necesarias para gestionar la base de usuarios y controlar los permisos de acceso dentro del *software*, operaciones típicamente asignadas al rol de **Administrador**.

| Historia de Usuario | Descripción | Rol Principal |
| :--- | :--- | :--- |
| **[HU003]** | Gestión CRUD de usuarios | Administrador |
| **[HU004]** | Gestión de permisos por tipo de usuario | Administrador |

### III. Epic: Gestión del Perfil y Datos del Coachee

Este Epic agrupa las historias relacionadas con la administración de los datos persistentes de los clientes (*Coachees*), permitiendo al **Coach** mantener control sobre sus clientes y acceder a información consolidada.

| Historia de Usuario | Descripción | Rol Principal | Momento |
| :--- | :--- | :--- | :--- |
| **[HU005]** | Gestión CRUD de Coachees | Coach | Administrar Coachees |
| **[HU006]** | Persistencia de datos del proceso | Coach | Administrar Coachees |
| **[HU007]** | Consulta y modificación del historial | Coach | Administrar Coachees |
| **[HU008]** | Visión general rápida del coachee | Coach | Administrar Coachees |

### IV. Epic: Flujo de Trabajo de Sesión (Pre, En y Post Sesión)

Dado que un gran número de historias de usuario se centran en el proceso de *coaching* (preparación, ejecución y cierre), se pueden dividir en tres sub-Epics o, alternativamente, considerarse un gran **Tema** que engloba los siguientes Epics específicos relacionados con la ejecución del *coaching*:

#### Epic A: Preparación y Configuración Pre-Sesión

Se enfoca en las acciones que el **Coach** realiza antes de iniciar la sesión para organizar y editar la información de apoyo.

| Historia de Usuario | Descripción | Rol Principal | Momento |
| :--- | :--- | :--- | :--- |
| **[HU023B]** | Edición de etiquetas clave en pre-sesión | Coach | Pre Sesión |
| **[HU026]** | Preparación de sesión con notas y resumen anterior | Coach | Pre Sesión |

#### Epic B: Interacción y Documentación en Sesión (In-Session Tools)

Este es el Epic más extenso, cubriendo todas las funcionalidades que el **Coach** necesita para guiar, documentar e interactuar con el *coachee* en tiempo real.

| Historia de Usuario | Descripción | Rol Principal | Momento |
| :--- | :--- | :--- | :--- |
| **[HU009]** | Anotación ágil en sesión | Coach | En Sesión |
| **[HU010]** | Creación rápida de planes de acción | Coach | En Sesión |
| **[HU011]** | Acceso a herramientas colaborativas en sesión | Coach | En Sesión |
| **[HU012]** | Ejecución de tests en tiempo real | Coach | En Sesión |
| **[HU013]** | Reloj de tiempo restante y control de fase | Coach | En Sesión |
| **[HU014]** | Etiquetado emocional y anímico | Coach | En Sesión |
| **[HU016]** | Acceso rápido a preparación y resumen anterior | Coach | En Sesión |
| **[HU017]** | Consulta de historial durante la sesión | Coach | En Sesión |
| **[HU015]** | Etiquetado rápido de palabras clave | Coach | En Sesión |
| **[HU018]** | Gestión de fases (ej. GROW) | Coach | En Sesión |
| **[HU019]** | Registro cronológico de notas | Coach | En Sesión |

#### Epic C: Procesamiento y Seguimiento Post-Sesión

Contiene las funcionalidades para el **Coach** relacionadas con la revisión, el resumen y la planificación posterior a la finalización de una sesión.

| Historia de Usuario | Descripción | Rol Principal | Momento |
| :--- | :--- | :--- | :--- |
| **[HU020]** | Edición post-sesión de datos | Coach | Post Sesión |
| **[HU021]** | Consolidación de datos para resumen | Coach | Post Sesión |
| **[HU022]** | Visualización de métricas y desvíos del proceso | Coach | Post Sesión |
| **[HU023]** | Gestión de listas maestras post-sesión | Coach | Post Sesión |
| **[HU024]** | Gestión de Próximos Pasos (Post-Sesión) | Coach | Post Sesión |
| **[HU025]** | Agendamiento de acciones internas del coach | Coach | Post Sesión |
