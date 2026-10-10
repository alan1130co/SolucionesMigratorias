-- Esquema inicial del validador de colaboradores.
-- Correr una sola vez contra la base de Neon (psql, Neon SQL editor, etc.).

-- =========================================
-- 1. Colaboradores
-- =========================================
CREATE TABLE IF NOT EXISTS colaboradores (
  id          BIGSERIAL PRIMARY KEY,
  codigo      TEXT NOT NULL UNIQUE,
  nombre      TEXT NOT NULL,
  area        TEXT NOT NULL,
  foto_url       TEXT,
  foto_public_id TEXT, -- id de Cloudinary, se usa para borrar la foto vieja al reemplazarla
  activo      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_colaboradores_codigo ON colaboradores (codigo);

-- =========================================
-- 2. Usuario del panel admin (solo 1, lo crea scripts/seed-admin.ts)
-- =========================================
CREATE TABLE IF NOT EXISTS admin_users (
  id            BIGSERIAL PRIMARY KEY,
  username      TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================
-- 3. Rate limiting del login del panel
-- =========================================
CREATE TABLE IF NOT EXISTS rate_limit_login (
  ip           TEXT PRIMARY KEY,
  attempts     INT NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================
-- 4. Rate limiting de la búsqueda pública (/validar)
-- =========================================
CREATE TABLE IF NOT EXISTS rate_limit_validar (
  ip           TEXT PRIMARY KEY,
  attempts     INT NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now()
);
