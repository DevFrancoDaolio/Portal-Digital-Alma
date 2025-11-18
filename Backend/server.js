import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// 🔷 BASE DE DATOS EN MEMORIA
let consultorios = [
  {
    id: 1,
    numero: '101',
    nombre: 'Consultorio de Cardiología',
    especialidades: ['Cardiología'],
    piso: '1',
    ubicacion: 'Ala Norte',
    estado: 'disponible',
    horariosDisponibles: ['08:00-09:00', '09:00-10:00', '14:00-15:00', '15:00-16:00'],
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: 2,
    numero: '102',
    nombre: 'Consultorio de Pediatría, Psicología',
    especialidades: ['Pediatría', 'Psicología'],
    piso: '1',
    ubicacion: 'Ala Sur',
    estado: 'disponible',
    horariosDisponibles: ['09:00-10:00', '10:00-11:00', '15:00-16:00', '16:00-17:00'],
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: 3,
    numero: '201',
    nombre: 'Consultorio de Kinesiología',
    especialidades: ['Kinesiología'],
    piso: '2',
    ubicacion: 'Ala Norte',
    estado: 'no-disponible',
    horariosDisponibles: ['08:00-09:00', '09:00-10:00'],
    fechaCreacion: new Date().toISOString(),
  },
]

let nextId = 4

// 🔷 BASE DE DATOS EN MEMORIA - PACIENTES
let pacientes = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    dni: '12345678',
    email: 'juan@email.com',
    telefono: '3512345678',
    fechaNacimiento: '1980-05-15',
    calle: 'Avenida San Martín',
    numero: '1050',
    codigoPostal: '5000',
    piso: '2',
    dpto: 'A',
    provinciaId: 1,
    provincianombre: 'Córdoba',
    localidadId: 1,
    localidadnombre: 'Córdoba Capital',
    obraSocialId: 1,
    obraSocialNombre: 'OSDE',
    observaciones: 'Paciente con historial de alergias',
    fechaCreacion: new Date().toISOString(),
  },
]

let profesionales = [
  {
    id: 1,
    nombre: 'Carlos',
    apellido: 'García',
    sexo: 'MASCULINO',
    cuil: '20345678901',
    email: 'carlos.garcia@email.com',
    telefono: '3516789012',
    calle: 'Mitre',
    numero: '500',
    codigoPostal: '5000',
    piso: '3',
    departamento: 'B',
    provinciaNombre: 'Córdoba',
    localidadNombre: 'Córdoba Capital',
    especialidades: [
      { id: 1, nombre: 'Cardiología', matricula: 'MN 12345', esPrincipal: true },
      { id: 2, nombre: 'Clínica Médica', matricula: 'MN 12346', esPrincipal: false },
    ],
    fotoUrl: '/doc1.png',
    activo: true,
    fechaCreacion: new Date().toISOString(),
  },
]

let especialidades = [
  { id: 1, nombre: 'Cardiología' },
  { id: 2, nombre: 'Clínica Médica' },
  { id: 3, nombre: 'Pediatría' },
  { id: 4, nombre: 'Traumatología' },
  { id: 5, nombre: 'Dermatología' },
  { id: 6, nombre: 'Psicología' },
]

let nextProfesionalId = 2
let nextEspecialidadId = 7

// Datos de referencia
const obrasSociales = [
  { id: 1, nombre: 'OSDE' },
  { id: 2, nombre: 'IOMA' },
  { id: 3, nombre: 'PAMI' },
  { id: 4, nombre: 'Swiss MEDICAL' },
  { id: 5, nombre: 'GALENO' },
]

const provincias = [
  { id: 1, nombre: 'Córdoba' },
  { id: 2, nombre: 'Buenos Aires' },
  { id: 3, nombre: 'Santa Fe' },
  { id: 4, nombre: 'Mendoza' },
  { id: 5, nombre: 'Entre Ríos' },
]

