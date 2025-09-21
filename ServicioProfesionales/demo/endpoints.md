
## ESPECIALIDADES
## Crear especialidadaes predeterminadas
POST: http://localhost:8080/especialidades/cargarEspecialidades


## Consultar todas las Especialidades
GET: http://localhost:8080/especialidades

----- 

##  PROFESIONALES

### Crear Profesionales
POST: http://localhost:8080/profesionales/nuevoProfesional

``` json
{
  "nombre": "Gabriel",
  "email": "gabriel@gmail.com",
  "telefono": 123456789,
  "especialidad": 1
}

{
  "nombre": "Pedro",
  "email": "pedro@gmail.com",
  "telefono": 2222222,
  "especialidad": 1
}


{
  "nombre": "Felipe",
  "email": "felipe@gmail.com",
  "telefono": 333333333,
  "especialidad": 2
}

```
### Eliminar un profesional
DELETE: http://localhost:8080/profesionales/{id}

### Actualizar un Profesional
PUT: http://localhost:8080/profesionales/actualizar/{id}
``` json
{
  "nombre": "Gabriel",
  "email": "gabriel@gmail.com",
  "telefono": 351351351
}
``` 
### Consultar todas los Profesionales
GET: http://localhost:8080/profesionales

### Consultar un Profesional
GET: http://localhost:8080/profesionales/{id}

----- 
## TIPOS DE SERVICIOS
### Crear y Agregar un nuevo Servicio a un profesional

PUT http://localhost:8080/profesionales/nuevo-servicio/{id}

``` json
{
  "nombre": "Consulta General",
  "duracion": 45,
  "costo": 2500.0
}
```
### Consultar todos los tipos de servicios

GET http://localhost:8080/tipo-servicio