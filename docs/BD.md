
# Diseño BD

```mermaid
---
title: COACH ASSISTANT
---
erDiagram
    USERS {
        CHAR(36) id PK "UUID"
        VARCHAR email
        VARCHAR password "hashed"
        DATETIME created_at
        DATETIME updated_at
        DATETIME deleted_at
    }
    USER_PROFILES {
        CHAR(36) user_id FK "UUID"
        VARCHAR phone
        VARCHAR address
        DATE birthdate
    }
    USERS ||--o{ USER_PROFILES : has

    CREATE TABLE ROLES (
        CHAR(36) id PRIMARY KEY,         -- UUID
        VARCHAR(50) name UNIQUE NOT NULL, -- 'admin', 'user', 'editor', etc.
        TEXT description
    );

    CREATE TABLE USER_ROLES (
        CHAR(36) user_id, 
        CHAR(36) role_id,
        PRIMARY KEY (user_id, role_id),
        FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE,
        FOREIGN KEY (role_id) REFERENCES ROLES(id) ON DELETE CASCADE
    );

    USERS ||--o{ USER_ROLES }o--|| ROLES
    USERS ||--o{ USER_PROFILES

    SESSION {
        CHAR(36) id PK "UUID"
        DATE date
        INT session_number
        BOOLEAN is_grow
        INT duration_minutes
        VARCHAR(50) location
        VARCHAR(200) goal
        DATETIME created_at
        DATETIME updated_at
        DATETIME deleted_at
        CHAR(36) process_id "UUID"
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
        CHAR(36) id PK UUID
        VARCHAR name
        VARCHAR surname
        VARCHAR middlename
        VARCHAR email
        VARCHAR address
        VARCHAR phone
        DATE birthdate
        VARCHAR dni
        VARCHAR company
        VARCHAR company_role
        VARCHAR company_address
    }

    COACH {
        CHAR(36) id PK
        nombre
        apellido1
        apellido2
        datos
    }

    PROCESS {
        CHAR(36) id PK UUID
        VARCHAR type
        INT duration
        BOOLEAN is_grow
        VARCHAR goal
        DATE start_date
        DATE end_date
        INT frequency_days
        TEXT observations
        FLOAT session_price
        VARCHAR payment_method
        INT payment_term_days
        BOOLEAN contract_signed
        BOOLEAN lodp_signed
        BOOLEAN rgpd_signed
        DATETIME created_at
        DATETIME updated_at
        DATETIME deleted_at
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