const localidadesPorProvincia = {
  1: [
    { id: 1, nombre: 'Córdoba Capital' },
    { id: 2, nombre: 'La Calera' },
    { id: 3, nombre: 'Villa María' },
  ],
  2: [
    { id: 4, nombre: 'La Plata' },
    { id: 5, nombre: 'Mar del Plata' },
    { id: 6, nombre: 'Bahía Blanca' },
  ],
  3: [
    { id: 7, nombre: 'Rosario' },
    { id: 8, nombre: 'Santa Fe' },
    { id: 9, nombre: 'Paraná' },
  ],
}

let nextPacienteId = 2

// 🔷 BASE DE DATOS EN MEMORIA - TURNOS
let turnos = [
  {
    id: 1,
    fecha: '2025-01-13',
    horaInicio: '09:00',
    horaFin: '10:00',
    pacienteId: 1,
    paciente: 'Juan Pérez',
    profesionalId: 1,
    profesional: 'Dr/a. García',
    especialidadId: 1,
    especialidad: 'Cardiología',
    consultorioId: 1,
    consultorio: '101',
    estado: 'confirmado',
    motivoConsulta: 'Consulta rutinaria',
    fechaCreacion: new Date().toISOString(),
  },
]

let nextTurnoId = 2

// 🔷 BASE DE DATOS EN MEMORIA - USUARIOS
let usuarios = [
  {
    id: 1,
    nombre: 'Admin',
    apellido: 'Sistema',
    email: 'admin@consultorio.com',
    password: 'admin123', // En producción usar bcrypt
    rol: 'secretaria',
    activo: true,
    fechaCreacion: new Date().toISOString(),
  },
]

let nextUsuarioId = 2

// 🔷 RUTAS API CONSULTORIOS

// GET: Obtener todos los consultorios
app.get('/api/consultorios', (req, res) => {
  res.json({
    success: true,
    data: consultorios,
  })
})

// GET: Obtener un consultorio por ID
app.get('/api/consultorios/:id', (req, res) => {
  const { id } = req.params
  const consultorio = consultorios.find((c) => c.id === Number(id))

  if (!consultorio) {
    return res.status(404).json({
      success: false,
      message: 'Consultorio no encontrado',
    })
  }

  res.json({
    success: true,
    data: consultorio,
  })
})

// POST: Crear nuevo consultorio
app.post('/api/consultorios', (req, res) => {
  const { numero, nombre, especialidades, piso, ubicacion, horariosDisponibles } = req.body

  // Validación
  if (!numero || !especialidades || especialidades.length === 0 || !piso || !ubicacion || !horariosDisponibles || horariosDisponibles.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos requeridos',
    })
  }

  const nuevoConsultorio = {
    id: nextId++,
    numero,
    nombre,
    especialidades,
    piso,
    ubicacion,
    estado: 'disponible',
    horariosDisponibles,
    fechaCreacion: new Date().toISOString(),
  }

  consultorios.push(nuevoConsultorio)

  res.status(201).json({
    success: true,
    message: 'Consultorio creado exitosamente',
    data: nuevoConsultorio,
  })
})

// PUT: Actualizar consultorio
app.put('/api/consultorios/:id', (req, res) => {
  const { id } = req.params
  const { numero, nombre, especialidades, piso, ubicacion, horariosDisponibles } = req.body

  const consultorio = consultorios.find((c) => c.id === Number(id))

  if (!consultorio) {
    return res.status(404).json({
      success: false,
      message: 'Consultorio no encontrado',
    })
  }

  // Actualizar campos
  if (numero) consultorio.numero = numero
  if (nombre) consultorio.nombre = nombre
  if (especialidades) consultorio.especialidades = especialidades
  if (piso) consultorio.piso = piso
  if (ubicacion) consultorio.ubicacion = ubicacion
  if (horariosDisponibles) consultorio.horariosDisponibles = horariosDisponibles

  consultorio.fechaModificacion = new Date().toISOString()

  res.json({
    success: true,
    message: 'Consultorio actualizado exitosamente',
    data: consultorio,
  })
})

