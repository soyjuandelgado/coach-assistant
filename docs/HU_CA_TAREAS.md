# Historias de Usuario, Criterios de aceptación Gherkin y Tareas

# [HU001] Entrada sencilla al sistema - **Usuario Genérico**

Como usuario,  
quiero entrar en el sistema de manera sencilla,  
para lograr trabajar con mis datos.

## Criterios de aceptación

### Escenario 1: Inicio de sesión exitoso

Dado que soy un usuario registrado  
y mis credenciales son válidas  
Cuando introduzco mis credenciales  
y pulso 'Iniciar Sesión'  
Entonces el sistema me redirige al panel de control principal

### Escenario 2: Rendimiento de carga

Dado que intento acceder a la página de *login*  
Cuando el navegador solicita la carga de la página  
Entonces la página de *login* se presenta en menos de 200 milisegundos

### Escenario 3: Intento de sesión fallido

Dado que introduzco credenciales inválidas  
Cuando intento iniciar sesión  
Entonces el sistema muestra un mensaje de error claro  
y no especifica si falla el usuario o la contraseña

## Tareas a Realizar

- [ ] Desarrollar la interfaz de usuario (UI) para la página de inicio de sesión.
- [ ] Implementar la lógica de autenticación y validación de credenciales.
- [ ] Configurar la redirección al panel de control específico del usuario tras el *login* exitoso.
- [ ] Implementar métricas de rendimiento para medir el tiempo de carga del módulo de *login*.
- [ ] Desarrollar la gestión de errores y mensajes de seguridad en caso de credenciales incorrectas.

# [HU002] Alta rápida de usuario - **Usuario Genérico**

Como usuario,  
quiero darme de alta en el sistema facilmente y con la mínima espera,  
para lograr disponer de acceso.

## Criterios de aceptación

### Escenario 1: Registro exitoso con datos mínimos

Dado que estoy en el formulario de registro y el formulario solo requiere la información mínima esencial (email, contraseña, nombre)  
Cuando completo el registro y acepto los términos  
Entonces se crea mi cuenta y obtengo acceso inmediato al sistema

### Escenario 2: Flujo de alta rápido

Dado que inicio el proceso de alta en el sistema  
Cuando navego por el flujo de registro  
Entonces el proceso se completa en un máximo de tres pantallas o pasos

## Tareas a Realizar

- [ ] Diseñar y desarrollar el flujo de registro multi-paso (máximo 3).
- [ ] Desarrollar la lógica de validación para los campos mínimos obligatorios (email, contraseña, nombre).
- [ ] Implementar la funcionalidad para aceptar y registrar los términos de servicio.
- [ ] Configurar la concesión automática de acceso y la asignación del rol de usuario estándar tras el registro.

# [HU003] Gestión CRUD de usuarios (Admin) - **Administrador**

Como administrador,  
quiero crear, modificar y eliminar los usuarios del software,  
para tener el control de las altas y bajas.

## Criterios de aceptación

### Escenario 1: Gestión de usuarios (CRUD)

Dado que soy un usuario con el rol de "Administrador"  
y tengo acceso a la interfaz administrativa de gestión de usuarios  
Cuando utilizo la interfaz de gestión  
Entonces la interfaz soporta las operaciones Crear, Leer, Actualizar y Borrar (CRUD)

### Escenario 2: Eliminación segura de usuario

Dado que un usuario está activo  
y no es el administrador  
Cuando el administrador pulsa 'Eliminar' o 'Archivar'  
Entonces el usuario es marcado como inactivo y ya no puede iniciar sesión

## Tareas a Realizar

- [ ] Desarrollar la interfaz de gestión de usuarios (CRUD) para el rol de Administrador.
- [ ] Implementar la funcionalidad para crear y modificar datos de usuario.
- [ ] Implementar la funcionalidad de "baja" mediante una marcación de inactividad (soft delete) para impedir el acceso.
- [ ] Implementar restricciones de seguridad para garantizar que solo el Administrador pueda usar esta herramienta.

# [HU004] Gestión de permisos por tipo de usuario - **Administrador**

Como administrador,  
quiero crear, modificar y eliminar el acceso a los módulos por tipos de usuario,  
para asegurar la confidencialidad de los datos.

