
# Diseño BD

```mermaid
---
title: COACH ASSISTANT
---
erDiagram
    USERS {
        CHAR(36) id PK "UUID"
        VARCHAR username
        VARCHAR email
        VARCHAR password "hashed"
        TINYINT is_active
        DATETIME created_at
        DATETIME updated_at
    }
    USER_PROFILES {
        CHAR(36) user_id FK "UUID"
        VARCHAR phone
        VARCHAR address
        DATE birthdate
    }
    USERS ||--o{ USER_PROFILES : has

    SESION {
        INT id_proceso
        CHAR(36) id PK "UUID"
        DATE fecha
        INT num_sesion
        VARCHAR(50) localizacion
        VARCHAR(200) objetivo
    }

    NOTA_SESION {
        CHAR(36) id_sesion PK
        INT id_nota PK
        DATETIME fecha_hora
        TEXT texto
        INT tipo FK
    }

    EMOCION_SESION {
        CHAR(36) id_sesion PK
        INT id_emocion PK
        DATETIME fecha_hora
        TEXT texto
    }

    PLAN_ACCION_SESION {
        CHAR(36) id_sesion PK
        INT id_pda PK
        DATETIME fecha_hora
        TEXT texto
        DATETIME fecha_realizacion
        BOOLEAN hecho
        INT compromiso
    }

    HERRAMIENTA_SESION {
        CHAR(36) id_sesion PK
        INT id_herramienta PK
        DATETIME fecha_hora
        TEXT resultado
        TEXT conclusiones
    }

    DINAMICA_SESION {
        CHAR(36) id_sesion PK
        INT id_dinamica PK
        DATETIME fecha_hora
        TEXT resultado
        TEXT conclusiones
    }

    RESUMEN {
        CHAR(36) id_sesion PK
        INT id PK
        DATETIME fecha_hora
        TEXT aprendizaje
    }

    RESUMEN_PDA_COACH {
        INT id_resumen
        DATETIME fecha_hora
        TEXT descripcion
        DATETIME realizacion
        BOOLEAN hecho
    }

    COACHEE {
        CHAR(36) id PK
        nombre
        apellido1
        apellido2
        datos
    }

    COACH {
        CHAR(36) id PK
        nombre
        apellido1
        apellido2
        datos
    }

    PROCESO {
        INT id PK
        tipo
        duracion_sesion
        VARCHAR(50) metodologia 
    }

    PALABRA {
        id_proceso
        palabra
    }

    PERSONA {
        id_proceso
        nombre
        VARCHAR(50) relacion
    }
    
    PASO {
        id_proceso
        id
        descripcion
        hecho
        BOOLEAN eliminado
    }
```