// PATCH: Cambiar estado del consultorio
app.patch('/api/consultorios/:id/estado', (req, res) => {
  const { id } = req.params
  const { estado, tipoBaja } = req.body

  const consultorio = consultorios.find((c) => c.id === Number(id))

  if (!consultorio) {
    return res.status(404).json({
      success: false,
      message: 'Consultorio no encontrado',
    })
  }

  consultorio.estado = estado
  if (tipoBaja) consultorio.tipoBaja = tipoBaja
  consultorio.fechaModificacion = new Date().toISOString()

  res.json({
    success: true,
    message: 'Estado del consultorio actualizado',
    data: consultorio,
  })
})

// DELETE: Eliminar consultorio
app.delete('/api/consultorios/:id', (req, res) => {
  const { id } = req.params

  const index = consultorios.findIndex((c) => c.id === Number(id))

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Consultorio no encontrado',
    })
  }

  const consultorioEliminado = consultorios.splice(index, 1)

  res.json({
    success: true,
    message: 'Consultorio eliminado exitosamente',
    data: consultorioEliminado[0],
  })
})

// 🔷 RUTAS API PACIENTES

// GET: Obtener todos los pacientes
app.get('/api/pacientes', (req, res) => {
  res.json({
    success: true,
    data: pacientes,
  })
})

// GET: Obtener un paciente por ID
app.get('/api/pacientes/:id', (req, res) => {
  const { id } = req.params
  const paciente = pacientes.find((p) => p.id === Number(id))

  if (!paciente) {
    return res.status(404).json({
      success: false,
      message: 'Paciente no encontrado',
    })
  }

  res.json({
    success: true,
    data: paciente,
  })
})

// POST: Crear nuevo paciente
app.post('/api/pacientes', (req, res) => {
  const {
    nombre,
    apellido,
    dni,
    email,
    telefono,
    fechaNacimiento,
    calle,
    numero,
    codigoPostal,
    piso,
    dpto,
    provinciaId,
    localidadId,
    obraSocialId,
    observaciones,
  } = req.body

  // Validación - Verificar DNI único
  const dniExistente = pacientes.find((p) => p.dni === dni)
  if (dniExistente) {
    return res.status(400).json({
      success: false,
      message: 'Ya existe un paciente con este DNI',
    })
  }

  // Validación de campos requeridos
  if (!nombre || !apellido || !dni || !email || !fechaNacimiento || !provinciaId || !localidadId || !obraSocialId) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos requeridos',
    })
  }

  const provincia = provincias.find((p) => p.id === Number(provinciaId))
  const localidad = localidadesPorProvincia[provinciaId]?.find((l) => l.id === Number(localidadId))
  const obraSocial = obrasSociales.find((o) => o.id === Number(obraSocialId))

  const nuevoPaciente = {
    id: nextPacienteId++,
    nombre,
    apellido,
    dni,
    email,
    telefono: telefono || null,
    fechaNacimiento,
    calle: calle || null,
    numero: numero || null,
    codigoPostal: codigoPostal || null,
    piso: piso || null,
    dpto: dpto || null,
    provinciaId: Number(provinciaId),
    provinciaNombre: provincia?.nombre || '',
    localidadId: Number(localidadId),
    localidadNombre: localidad?.nombre || '',
    obraSocialId: Number(obraSocialId),
    obraSocialNombre: obraSocial?.nombre || '',
    observaciones: observaciones || null,
    fechaCreacion: new Date().toISOString(),
  }

  pacientes.push(nuevoPaciente)

  res.status(201).json({
    success: true,
    message: 'Paciente creado exitosamente',
    data: nuevoPaciente,
  })
})

