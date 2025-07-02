USE finca_cheona;

-- Actualizar nombres con caracteres especiales
UPDATE alojamientos SET nombre = 'Cabaña Miyacuree' WHERE id = 11;
UPDATE alojamientos SET nombre = 'Glamping Rústico' WHERE id = 12;

-- Actualizar descripciones con tildes
UPDATE alojamientos SET descripcion = 'Alojamiento íntimo y cómodo, perfecto para parejas que buscan un espacio romántico en contacto con la naturaleza.' WHERE id = 11;
UPDATE alojamientos SET descripcion = 'Una experiencia de camping con estilo y confort. Ideal para quienes desean disfrutar de la naturaleza sin renunciar a las comodidades.' WHERE id = 12;

-- Actualizar comodidades con tildes
UPDATE alojamientos SET comodidades = '["Jacuzzi privado","Baño amplio","Cama doble","Nevera","Balcón exterior con mesa y sofá","Zona exterior con cocina"]' WHERE id = 11;
UPDATE alojamientos SET comodidades = '["Jacuzzi privado","Baño pequeño","Cama doble","Zona exterior con cocina"]' WHERE id = 12;

-- Verificar cambios
SELECT id, nombre, descripcion, comodidades FROM alojamientos;