## Criterios de aceptación

### Escenario 1: Configuración de permisos

Dado que existe una sección de gestión de permisos  
Cuando el administrador modifica el acceso a módulos específicos (ej., Agenda, Coachees)  
y asigna o revoca permisos por tipo de usuario (ej., Coach, Coachee)  
Entonces se asegura la confidencialidad de los datos

### Escenario 2: Intento de acceso sin permiso

Dado que soy un usuario (ej. Coachee) y no tengo permiso para un módulo específico  
Cuando intento acceder a ese módulo  
Entonces el sistema muestra una alerta de acceso denegado  
y registra el intento de violación de confidencialidad

## Tareas a Realizar

- [ ] Diseñar el modelo de datos de permisos (roles vs. módulos).
- [ ] Desarrollar la interfaz administrativa para la gestión de permisos por tipo de usuario.
- [ ] Implementar la lógica de comprobación de permisos antes de cargar cada módulo.
- [ ] Desarrollar el sistema de registro de eventos de seguridad (logging) para intentos de acceso no autorizados.

# [HU005] Gestión CRUD de Coachees (Coach) - **Coach - Administrar Coachees**

Como coach,  
quiero crear, modificar y eliminar coachees,  
para tener control de mis clientes.

## Criterios de aceptación

### Escenario 1: Creación de coachee

Dado que estoy creando un coachee y registro los datos obligatorios (ej. Nombre, Email)  
Cuando guardo el perfil  
y se genera un perfil único  
Entonces el nuevo coachee aparece en mi lista de clientes

### Escenario 2: Modificación de datos

Dado que accedo a la ficha de un coachee  
y modifico sus datos importantes  
Cuando guardo los cambios  
y la modificación de datos es exitosa  
Entonces la información del coachee se actualiza de forma inmediata en su ficha

### Escenario 3: Archivo de coachee

Dado que el proceso de un coachee ha terminado o es sensible  
Cuando el coach pulsa 'Eliminar' o 'Archivar'  
Entonces el coachee desaparece de la lista activa de clientes

## Tareas a Realizar

- [ ] Desarrollar los formularios de alta y modificación del coachee.
- [ ] Implementar la validación para asegurar el registro de los datos obligatorios.
- [ ] Implementar la función de archivo o eliminación lógica del perfil del coachee (soft delete/archiving) para retirarlo de la lista activa.

# [HU006] Persistencia de datos del proceso - **Coach - Administrar Coachees**

Como coach,  
quiero guardar los datos importantes del coachee y su proceso,  
para tener acceso en cualquier momento.

## Criterios de aceptación

### Escenario 1: Persistencia y acceso a datos

Dado que guardo datos importantes (notas, *uploads*) en el perfil del coachee  
Cuando salgo del sistema y vuelvo a acceder a la ficha del coachee  
Entonces todos los datos guardados son persistentes  
y están disponibles en cualquier momento

### Escenario 2: Seguridad de almacenamiento

Dado que se guardan los datos importantes del coachee y su proceso  
Cuando el sistema almacena estos datos  
Entonces el almacenamiento cumple con los requerimientos de seguridad  
y cifrado

## Tareas a Realizar

- [ ] Diseñar y configurar el almacenamiento persistente para la entidad Coachee y sus archivos adjuntos.
- [ ] Implementar el cifrado de los datos sensibles del coachee en la base de datos.
- [ ] Desarrollar la funcionalidad de gestión de documentos y archivos (*uploads*) en la ficha del coachee.

# [HU007] Consulta y modificación del historial - **Coach - Administrar Coachees**

Como coach,  
quiero tener acceso al historial de mis coachees,  
para hacer consultas y modificaciones.

## Criterios de aceptación

### Escenario 1: Consulta de historial

Dado que estoy en la ficha del coachee  
Cuando accedo al historial  
Entonces la ficha incluye un enlace de acceso al historial de todas las interacciones (sesiones, tests, herramientas)

### Escenario 2: Filtrado del historial

Dado que consulto el historial de interacciones  
Cuando utilizo la herramienta de consulta  
Entonces puedo filtrar o buscar sesiones por fecha  
o por tema

