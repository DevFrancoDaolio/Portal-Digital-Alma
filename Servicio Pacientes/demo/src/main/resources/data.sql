---- Provincias
--INSERT INTO PROVINCIA (id, nombre) VALUES (1, 'Córdoba');
--INSERT INTO PROVINCIA (id, nombre) VALUES (2, 'Buenos Aires');
--INSERT INTO PROVINCIA (id, nombre) VALUES (3, 'Santa Fe');
--INSERT INTO PROVINCIA (id, nombre) VALUES (4, 'Mendoza');
--
---- Localidades
--INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (1, 'Capital', 1);
--INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (2, 'Villa María', 1);
--INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (3, 'La Plata', 2);
--INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (4, 'Mar del Plata', 2);
--INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (5, 'Rosario', 3);
--INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (6, 'Santa Fe', 3);
--INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (7, 'Mendoza Capital', 4);
--INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (8, 'San Rafael', 4);


-- Provincias de Argentina (23 provincias + CABA como distrito)
INSERT INTO PROVINCIA (id, nombre) VALUES (1, 'Buenos Aires');
INSERT INTO PROVINCIA (id, nombre) VALUES (2, 'Catamarca');
INSERT INTO PROVINCIA (id, nombre) VALUES (3, 'Chaco');
INSERT INTO PROVINCIA (id, nombre) VALUES (4, 'Chubut');
INSERT INTO PROVINCIA (id, nombre) VALUES (5, 'Córdoba');
INSERT INTO PROVINCIA (id, nombre) VALUES (6, 'Corrientes');
INSERT INTO PROVINCIA (id, nombre) VALUES (7, 'Entre Ríos');
INSERT INTO PROVINCIA (id, nombre) VALUES (8, 'Formosa');
INSERT INTO PROVINCIA (id, nombre) VALUES (9, 'Jujuy');
INSERT INTO PROVINCIA (id, nombre) VALUES (10, 'La Pampa');
INSERT INTO PROVINCIA (id, nombre) VALUES (11, 'La Rioja');
INSERT INTO PROVINCIA (id, nombre) VALUES (12, 'Mendoza');
INSERT INTO PROVINCIA (id, nombre) VALUES (13, 'Misiones');
INSERT INTO PROVINCIA (id, nombre) VALUES (14, 'Neuquén');
INSERT INTO PROVINCIA (id, nombre) VALUES (15, 'Río Negro');
INSERT INTO PROVINCIA (id, nombre) VALUES (16, 'Salta');
INSERT INTO PROVINCIA (id, nombre) VALUES (17, 'San Juan');
INSERT INTO PROVINCIA (id, nombre) VALUES (18, 'San Luis');
INSERT INTO PROVINCIA (id, nombre) VALUES (19, 'Santa Cruz');
INSERT INTO PROVINCIA (id, nombre) VALUES (20, 'Santa Fe');
INSERT INTO PROVINCIA (id, nombre) VALUES (21, 'Santiago del Estero');
INSERT INTO PROVINCIA (id, nombre) VALUES (22, 'Tierra del Fuego');
INSERT INTO PROVINCIA (id, nombre) VALUES (23, 'Tucumán');
INSERT INTO PROVINCIA (id, nombre) VALUES (24, 'Ciudad Autónoma de Buenos Aires');

-- Localidades principales (3 por cada provincia)
-- Provincia 1: Buenos Aires (ejemplos)
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (1, 'La Plata', 1);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (2, 'Mar del Plata', 1);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (3, 'Bahía Blanca', 1);

-- Provincia 2: Catamarca
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (4, 'San Fernando del Valle de Catamarca', 2);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (5, 'Andalgalá', 2);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (6, 'Tinogasta', 2);

-- Provincia 3: Chaco
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (7, 'Resistencia', 3);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (8, 'Sáenz Peña', 3);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (9, 'Villa Ángela', 3);

-- Provincia 4: Chubut
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (10, 'Rawson', 4);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (11, 'Comodoro Rivadavia', 4);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (12, 'Trelew', 4);

-- Provincia 5: Córdoba
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (13, 'Córdoba', 5);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (14, 'Villa María', 5);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (15, 'Río Cuarto', 5);

-- Provincia 6: Corrientes
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (16, 'Corrientes', 6);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (17, 'Resistencia', 6); -- cuidado que “Resistencia” ya usado en Chaco
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (18, 'Goya', 6);

-- Provincia 7: Entre Ríos
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (19, 'Paraná', 7);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (20, 'Concordia', 7);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (21, 'Gualeguaychú', 7);

