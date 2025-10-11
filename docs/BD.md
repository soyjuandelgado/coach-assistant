
# Diseño BD


```mermaid
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
}
```