## Tareas a Realizar

- [ ] Desarrollar la vista de Historial Consolidado del coachee (sesiones, tests, herramientas).
- [ ] Implementar la funcionalidad de búsqueda por texto libre y filtrado por fecha dentro del historial.
- [ ] Integrar enlaces directos a las vistas de modificación de sesiones/interacciones pasadas.

# [HU008] Visión general rápida del coachee - **Coach - Administrar Coachees**

Como coach,  
quiero ver en la ficha del coachee palabras clave, anotaciones y resultados relevantes de tests,  
para tener una visión general rápida.

## Criterios de aceptación

### Escenario 1: Visión general rápida

Dado que accedo a la ficha principal del coachee  
Cuando reviso la información  
Entonces la ficha incluye un panel visible y condensado (visión general rápida)  
y se muestran las últimas palabras clave destacadas  
y anotaciones relevantes

### Escenario 2: Resultados de tests

Dado que el coachee ha completado tests y se accede a la visión general rápida  
Cuando reviso los resultados  
Entonces los resultados de los tests más relevantes o recientes se visualizan  
y se incluyen gráficas de evolución si existen

## Tareas a Realizar

- [ ] Diseñar y construir el panel de "Visión Rápida" en la ficha del coachee.
- [ ] Programar la visualización de las palabras clave y anotaciones más recientes.
- [ ] Desarrollar el componente de visualización de resultados de tests, incluyendo la generación de gráficos de evolución.

# [HU009] Anotación ágil en sesión - **Coach - En Sesión**

Como coach,  
quiero anotar datos durante la sesión de manera ágil,  
para evitar distracciones y centrar mi atención en el coachee.

## Criterios de aceptación

### Escenario 1: Rendimiento de anotación

Dado que estoy tomando notas durante la sesión  
Cuando utilizo la interfaz de anotaciones  
Entonces la interfaz tiene un rendimiento optimizado (latencia mínima)  
y puedo escribir sin interrupciones

### Escenario 2: Autoguardado de notas

Dado que estoy en la interfaz de sesión y la "agilidad" no debe resultar en pérdida de información  
Cuando tomo notas  
Entonces las notas se guardan automáticamente cada 15 segundos (o similar)

## Tareas a Realizar

- [ ] Desarrollar el componente de edición de notas con foco en la optimización del rendimiento (tiempo de respuesta bajo).
- [ ] Implementar la funcionalidad de autoguardado asíncrono temporizado (ej. cada 15 segundos o al detectar inactividad).

# [HU010] Creación rápida de planes de acción - **Coach - En Sesión**

Como coach,  
quiero añadir rápidamente planes de acción durante la sesión,  
para documentar las tareas pendientes del coachee.

## Criterios de aceptación

### Escenario 1: Creación rápida de plan de acción

Dado que estoy en la vista de notas  
Cuando pulso un atajo o botón de acceso rápido  
Entonces puedo crear un plan de acción sin salir de la vista de notas

### Escenario 2: Registro de responsabilidad

Dado que estoy añadiendo un plan de acción  
Cuando registro el plan  
Entonces puedo especificar quién es el responsable (coach o coachee)  
y registro la fecha de vencimiento

## Tareas a Realizar

- [ ] Diseñar e implementar el acceso rápido (botón o atajo) al formulario de Plan de Acción dentro de la interfaz de sesión.
- [ ] Desarrollar el formulario de creación de Plan de Acción con campos para responsable y fecha límite.

# [HU011] Acceso a herramientas colaborativas en sesión - **Coach - En Sesión**

Como coach,  
quiero poder acceder a herramientas durante la sesión,  
para rellenarlas con el coachee.

## Criterios de aceptación

### Escenario 1: Uso de herramienta colaborativa

Dado que estoy en una sesión en curso  
Cuando selecciono una herramienta de la biblioteca  
Entonces esta se abre en la interfaz y puedo rellenarla colaborativamente con el coachee

### Escenario 2: Guardado de herramienta

Dado que he rellenado una herramienta  
Cuando finalizo la herramienta  
Entonces la herramienta completada se guarda  
y se asocia inmediatamente a la sesión actual

## Tareas a Realizar