// PUT: Actualizar paciente
app.put('/api/pacientes/:id', (req, res) => {
  const { id } = req.params
  const {
    nombre,
    apellido,
    email,
    telefono,
    fechaNacimiento,
    calle,
    numero,
    codigoPostal,
    piso,
    dpto,
    provinciaId,
    localidadId,
    obraSocialId,
    observaciones,
  } = req.body

  const paciente = pacientes.find((p) => p.id === Number(id))

  if (!paciente) {
    return res.status(404).json({
      success: false,
      message: 'Paciente no encontrado',
    })
  }

  const provincia = provincias.find((p) => p.id === Number(provinciaId))
  const localidad = localidadesPorProvincia[provinciaId]?.find((l) => l.id === Number(localidadId))
  const obraSocial = obrasSociales.find((o) => o.id === Number(obraSocialId))

  // Actualizar campos
  if (nombre) paciente.nombre = nombre
  if (apellido) paciente.apellido = apellido
  if (email) paciente.email = email
  if (telefono !== undefined) paciente.telefono = telefono
  if (fechaNacimiento) paciente.fechaNacimiento = fechaNacimiento
  if (calle !== undefined) paciente.calle = calle
  if (numero !== undefined) paciente.numero = numero
  if (codigoPostal !== undefined) paciente.codigoPostal = codigoPostal
  if (piso !== undefined) paciente.piso = piso
  if (dpto !== undefined) paciente.dpto = dpto
  if (provinciaId) {
    paciente.provinciaId = Number(provinciaId)
    paciente.provinciaNombre = provincia?.nombre || ''
  }
  if (localidadId) {
    paciente.localidadId = Number(localidadId)
    paciente.localidadNombre = localidad?.nombre || ''
  }
  if (obraSocialId) {
    paciente.obraSocialId = Number(obraSocialId)
    paciente.obraSocialNombre = obraSocial?.nombre || ''
  }
  if (observaciones !== undefined) paciente.observaciones = observaciones

  paciente.fechaModificacion = new Date().toISOString()

  res.json({
    success: true,
    message: 'Paciente actualizado exitosamente',
    data: paciente,
  })
})

// DELETE: Eliminar paciente
app.delete('/api/pacientes/:id', (req, res) => {
  const { id } = req.params

  const index = pacientes.findIndex((p) => p.id === Number(id))

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Paciente no encontrado',
    })
  }

  const pacienteEliminado = pacientes.splice(index, 1)

  res.json({
    success: true,
    message: 'Paciente eliminado exitosamente',
    data: pacienteEliminado[0],
  })
})

// 🔷 RUTAS API PROFESIONALES
// GET: Obtener todos los profesionales
app.get('/api/profesionales', (req, res) => {
  res.json({
    success: true,
    data: profesionales,
  })
})

// GET: Obtener un profesional por ID
app.get('/api/profesionales/:id', (req, res) => {
  const { id } = req.params
  const profesional = profesionales.find((p) => p.id === Number(id))

  if (!profesional) {
    return res.status(404).json({
      success: false,
      message: 'Profesional no encontrado',
    })
  }

  res.json({
    success: true,
    data: profesional,
  })
})

// POST: Crear nuevo profesional
app.post('/api/profesionales', (req, res) => {
  const {
    nombre,
    apellido,
    sexo,
    cuil,
    email,
    telefono,
    calle,
    numero,
    codigoPostal,
    piso,
    departamento,
    provinciaNombre,
    localidadNombre,
    especialidadesConMatricula,
    fotoUrl,
  } = req.body

  // Validación de CUIL único
  const cuilExistente = profesionales.find((p) => p.cuil === cuil)
  if (cuilExistente) {
    return res.status(400).json({
      success: false,
      message: 'Ya existe un profesional con este CUIL',
    })
  }

  // Validación de campos requeridos
  if (!nombre || !apellido || !sexo || !cuil || !email || !provinciaNombre || !localidadNombre || !especialidadesConMatricula || especialidadesConMatricula.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos requeridos',
    })
  }

  // Procesar especialidades
  const especialidadesFormateadas = especialidadesConMatricula.map((esp) => ({
    id: esp.especialidadId,
    nombre: especialidades.find((e) => e.id === esp.especialidadId)?.nombre || '',
    matricula: esp.matricula,
    esPrincipal: esp.esPrincipal,
  }))

  const nuevoProfesional = {
    id: nextProfesionalId++,
    nombre,
    apellido,
    sexo,
    cuil,
    email,
    telefono: telefono || null,
    calle: calle || null,
    numero: numero || null,
    codigoPostal: codigoPostal || null,
    piso: piso || null,
    departamento: departamento || null,
    provinciaNombre,
    localidadNombre,
    especialidades: especialidadesFormateadas,
    fotoUrl: fotoUrl || '/doc1.png',
    activo: true,
    fechaCreacion: new Date().toISOString(),
  }

  profesionales.push(nuevoProfesional)

  res.status(201).json({
    success: true,
    message: 'Profesional creado exitosamente',
    data: nuevoProfesional,
  })
})

