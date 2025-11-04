# Coach-Assistant

## 🗂️Tabla de contenidos

- [Coach-Assistant](#coach-assistant)
  - [🗂️Tabla de contenidos](#️tabla-de-contenidos)
  - [📄Objetivo](#objetivo)
    - [Objetivo explicado](#objetivo-explicado)
  - [📄Descripción](#descripción)
    - [Análisis](#análisis)
      - [Epics](#epics)
      - [Kanban](#kanban)
    - [Frontend páginas](#frontend-páginas)
      - [Login](#login)
      - [Coachees](#coachees)
      - [Coachee](#coachee)
      - [Process](#process)
      - [Sesion](#sesion)
        - [Principal](#principal)
        - [Elementos](#elementos)
      - [Resumen](#resumen)
        - [Principal](#principal-1)
        - [Elementos](#elementos-1)
    - [Backend](#backend)
    - [Base de Datos](#base-de-datos)
      - [Usuarios](#usuarios)
      - [Roles](#roles)
      - [Coachees](#coachees-1)
      - [Procesos](#procesos)
      - [Sesiones](#sesiones)
      - [Notas](#notas)
      - [Planes de Acción](#planes-de-acción)
  - [💻Tecnologías Utilizadas](#tecnologías-utilizadas)
    - [Frontend](#frontend)
    - [Backend](#backend-1)
  - [📸 Demo](#-demo)

## 📄Objetivo

Una plataforma para gestión de sesiones de coaching principalmente dirigida a coaches, en la que anotar sea muy rápido e intuitivo (tiempo de escritura + 1 ó 2 clics) y se tenga toda la información disponible en como máximo 3 clics.

### Objetivo explicado

Crear una plataforma digital integral para procesos de coaching, centrada en la eficiencia de la gestión. Se prioriza la fluidez en el uso y facilidad de acceso como objetivo principal del desarrollo.  

Las fases del proceso se tratan de manera fluida, rápida e intuitiva. Se ofrecen herramientas de gestión y anotación rápida, confluencia e integración de los datos y acceso inmediato al historial y datos de valor para el proceso.  

Las herramientas y tests realizados calcularán de manera automática los resultados, ofreciendo métricas sintéticas
que se mostrarán en el historial del coachee.

En resumen, Coach Asistant permite maximizar la recogida de datos y tratarlos con eficiencia logrando agilizar la gestión del proceso.

## 📄Descripción

### Análisis

#### Epics

<img src="docs/images/epics.png" width="500" style="vertical-align: top;">  

#### Kanban

<img src="docs/images/epics-kanban.png" width="500" style="vertical-align: top;">

### Frontend páginas

#### Login

  <img src="docs/images/login.png" width="300" style="vertical-align: top;">

#### Coachees

  <img src="docs/images/coachees.png" width="300" style="vertical-align: top;">

#### Coachee

<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start; margin-top: 1rem;">
  <img src="docs/images/coachee.png" width="300" style="vertical-align: top;">
  <img src="docs/images/coachee2.png" width="300" style="vertical-align: top;">
</div>

#### Process

  <img src="docs/images/process.png" width="300" style="vertical-align: top;">

#### Sesion

##### Principal

<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start; margin-top: 1rem;">
  <img src="docs/images/session1.png" width="300" style="vertical-align: top;">
  <img src="docs/images/session2.png" width="300" style="vertical-align: top;">
</div>

##### Elementos

<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start; margin-top: 1rem;">
  <img src="docs/images/session-notes.png" width="300" style="vertical-align: top;">
  <img src="docs/images/session-menu.png" width="300" style="vertical-align: top;">
  <img src="docs/images/session-emotions.png" width="300" style="vertical-align: top;">
  <img src="docs/images/session-profile.png" width="300" style="vertical-align: top;">
</div>

#### Resumen

##### Principal

<div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start; margin-top: 1rem;">
  <img src="docs/images/summary.png" width="300" style="vertical-align: top;">
  <img src="docs/images/summary-expanded.png" width="300" style="vertical-align: top;">
</div>

##### Elementos

<img src="docs/images/summary-profile.png" width="300" style="vertical-align: top;">


### Backend

### Base de Datos

#### Usuarios

```mermaid
erDiagram
    USERS {
        CHAR(36) id PK "UUID"
        VARCHAR email
        VARCHAR password "hashed"
        BOOLEAN is_active
        DATETIME created_at "NULL"
        DATETIME updated_at "NULL"
        DATETIME deleted_at "NULL"
    }
```

#### Roles

```mermaid
erDiagram
    ROLES {
        CHAR(36) id PK "UUID"
        VARCHAR name
        TEXT description
    }

    USER_ROLES {
        CHAR(36) user_id FK
        CHAR(36) role_id FK
    }

    USERS ||--o{ USER_ROLES : has
    ROLES ||--o{ USER_ROLES : assigned_to
```

#### Coachees

```mermaid
erDiagram
  COACHEES {
    CHAR(36) id PK "UUID"
    VARCHAR name 
    VARCHAR surname 
    VARCHAR middlename "NULL" 
    VARCHAR email "NULL" 
    VARCHAR address "NULL" 
    VARCHAR phone "NULL" 
    DATE birthdate "NULL"
    VARCHAR dni "NULL" 
    VARCHAR company "NULL" 
    VARCHAR company_role "NULL" 
    VARCHAR company_address "NULL" 
    DATETIME created_at "NULL"
    DATETIME updated_at "NULL"
    DATETIME deleted_at "NULL"
    CHAR(36) coach FK
  }

USERS ||--o{ COACHEES : has
```

#### Procesos

```mermaid
erDiagram
  PROCESS {
    CHAR(36) id PK "UUID"
    VARCHAR type 
    INTEGER duration_minutes 
    BOOLEAN is_grow 
    VARCHAR goal "NULL"
    DATE start_date "NULL"
    DATE end_date "NULL"
    INT frequency_days "NULL"
    TEXT observations "NULL"
    FLOAT session_price "NULL"
    VARCHAR payment_method "NULL"
    INT payment_term_days "NULL"
    BOOLEAN contract_signed "NULL"
    BOOLEAN lodp_signed "NULL"
    BOOLEAN rgpd_signed "NULL"
    DATETIME created_at "NULL"
    DATETIME updated_at "NULL"
    DATETIME deleted_at "NULL"
    CHAR(36) coachee_id FK  "UUID"
  }

  COACHEE ||--o{ PROCESS : has
```

#### Sesiones

```mermaid
erDiagram
    SESSION {
        CHAR(36) id PK "UUID"
        DATE date
        INT session_number
        BOOLEAN is_grow
        INT duration_minutes
        VARCHAR(50) location
        VARCHAR(200) goal "NULL"
        DATETIME created_at
        DATETIME updated_at
        DATETIME deleted_at
        CHAR(36) process_id FK "UUID"
    }
    PROCESS ||--o{ SESSION : has
```

#### Notas

```mermaid
erDiagram
    NOTE {
        CHAR(36) id PK "UUID"
        CHAR(2) type
        VARCHAR text
        DATETIME created_at
        DATETIME updated_at
        DATETIME deleted_at
        CHAR(36) id_sesion FK "UUID"
    }
    SESSION ||--o{ NOTE : has
```

#### Planes de Acción

```mermaid
erDiagram
    TASK {
        CHAR(36) id PK "UUID"
        TEXT text
        DATETIME scheduled_at "NULL"
        INT commitment "NULL"
        BOOLEAN done
        DATETIME created_at
        DATETIME updated_at
        DATETIME deleted_at
        CHAR(36) id_sesion FK "UUID"
    }
    SESSION ||--o{ TASK : has
```

## 💻Tecnologías Utilizadas

### Frontend

- [x] HTML
- [x] CSS
- [x] Typescript
- [x] Angular
- [x] Eslint
- [x] Karma / Jasmine
- [x] PrimeNG
- [x] Tailwind

### Backend

- [x] Typescript
- [x] Eslint
- [x] Nest.js
- [x] TypeORM
- [x] Swagger
- [x] Logger
- [x] CORS
- [x] Docker
- [x] JWT
- [x] Passport
- [ ] Jest

## 📸 Demo

[GitHub Pages](https://soyjuandelgado.github.io/coach-assistant)