- [ ] Desarrollar un *viewer* de herramientas dentro de la interfaz de sesión.
- [ ] Implementar la funcionalidad para que el coach seleccione y abra herramientas desde la biblioteca.
- [ ] Programar el guardado de la herramienta completada y su asociación al registro de la sesión en curso.

# [HU012] Ejecución de tests en tiempo real - **Coach - En Sesión**

Como coach,  
quiero poder acceder a tests durante la sesión,  
para que el coachee pueda completarlos.

## Criterios de aceptación

### Escenario 1: Ejecución de test en tiempo real

Dado que estoy en una sesión  
Cuando envío un test al coachee  
Entonces el coachee puede completarlo en tiempo real en su interfaz

### Escenario 2: Corrección y resultados automáticos

Dado que el coachee ha completado el test  
Cuando el test finaliza  
Entonces la herramienta se corrige automáticamente  
y los resultados se muestran al coach

## Tareas a Realizar

- [ ] Implementar la funcionalidad de envío/inicio de tests al coachee en tiempo real (en sesión online).
- [ ] Desarrollar la lógica de corrección automática de tests.
- [ ] Programar la visualización instantánea de los resultados del test para el coach.

# [HU013] Reloj de tiempo restante y control de fase - **Coach - En Sesión**

Como coach,  
quiero tener un reloj que marque el tiempo restante de sesión,  
para usarlo de guía en las fases de la sesión.

## Criterios de aceptación

### Escenario 1: Visibilidad y control del reloj

Dado que el coach inicia una sesión  
Cuando el reloj se activa y es visible durante la sesión  
Entonces existe un contador regresivo y el coach puede pausar, reanudar y reajustar el tiempo restante según sea necesario

### Escenario 2: Configuración del tiempo

Dado que voy a iniciar una sesión  
Cuando configuro la duración acordada de la sesión  
Entonces el reloj es configurable al inicio de la sesión  
y refleja la duración acordada

## Tareas a Realizar

- [ ] Desarrollar el componente de contador regresivo (reloj) para la interfaz de sesión.
- [ ] Implementar la función de configuración de la duración inicial.
- [ ] Desarrollar las funciones de control: pausar, reanudar y editar el tiempo restante.

# [HU014] Etiquetado emocional y anímico - **Coach - En Sesión**

Como coach,  
quiero poder anotar las reacciones y emociones del coache en ciertos momentos de la sesión,  
para tener información anímica relacionada con los temas tratados.

## Criterios de aceptación

### Escenario 1: Etiquetado emocional durante la sesión

Dado que el coachee tiene una reacción o emoción notable  
Cuando el sistema permite adjuntar una etiqueta de emoción (ej. alegría, frustración, reflexión) a una nota  
o a un momento específico de la línea de tiempo  
Entonces la información anímica queda relacionada con los temas tratados

### Escenario 2: Revisión de emociones en el resumen

Dado que accedo al resumen post sesión  
Cuando reviso las anotaciones  
Entonces las anotaciones emocionales son visibles

## Tareas a Realizar

- [ ] Definir la taxonomía de etiquetas de reacciones/emociones.
- [ ] Desarrollar la funcionalidad para asociar una etiqueta emocional a una entrada de nota con un *timestamp* específico.
- [ ] Asegurar la persistencia y visualización de estas etiquetas en la vista de resumen posterior.

# [HU016] Acceso rápido a preparación y resumen anterior - **Coach - En Sesión**

Como coach,  
quiero poder acceder al resumen de la sesión anterior y los datos de la preparación de la sesión de manera rápida,  
para refrescar información relevante durante la sesión.

## Criterios de aceptación

### Escenario 1: Acceso rápido a información previa

Dado que estoy en la interfaz de sesión  
Cuando intento acceder al resumen de la sesión anterior y a los datos de la preparación de la sesión  
Entonces ambos elementos son accesibles con un máximo de un clic  
o son visibles en un panel lateral

### Escenario 2: Rendimiento de carga de datos previos

Dado que se carga el resumen de la sesión anterior y los datos de preparación  
Cuando el sistema procesa la solicitud  
Entonces la carga de esta información se realiza con un tiempo de respuesta inferior a 500 milisegundos

## Tareas a Realizar