// PUT: Actualizar profesional
app.put('/api/profesionales/:id', (req, res) => {
  const { id } = req.params
  const {
    nombre,
    apellido,
    email,
    telefono,
    calle,
    numero,
    codigoPostal,
    piso,
    departamento,
    provinciaNombre,
    localidadNombre,
    especialidadesConMatricula,
    fotoUrl,
  } = req.body

  const profesional = profesionales.find((p) => p.id === Number(id))

  if (!profesional) {
    return res.status(404).json({
      success: false,
      message: 'Profesional no encontrado',
    })
  }

  // Actualizar campos
  if (nombre) profesional.nombre = nombre
  if (apellido) profesional.apellido = apellido
  if (email) profesional.email = email
  if (telefono !== undefined) profesional.telefono = telefono
  if (calle !== undefined) profesional.calle = calle
  if (numero !== undefined) profesional.numero = numero
  if (codigoPostal !== undefined) profesional.codigoPostal = codigoPostal
  if (piso !== undefined) profesional.piso = piso
  if (departamento !== undefined) profesional.departamento = departamento
  if (provinciaNombre) profesional.provinciaNombre = provinciaNombre
  if (localidadNombre) profesional.localidadNombre = localidadNombre
  if (especialidadesConMatricula) {
    profesional.especialidades = especialidadesConMatricula.map((esp) => ({
      id: esp.especialidadId,
      nombre: especialidades.find((e) => e.id === esp.especialidadId)?.nombre || '',
      matricula: esp.matricula,
      esPrincipal: esp.esPrincipal,
    }))
  }
  if (fotoUrl !== undefined) profesional.fotoUrl = fotoUrl || '/doc1.png'

  profesional.fechaModificacion = new Date().toISOString()

  res.json({
    success: true,
    message: 'Profesional actualizado exitosamente',
    data: profesional,
  })
})

// PUT: Dar de baja profesional
app.put('/api/profesionales/:id/dar-de-baja', (req, res) => {
  const { id } = req.params
  const profesional = profesionales.find((p) => p.id === Number(id))

  if (!profesional) {
    return res.status(404).json({
      success: false,
      message: 'Profesional no encontrado',
    })
  }

  profesional.activo = false
  profesional.fechaBaja = new Date().toISOString()

  res.json({
    success: true,
    message: 'Profesional dado de baja exitosamente',
    data: profesional,
  })
})

// PUT: Reactivar profesional
app.put('/api/profesionales/:id/reactivar', (req, res) => {
  const { id } = req.params
  const profesional = profesionales.find((p) => p.id === Number(id))

  if (!profesional) {
    return res.status(404).json({
      success: false,
      message: 'Profesional no encontrado',
    })
  }

  profesional.activo = true
  profesional.fechaReactivacion = new Date().toISOString()

  res.json({
    success: true,
    message: 'Profesional reactivado exitosamente',
    data: profesional,
  })
})

// 🔷 RUTAS API ESPECIALIDADES
// GET: Obtener todas las especialidades
app.get('/api/especialidades', (req, res) => {
  res.json({
    success: true,
    data: especialidades,
  })
})

