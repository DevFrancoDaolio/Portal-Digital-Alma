-- Provincias
INSERT INTO PROVINCIA (id, nombre) VALUES (1, 'Córdoba');
INSERT INTO PROVINCIA (id, nombre) VALUES (2, 'Buenos Aires');
INSERT INTO PROVINCIA (id, nombre) VALUES (3, 'Santa Fe');
INSERT INTO PROVINCIA (id, nombre) VALUES (4, 'Mendoza');

-- Localidades
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (1, 'Capital', 1);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (2, 'Villa María', 1);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (3, 'La Plata', 2);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (4, 'Mar del Plata', 2);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (5, 'Rosario', 3);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (6, 'Santa Fe', 3);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (7, 'Mendoza Capital', 4);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (8, 'San Rafael', 4);

-- Obras Sociales
INSERT INTO OBRA_SOCIAL (id, nombre) VALUES (1, 'OSDE');
INSERT INTO OBRA_SOCIAL (id, nombre) VALUES (2, 'PAMI');
INSERT INTO OBRA_SOCIAL (id, nombre) VALUES (3, 'Swiss Medical');
INSERT INTO OBRA_SOCIAL (id, nombre) VALUES (4, 'IOMA');
INSERT INTO OBRA_SOCIAL (id, nombre) VALUES (5, 'Medicus');

-- Pacientes de prueba
INSERT INTO PACIENTE (
  id, dni, nombre, apellido, fecha_nacimiento, email, telefono,
  calle, numero, codigo_postal, piso, dpto,
  provincia_id, localidad_id, obra_social_id
) VALUES (
  1, '30123456', 'Lucía', 'González', '1990-03-12', 'lucia.g@example.com', '3511234567',
  'Av. Colón', '1234', '5000', '2', 'B',
  1, 1, 1
);

INSERT INTO PACIENTE (
  id, dni, nombre, apellido, fecha_nacimiento, email, telefono,
  calle, numero, codigo_postal, piso, dpto,
  provincia_id, localidad_id, obra_social_id
) VALUES (
  2, '27876543', 'Martín', 'Pérez', '1982-07-25', 'martin.p@example.com', '2619876543',
  'San Martín', '456', '5500', NULL, NULL,
  4, 7, 2
);