-- Provincia 8: Formosa
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (22, 'Formosa', 8);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (23, 'Clorinda', 8);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (24, 'Pirané', 8);

-- Provincia 9: Jujuy
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (25, 'San Salvador de Jujuy', 9);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (26, 'Palpalá', 9);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (27, 'Perico', 9);

-- Provincia 10: La Pampa
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (28, 'Santa Rosa', 10);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (29, 'General Pico', 10);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (30, 'Toay', 10);

-- Provincia 11: La Rioja
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (31, 'La Rioja', 11);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (32, 'Chilecito', 11);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (33, 'Villa Unión', 11);

-- Provincia 12: Mendoza
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (34, 'Mendoza', 12);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (35, 'San Rafael', 12);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (36, 'Godoy Cruz', 12);

-- Provincia 13: Misiones
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (37, 'Posadas', 13);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (38, 'Oberá', 13);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (39, 'Eldorado', 13);

-- Provincia 14: Neuquén
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (40, 'Neuquén', 14);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (41, 'Plottier', 14);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (42, 'Cutral Có', 14);

-- Provincia 15: Río Negro
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (43, 'Viedma', 15);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (44, 'Bariloche', 15);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (45, 'General Roca', 15);

-- Provincia 16: Salta
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (46, 'Salta', 16);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (47, 'San Salvador de Jujuy', 16); -- cuidado duplicado de nombre
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (48, 'Tartagal', 16);

-- Provincia 17: San Juan
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (49, 'San Juan', 17);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (50, 'Rawson (SJ)', 17);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (51, 'San Martín (SJ)', 17);

-- Provincia 18: San Luis
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (52, 'San Luis', 18);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (53, 'Villa Mercedes', 18);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (54, 'Merlo', 18);

-- Provincia 19: Santa Cruz
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (55, 'Río Gallegos', 19);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (56, 'Caleta Olivia', 19);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (57, 'El Calafate', 19);

-- Provincia 20: Santa Fe
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (58, 'Santa Fe', 20);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (59, 'Rosario', 20);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (60, 'Reconquista', 20);

-- Provincia 21: Santiago del Estero
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (61, 'Santiago del Estero', 21);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (62, 'La Banda', 21);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (63, 'Termas de Río Hondo', 21);

-- Provincia 22: Tierra del Fuego
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (64, 'Ushuaia', 22);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (65, 'Río Grande', 22);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (66, 'Tolhuin', 22);

-- Provincia 23: Tucumán
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (67, 'San Miguel de Tucumán', 23);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (68, 'Tafí Viejo', 23);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (69, 'Concepción', 23);

-- Provincia 24: CABA (como “provincia” o distrito especial)
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (70, 'Ciudad Autónoma de Buenos Aires', 24);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (71, 'Puerto Madero', 24);
INSERT INTO LOCALIDAD (id, nombre, provincia_id) VALUES (72, 'Recoleta', 24);

-- Obras Sociales
INSERT INTO OBRA_SOCIAL (id, nombre) VALUES (1, 'OSDE');
INSERT INTO OBRA_SOCIAL (id, nombre) VALUES (2, 'PAMI');
INSERT INTO OBRA_SOCIAL (id, nombre) VALUES (3, 'Swiss Medical');
INSERT INTO OBRA_SOCIAL (id, nombre) VALUES (4, 'IOMA');
INSERT INTO OBRA_SOCIAL (id, nombre) VALUES (5, 'Medicus');
INSERT INTO OBRA_SOCIAL (id, nombre) VALUES (0, 'No especifica');

-- Pacientes de prueba
INSERT INTO PACIENTE (
  id, dni, nombre, apellido, fecha_nacimiento, email, telefono,
  calle, numero, codigo_postal, piso, dpto,
  provincia_id, localidad_id, obra_social_id
) VALUES (
  20, '30123456', 'Lucía', 'González', '1990-03-12', 'lucia.g@example.com', '3511234567',
  'Av. Colón', '1234', '5000', '2', 'B',
  1, 1, 1
);

INSERT INTO PACIENTE (
  id, dni, nombre, apellido, fecha_nacimiento, email, telefono,
  calle, numero, codigo_postal, piso, dpto,
  provincia_id, localidad_id, obra_social_id
) VALUES (
  21, '27876543', 'Martín', 'Pérez', '1982-07-25', 'martin.p@example.com', '2619876543',
  'San Martín', '456', '5500', NULL, NULL,
  4, 7, 2
);