// POST: Crear nueva especialidad
app.post('/api/especialidades', (req, res) => {
  const { nombre } = req.body

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'El nombre de la especialidad es requerido',
    })
  }

  // Verificar que no exista
  const existente = especialidades.find((e) => e.nombre.toLowerCase() === nombre.toLowerCase())
  if (existente) {
    return res.status(400).json({
      success: false,
      message: 'La especialidad ya existe',
    })
  }

  const nuevaEspecialidad = {
    id: nextEspecialidadId++,
    nombre: nombre.trim(),
  }

  especialidades.push(nuevaEspecialidad)

  res.status(201).json({
    success: true,
    message: 'Especialidad creada exitosamente',
    data: nuevaEspecialidad,
  })
})

// GET: Obtener obras sociales
app.get('/api/referencia/obras-sociales', (req, res) => {
  res.json({
    success: true,
    data: obrasSociales,
  })
})

// GET: Obtener provincias
app.get('/api/referencia/provincias', (req, res) => {
  res.json({
    success: true,
    data: provincias,
  })
})

// GET: Obtener localidades por provincia
app.get('/api/referencia/localidades/:provinciaId', (req, res) => {
  const { provinciaId } = req.params
  const localidades = localidadesPorProvincia[provinciaId] || []

  res.json({
    success: true,
    data: localidades,
  })
})

// 🔷 RUTAS API TURNOS
// GET: Obtener todos los turnos
app.get('/api/turnos', (req, res) => {
  res.json({
    success: true,
    data: turnos,
  })
})

// GET: Obtener un turno por ID
app.get('/api/turnos/:id', (req, res) => {
  const { id } = req.params
  const turno = turnos.find((t) => t.id === Number(id))

  if (!turno) {
    return res.status(404).json({
      success: false,
      message: 'Turno no encontrado',
    })
  }

  res.json({
    success: true,
    data: turno,
  })
})

// GET: Obtener turnos por fecha
app.get('/api/turnos/fecha/:fecha', (req, res) => {
  const { fecha } = req.params
  const turnosFecha = turnos.filter((t) => t.fecha === fecha)

  res.json({
    success: true,
    data: turnosFecha,
  })
})

// GET: Obtener turnos por profesional y fecha
app.get('/api/turnos/profesional/:profesionalId/fecha/:fecha', (req, res) => {
  const { profesionalId, fecha } = req.params
  const turnosProfesional = turnos.filter((t) => t.profesionalId === Number(profesionalId) && t.fecha === fecha)

  res.json({
    success: true,
    data: turnosProfesional,
  })
})

// POST: Crear nuevo turno
app.post('/api/turnos', (req, res) => {
  const {
    fecha,
    horaInicio,
    horaFin,
    pacienteId,
    profesionalId,
    especialidadId,
    consultorioId,
    motivoConsulta,
  } = req.body

  // Validación de campos requeridos
  if (!fecha || !horaInicio || !horaFin || !pacienteId || !profesionalId || !especialidadId || !consultorioId) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos requeridos',
    })
  }

  // Validar que no exista turno en la misma hora para el mismo profesional
  const turnoExistente = turnos.find(
    (t) => t.fecha === fecha && t.horaInicio === horaInicio && t.profesionalId === Number(profesionalId),
  )

  if (turnoExistente) {
    return res.status(400).json({
      success: false,
      message: 'El profesional ya tiene un turno en esa hora',
    })
  }

  // Obtener datos relacionados
  const paciente = pacientes.find((p) => p.id === Number(pacienteId))
  const profesional = profesionales.find((p) => p.id === Number(profesionalId))
  const especialidad = especialidades.find((e) => e.id === Number(especialidadId))
  const consultorio = consultorios.find((c) => c.id === Number(consultorioId))

  if (!paciente || !profesional || !especialidad || !consultorio) {
    return res.status(400).json({
      success: false,
      message: 'Datos relacionados no válidos',
    })
  }

  const nuevoTurno = {
    id: nextTurnoId++,
    fecha,
    horaInicio,
    horaFin,
    pacienteId: Number(pacienteId),
    paciente: `${paciente.nombre} ${paciente.apellido}`,
    profesionalId: Number(profesionalId),
    profesional: `Dr/a. ${profesional.apellido}`,
    especialidadId: Number(especialidadId),
    especialidad: especialidad.nombre,
    consultorioId: Number(consultorioId),
    consultorio: consultorio.numero,
    estado: 'confirmado',
    motivoConsulta: motivoConsulta || null,
    fechaCreacion: new Date().toISOString(),
  }

  turnos.push(nuevoTurno)

  res.status(201).json({
    success: true,
    message: 'Turno creado exitosamente',
    data: nuevoTurno,
  })
})

