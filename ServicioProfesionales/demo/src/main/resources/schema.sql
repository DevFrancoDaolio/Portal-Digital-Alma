CREATE TABLE provincia (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE localidad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    provincia_id INTEGER REFERENCES provincia(id)
);

CREATE TABLE especialidad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE profesional (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    sexo VARCHAR(100),
    cuil VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100),

    telefono VARCHAR(50),
    calle VARCHAR(100),
    numero VARCHAR(20),
    codigo_postal VARCHAR(10),
    piso VARCHAR(10),
    departamento VARCHAR(10),
    activo BOOLEAN DEFAULT TRUE,

    provincia_id INTEGER REFERENCES provincia(id),
    localidad_id INTEGER REFERENCES localidad(id)
);

CREATE TABLE especialidad_profesional (
    id SERIAL PRIMARY KEY,
    profesional_id INTEGER REFERENCES profesional(id),
    especialidad_id INTEGER REFERENCES especialidad(id),
    matricula VARCHAR(50),
    principal BOOLEAN DEFAULT FALSE
);