- [ ] Diseñar e implementar un panel o sección de acceso rápido para la información de preparación y la última sesión.
- [ ] Optimizar las consultas de la base de datos para garantizar la carga rápida (menos de 500ms).

# [HU017] Consulta de historial durante la sesión - **Coach - En Sesión**

Como coach,  
quiero tener acceso al historial de sesiones del coachee durante la sesión,  
para ver evolución e incongruencias.

## Criterios de aceptación

### Escenario 1: Consulta del historial en sesión

Dado que estoy en la vista de la sesión en curso  
Cuando accedo al historial del coachee  
Entonces el historial completo del coachee (incluyendo notas y resúmenes) puede ser consultado dentro de la vista de la sesión

### Escenario 2: Continuidad de notas

Dado que consulto el historial de sesiones  
Cuando vuelvo a tomar notas  
Entonces la consulta del historial no bloquea la capacidad del coach para seguir tomando notas en la sesión actual

## Tareas a Realizar

- [ ] Integrar la vista de consulta del historial de sesiones dentro de la interfaz de la sesión activa.
- [ ] Implementar la carga asíncrona y no modal de la información histórica para no interrumpir el flujo de anotaciones.

# [HU015] Etiquetado rápido de palabras clave - **Coach - En Sesión**

Como coach,  
quiero etiquetar palabras clave y personas durante la sesión,  
para tener un acceso rápido al anotar.

## Criterios de aceptación

### Escenario 1: Etiquetado rápido con caracteres especiales