// PUT: Actualizar turno
app.put('/api/turnos/:id', (req, res) => {
  const { id } = req.params
  const { fecha, horaInicio, horaFin, pacienteId, profesionalId, especialidadId, consultorioId, motivoConsulta } =
    req.body

  const turno = turnos.find((t) => t.id === Number(id))

  if (!turno) {
    return res.status(404).json({
      success: false,
      message: 'Turno no encontrado',
    })
  }

  // Validar que no exista otro turno en la misma hora para el mismo profesional
  if (fecha || horaInicio || profesionalId) {
    const turnoConflicto = turnos.find(
      (t) =>
        t.id !== Number(id) &&
        t.fecha === (fecha || turno.fecha) &&
        t.horaInicio === (horaInicio || turno.horaInicio) &&
        t.profesionalId === (Number(profesionalId) || turno.profesionalId),
    )

    if (turnoConflicto) {
      return res.status(400).json({
        success: false,
        message: 'El profesional ya tiene un turno en esa hora',
      })
    }
  }

  // Obtener datos relacionados si se actualizan
  let paciente = pacientes.find((p) => p.id === turno.pacienteId)
  let profesional = profesionales.find((p) => p.id === turno.profesionalId)
  let especialidad = especialidades.find((e) => e.id === turno.especialidadId)
  let consultorio = consultorios.find((c) => c.id === turno.consultorioId)

  if (pacienteId) {
    paciente = pacientes.find((p) => p.id === Number(pacienteId))
    if (!paciente) {
      return res.status(400).json({ success: false, message: 'Paciente no válido' })
    }
  }

  if (profesionalId) {
    profesional = profesionales.find((p) => p.id === Number(profesionalId))
    if (!profesional) {
      return res.status(400).json({ success: false, message: 'Profesional no válido' })
    }
  }

  if (especialidadId) {
    especialidad = especialidades.find((e) => e.id === Number(especialidadId))
    if (!especialidad) {
      return res.status(400).json({ success: false, message: 'Especialidad no válida' })
    }
  }

  if (consultorioId) {
    consultorio = consultorios.find((c) => c.id === Number(consultorioId))
    if (!consultorio) {
      return res.status(400).json({ success: false, message: 'Consultorio no válido' })
    }
  }

  // Actualizar campos
  if (fecha) turno.fecha = fecha
  if (horaInicio) turno.horaInicio = horaInicio
  if (horaFin) turno.horaFin = horaFin
  if (pacienteId) {
    turno.pacienteId = Number(pacienteId)
    turno.paciente = `${paciente.nombre} ${paciente.apellido}`
  }
  if (profesionalId) {
    turno.profesionalId = Number(profesionalId)
    turno.profesional = `Dr/a. ${profesional.apellido}`
  }
  if (especialidadId) {
    turno.especialidadId = Number(especialidadId)
    turno.especialidad = especialidad.nombre
  }
  if (consultorioId) {
    turno.consultorioId = Number(consultorioId)
    turno.consultorio = consultorio.numero
  }
  if (motivoConsulta !== undefined) turno.motivoConsulta = motivoConsulta

  turno.fechaModificacion = new Date().toISOString()

  res.json({
    success: true,
    message: 'Turno actualizado exitosamente',
    data: turno,
  })
})

// PATCH: Cambiar estado del turno
app.patch('/api/turnos/:id/estado', (req, res) => {
  const { id } = req.params
  const { estado } = req.body

  const turno = turnos.find((t) => t.id === Number(id))

  if (!turno) {
    return res.status(404).json({
      success: false,
      message: 'Turno no encontrado',
    })
  }

  turno.estado = estado
  turno.fechaModificacion = new Date().toISOString()

  res.json({
    success: true,
    message: 'Estado del turno actualizado',
    data: turno,
  })
})

