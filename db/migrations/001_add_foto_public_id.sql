-- Tu base ya existe (corriste db/schema.sql en el paso anterior) y le falta
-- esta columna, necesaria para poder borrar la foto vieja en Cloudinary
-- cuando se reemplaza desde el panel. Corre esto una vez contra tu Neon.

ALTER TABLE colaboradores ADD COLUMN IF NOT EXISTS foto_public_id TEXT;