Dado que estoy tomando notas y el sistema soporta el etiquetado rápido  
Cuando uso un carácter especial (ej. # o @)  
Entonces puedo seleccionar rápidamente palabras clave o personas previamente definidas

### Escenario 2: Indexación de etiquetas

Dado que etiqueto palabras clave y personas durante la sesión  
Cuando la sesión finaliza  
Entonces estas etiquetas se guardan y se indexan para futuras búsquedas

## Tareas a Realizar

- [ ] Desarrollar la funcionalidad de autocompletado/sugerencia de etiquetas al usar caracteres especiales (#, @).
- [ ] Programar la indexación de las palabras clave y personas etiquetadas para la función de búsqueda.
- [ ] Asegurar que el listado de palabras clave/personas se extrae de la lista maestra del coachee (HU 27).

# [HU018] Gestión de fases (ej. GROW) - **Coach - En Sesión**

Como coach,  
quiero poder ir cambiando de fase durante la sesión,  
para seguir modelos tipo GROW.

## Criterios de aceptación

### Escenario 1: Transición entre fases

Dado que estoy en la interfaz de sesión y sigo un modelo (ej. GROW)  
Cuando pulso el mecanismo (ej. botones o desplegable) para cambiar la fase  
Entonces se indica la fase actual de la sesión (ej. de *Goal* a *Reality*)

### Escenario 2: Asociación de notas por fase

Dado que tomo notas durante la sesión  
Cuando cambio de fase  
Entonces todas las notas tomadas quedan asociadas a la fase activa en el momento de la anotación

## Tareas a Realizar

- [ ] Definir la estructura de fases del modelo de coaching (ej. GROW) en la configuración del sistema.
- [ ] Desarrollar el control de cambio de fase visible en la interfaz de sesión.
- [ ] Implementar la lógica para registrar y asociar todas las anotaciones al identificador de la fase activa.

# [HU019] Registro cronológico de notas - **Coach - En Sesión**

Como coach,  
quiero que todo la información que introduzca durante la sesión quede guardada con fecha y hora,  
para tener las notas ordenadas y poder sacar conclusiones.

## Criterios de aceptación

### Escenario 1: Marca de tiempo automática

Dado que introduzco información (notas, planes de acción, cambios de fase) durante la sesión  
Cuando la información se guarda  
Entonces todas las entradas de datos tienen una marca de tiempo (*timestamp*) automática y precisa

### Escenario 2: Orden cronológico

Dado que reviso el registro de la sesión  
Cuando accedo a las notas  
Entonces las notas de la sesión se presentan en estricto orden cronológico para facilitar la extracción de conclusiones

## Tareas a Realizar

- [ ] Configurar el sistema para registrar un *timestamp* automático y preciso en cada inserción de datos.
- [ ] Desarrollar la función de recuperación y visualización de las notas en estricto orden cronológico.

# [HU020] Edición post-sesión de datos - **Coach - Post Sesión**

Como coach,  
quiero poder modificar los datos de la sesión hecha,  
para corregir posibles errores.

## Criterios de aceptación

### Escenario 1: Edición inmediata

Dado que una sesión ha finalizado  
Cuando el coach accede a la vista de edición  
Entonces la funcionalidad de edición de la sesión realizada está disponible inmediatamente después de su finalización

### Escenario 2: Restricción de edición por tiempo

Dado que la sesión fue marcada como 'finalizada'  
y han transcurrido 48 horas (o el plazo definido)  
Cuando el coach intenta modificarla  
Entonces el sistema deniega la edición o solicita un permiso especial

## Tareas a Realizar

- [ ] Desarrollar la interfaz de edición para los datos de una sesión finalizada.
- [ ] Implementar la regla de negocio que restringe la edición de sesiones después de un plazo de 48 horas (o plazo configurable).

# [HU021] Consolidación de datos para resumen - **Coach - Post Sesión**

Como coach,  
quiero tener disponibles los datos de la sesión,  
para hacer un resumen.

## Criterios de aceptación

### Escenario 1: Consolidación de datos

Dado que accedo a la vista de "Resumen Post Sesión"  
Cuando se carga la interfaz  
Entonces todos los datos capturados (notas cronológicas, herramientas rellenadas, tests) se muestran consolidados

### Escenario 2: Extracción de datos para resumen

Dado que necesito redactar el resumen formal  
Cuando reviso los datos consolidados  
Entonces el coach puede copiar fácilmente estas notas

## Tareas a Realizar

- [ ] Desarrollar la vista de consolidación de datos para el "Resumen Post Sesión".
- [ ] Implementar la funcionalidad para exportar o copiar el texto de las notas de la sesión.

# [HU022] Visualización de métricas y desvíos del proceso - **Coach - Post Sesión**

Como coach,  
quiero ver los datos generales del proceso al hacer el resumen,  
para detectar desviaciones.

## Criterios de aceptación

### Escenario 1: Visualización de métricas del proceso

Dado que accedo a la interfaz de resumen post-sesión  
Cuando reviso la interfaz  
Entonces la interfaz de resumen muestra métricas del proceso (ej. número total de sesiones, avance hacia el objetivo principal del coachee)

### Escenario 2: Comparación de progreso

Dado que estoy haciendo el resumen  
Cuando accedo a los datos  
Entonces el coach puede comparar el progreso de la sesión actual con los objetivos definidos al inicio del proceso

## Tareas a Realizar

- [ ] Desarrollar la lógica de cálculo y extracción de métricas clave del proceso (total de sesiones, progreso del objetivo).
- [ ] Integrar la visualización de estas métricas en la interfaz de resumen post-sesión.

# [HU023] Gestión de listas maestras post-sesión - **Coach - Post Sesión**

Como coach,  
quiero añadir y eliminar palabras y personas clave en el resumen,  
para tenerlas disponibles en la próxima sesión.

## Criterios de aceptación

### Escenario 1: Gestión de listas maestras

Dado que estoy haciendo el resumen post-sesión  
Cuando promuevo cualquier palabra o persona mencionada en las notas o la elimino de la lista  
Entonces la lista maestra de "Palabras Clave" o "Personas Importantes" se actualiza

### Escenario 2: Disponibilidad inmediata de etiquetas

Dado que se han actualizado las palabras clave en el resumen  
Cuando inicio la próxima sesión  
Entonces estas palabras clave están disponibles como etiquetas rápidas

## Tareas a Realizar

- [ ] Desarrollar la funcionalidad de gestión (CRUD) para las listas maestras de Palabras Clave y Personas Importantes.
- [ ] Implementar la lógica de sincronización para que las listas actualizadas se reflejen en la herramienta de etiquetado rápido de la próxima sesión (HU 17).

# [HU023B] Edición de etiquetas clave en pre-sesión - **Coach - Pre Sesión**

Como coach,  
quiero modificar las palabras y personas importantes,  
para usarlas más rápidamente durante la sesión.

## Criterios de aceptación

### Escenario 1: Edición de etiquetas en pre-sesión

Dado que estoy en la fase de "Pre Sesión"  
Cuando accedo a la gestión de palabras clave separada y modifico las etiquetas  
Entonces se permite la edición/adición/eliminación de las etiquetas

### Escenario 2: Aplicación de cambios a la sesión

Dado que he modificado las palabras clave antes de la sesión  
Cuando inicio la sesión  
Entonces la modificación realizada se aplica inmediatamente al sistema de etiquetado rápido disponible durante la sesión

## Tareas a Realizar

- [ ] Integrar la gestión CRUD para Palabras Clave y Personas Importantes en la interfaz de Pre Sesión.
- [ ] Desarrollar el mecanismo de actualización en tiempo real de la lista de sugerencias de etiquetado (autocompletado) utilizada durante la sesión (HU 17).

# [HU024] Gestión de Próximos Pasos (Post-Sesión) - **Coach - Post Sesión**

Como coach,  
quiero añadir, modificar y eliminar los próximos pasos a seguir,  
para organizar próximas sesiones.

## Criterios de aceptación

### Escenario 1: Gestión de Próximos Pasos (CRUD)

Dado que estoy en la sección de resumen  
Cuando defino los planes de acción o tareas a realizar  
Entonces puedo gestionar la lista de tareas pendientes (Próximos Pasos) con operaciones CRUD (crear, modificar, eliminar)

### Escenario 2: Asociación a sesiones futuras

Dado que defino un "Próximo Paso"  
Cuando planifico la sesión subsecuente  
Entonces el "Próximo Paso" se asocia automáticamente a la sesión planificada subsecuente

## Tareas a Realizar

- [ ] Desarrollar el módulo de gestión CRUD para "Próximos Pasos" en la vista de resumen.
- [ ] Implementar la lógica para vincular automáticamente los Próximos Pasos a la siguiente sesión agendada.

# [HU025] Agendamiento de acciones internas del coach - **Coach - Post Sesión**

Como coach,  
quiero agendar acciones a realizar yo hacia el coachee,  
para provocar reacciones de cara a la próxima sesión.

## Criterios de aceptación

### Escenario 1: Creación de tareas internas

Dado que defino una nueva acción en el resumen post-sesión  
Cuando la asigno a mi rol de "Coach"  
Entonces esta acción aparece en mi lista de tareas y no es visible para el coachee

### Escenario 2: Sincronización de tareas internas

Dado que he agendado una acción como coach  
Cuando reviso mi calendario (si está configurado)  
Entonces la tarea se sincroniza y aparece en mi agenda

## Tareas a Realizar

- [ ] Desarrollar el formulario para crear tareas internas y asignarlas al rol de "Coach".
- [ ] Implementar la integración con el sistema de agenda del coach.
- [ ] Desarrollar una regla de confidencialidad para asegurar que estas tareas no se muestren en la interfaz del Coachee.

# [HU026] Preparación de sesión con notas y resumen anterior - **Coach - Pre Sesión**

Como coach,  
quiero visualizar y modificar el resumen de la última sesión,  
para añadir notas e ideas para la próxima.

## Criterios de aceptación

### Escenario 1: Acceso a la preparación

Dado que estoy en la vista de preparación de la sesión  
Cuando accedo a la información de la sesión anterior  
Entonces el resumen formal de la sesión anterior es visible  
y tengo un campo de notas editable para agregar ideas de preparación

### Escenario 2: Inmutabilidad del resumen anterior

Dado que añado notas e ideas en el campo de preparación  
Cuando reviso el resumen formal de la sesión anterior  
Entonces las modificaciones realizadas en el campo de preparación no alteran el resumen formal ya finalizado

## Tareas a Realizar

- [ ] Desarrollar la vista de "Preparación de Sesión".
- [ ] Mostrar el resumen formal de la sesión previa en modo lectura.
- [ ] Implementar un campo de texto editable exclusivo para "Notas de Preparación" de la sesión futura.
- [ ] Asegurar que la edición en este campo no modifica el registro oficial de la sesión anterior.
