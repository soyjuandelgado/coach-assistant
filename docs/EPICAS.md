
# Historias de Usuario Épicas

1. Acceso y Autenticación de Usuarios
2. Administración de usuarios
3. Gestión de procesos y coachees
4. Registro de datos en sesión
5. Acceso a datos en sesión
6. Registro de datos de resumen

## 1. Acceso y Autenticación de Usuarios

Funcionalidades básicas requeridas para que cualquier **Usuario Genérico** pueda ingresar y obtener acceso al sistema.

| Historia de Usuario | Descripción | Rol Principal | Momento |
| :--- | :--- | :--- | :--- |
| **[HU001]** | Entrada sencilla al sistema | Usuario Genérico | |
| **[HU002]** | Alta rápida de usuario | Usuario Genérico | |

## 2. Administración de usuarios

Funcionalidades necesarias para gestionar la base de usuarios y controlar los permisos de acceso dentro del *software*, operaciones típicamente asignadas al rol de **Administrador**.

| Historia de Usuario | Descripción | Rol Principal | Momento |
| :--- | :--- | :--- | :--- |
| **[HU003]** | Gestión CRUD de usuarios | Administrador | |
| **[HU004]** | Gestión de permisos por tipo de usuario | Administrador | |

## 3. Gestión de procesos y coachees

Administración de los datos persistentes de los clientes (*Coachees*), permitiendo al **Coach** mantener control sobre sus clientes y acceder a información consolidada.

| Historia de Usuario | Descripción | Rol Principal | Momento |
| :--- | :--- | :--- | :--- |
| **[HU005]** | Gestión CRUD de Coachees | Coach | Administrar Coachees |
| **[HU006]** | Persistencia de datos importantes del proceso | Coach | Administrar Coachees |
| **[HU007]** | Consulta y modificación del historial | Coach | Administrar Coachees |
| **[HU008]** | Visión general rápida del coachee | Coach | Administrar Coachees |
| **[HU020]** | Edición post-sesión de datos de sesión | Coach | Post Sesión |
| **[HU023]** | Edición de etiquetas y personas clave | Coach | Post Sesión |

## 4. Registro de datos en sesión

Acciones que puede hacer el coach durante la sesión, sin que haya distracciones.

| Historia de Usuario | Descripción | Rol Principal | Momento |
| :--- | :--- | :--- | :--- |
| **[HU009]** | Anotación ágil en sesión | Coach | En Sesión |
| **[HU010]** | Creación rápida de planes de acción | Coach | En Sesión |
| **[HU011]** | Acceso a herramientas colaborativas en sesión | Coach | En Sesión |
| **[HU012]** | Ejecución de tests en tiempo real | Coach | En Sesión |
| **[HU014]** | Etiquetado emocional y anímico | Coach | En Sesión |
| **[HU015]** | Etiquetado rápido de palabras clave | Coach | En Sesión |
| **[HU018]** | Gestión de fases (ej. GROW) | Coach | En Sesión |
| **[HU019]** | Registro cronológico de notas | Coach | En Sesión |

## 5. Acceso a datos en sesión

Búsqueda rápida (2 clics) de datos importantes durante la sesión. Siempre debe estar visible la zona de toma de datos.

| Historia de Usuario | Descripción | Rol Principal | Momento |
| :--- | :--- | :--- | :--- |
| **[HU013]** | Reloj de tiempo restante y control de fase | Coach | En Sesión |
| **[HU016]** | Acceso rápido a preparación y resumen anterior | Coach | En Sesión |
| **[HU017]** | Consulta de historial durante la sesión | Coach | En Sesión |

## 6. Registro de datos de resumen

Acceso a los datos del historial desde la pantalla de resumen, evitando cambios de pantalla.

| Historia de Usuario | Descripción | Rol Principal | Momento |
| :--- | :--- | :--- | :--- |
| **[HU026]** | Preparación de sesión con notas y resumen anterior | Coach | Pre Sesión |
| **[HU021]** | Consolidación de datos para resumen | Coach | Post Sesión |
| **[HU022]** | Visualización de métricas y desvíos del proceso | Coach | Post Sesión |
| **[HU024]** | Gestión de Próximos Pasos (Post-Sesión) | Coach | Post Sesión |
| **[HU025]** | Agendamiento de acciones internas del coach | Coach | Post Sesión |