// DELETE: Eliminar turno
app.delete('/api/turnos/:id', (req, res) => {
  const { id } = req.params

  const index = turnos.findIndex((t) => t.id === Number(id))

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Turno no encontrado',
    })
  }

  const turnoEliminado = turnos.splice(index, 1)

  res.json({
    success: true,
    message: 'Turno cancelado exitosamente',
    data: turnoEliminado[0],
  })
})

// 🔷 RUTAS API AUTENTICACIÓN

// POST: Registro de usuarios
app.post('/api/auth/registro', (req, res) => {
  const { nombre, apellido, email, password, rol } = req.body

  // Validación
  if (!nombre || !apellido || !email || !password || !rol) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos requeridos',
    })
  }

  // Validar que el email no exista
  const emailExistente = usuarios.find((u) => u.email === email)
  if (emailExistente) {
    return res.status(400).json({
      success: false,
      message: 'Este email ya está registrado',
    })
  }

  // Validar rol
  if (!['profesional', 'secretaria'].includes(rol)) {
    return res.status(400).json({
      success: false,
      message: 'Rol no válido',
    })
  }

  const nuevoUsuario = {
    id: nextUsuarioId++,
    nombre,
    apellido,
    email,
    password, // En producción usar bcrypt
    rol,
    activo: true,
    fechaCreacion: new Date().toISOString(),
  }

  usuarios.push(nuevoUsuario)

  // Devolver usuario sin contraseña
  const { password: _, ...usuarioSinPassword } = nuevoUsuario

  res.status(201).json({
    success: true,
    message: 'Usuario registrado exitosamente',
    data: usuarioSinPassword,
  })
})

// POST: Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body

  // Validación
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email y contraseña son requeridos',
    })
  }

  // Buscar usuario
  const usuario = usuarios.find((u) => u.email === email && u.password === password)

  if (!usuario) {
    return res.status(401).json({
      success: false,
      message: 'Email o contraseña incorrectos',
    })
  }

  if (!usuario.activo) {
    return res.status(401).json({
      success: false,
      message: 'Usuario desactivado',
    })
  }

  // Devolver usuario sin contraseña
  const { password: _, ...usuarioSinPassword } = usuario

  res.json({
    success: true,
    message: 'Sesión iniciada exitosamente',
    data: usuarioSinPassword,
  })
})

// POST: Recuperar contraseña
app.post('/api/auth/recuperar-contrasena', (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'El email es requerido',
    })
  }

  const usuario = usuarios.find((u) => u.email === email)

  if (!usuario) {
    // No revelar si el email existe o no (seguridad)
    return res.json({
      success: true,
      message: 'Si el email existe en nuestro sistema, recibirás un código de recuperación',
    })
  }

  // Simular envío de email con código de recuperación
  // En producción usar un servicio como SendGrid, Nodemailer, etc.
  const codigoRecuperacion = Math.random().toString(36).substring(2, 8).toUpperCase()
  const tokenRecuperacion = {
    email,
    codigo: codigoRecuperacion,
    fechaCreacion: new Date(),
    expiracion: new Date(Date.now() + 15 * 60 * 1000), // 15 minutos
  }

  // En producción guardar en base de datos
  // Por ahora solo simulamos
  console.log(`[EMAIL SIMULADO] Código de recuperación para ${email}: ${codigoRecuperacion}`)

  res.json({
    success: true,
    message: 'Se ha enviado un código de recuperación al email',
    // En producción no devolver el código
    debug: codigoRecuperacion,
  })
})

// GET: Validar sesión
app.get('/api/auth/me', (req, res) => {
  // En producción usar JWT tokens
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No autorizado',
    })
  }

  // En producción verificar JWT
  res.json({
    success: true,
    message: 'Sesión válida',
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API running' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`)
})
