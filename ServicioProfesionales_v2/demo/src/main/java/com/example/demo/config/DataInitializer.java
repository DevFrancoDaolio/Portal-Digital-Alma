//package com.example.demo.config;
//
//import com.example.demo.models.entities.*;
//import com.example.demo.repositories.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//@Component
//public class DataInitializer implements CommandLineRunner {
//
//    @Autowired
//    private ProvinciaRepository provinciaRepository;
//
//    @Autowired
//    private LocalidadRepository localidadRepository;
//
//    @Autowired
//    private EspecialidadRepository especialidadRepository;
//
//    @Autowired
//    private ProfesionalRepository profesionalRepository;
//
//    @Autowired
//    private EspecialidadProfesionalRepository especialidadProfesionalRepository;
//
//    @Override
//    public void run(String... args) throws Exception {
//        // Provincias y localidades
//        Provincia cordoba = new Provincia();
//        cordoba.setNombre("Córdoba");
//        provinciaRepository.save(cordoba);
//
//        Localidad capital = new Localidad();
//        capital.setNombre("Capital");
//        capital.setProvincia(cordoba);
//        localidadRepository.save(capital);
//
//        // Especialidades
//        Especialidad cardiologia = new Especialidad();
//        cardiologia.setNombre("Cardiología");
//        cardiologia.setDescripcion("Especialista en corazón");
//        especialidadRepository.save(cardiologia);
//
//        Especialidad pediatria = new Especialidad();
//        pediatria.setNombre("Pediatría");
//        pediatria.setDescripcion("Especialista en niños");
//        especialidadRepository.save(pediatria);
//
//        // Profesional
//        Profesional profesional = new Profesional();
//        profesional.setNombre("Laura Gómez");
//        profesional.setDni("12345678");
//        profesional.setEmail("laura.gomez@salud.com");
//        profesional.setTelefono("3511234567");
//        profesional.setCalle("Av. Colón");
//        profesional.setNumero("1234");
//        profesional.setCodigoPostal("5000");
//        profesional.setPiso("3");
//        profesional.setDepartamento("A");
//        profesional.setProvincia(cordoba);
//        profesional.setLocalidad(capital);
//        profesionalRepository.save(profesional);
//
//        // Especialidades con matrícula
//        EspecialidadProfesional ep1 = new EspecialidadProfesional();
//        ep1.setProfesional(profesional);
//        ep1.setEspecialidad(cardiologia);
//        ep1.setMatricula("MAT-001");
//        especialidadProfesionalRepository.save(ep1);
//
//        EspecialidadProfesional ep2 = new EspecialidadProfesional();
//        ep2.setProfesional(profesional);
//        ep2.setEspecialidad(pediatria);
//        ep2.setMatricula("MAT-002");
//        especialidadProfesionalRepository.save(ep2);
//
//        System.out.println("✅ Datos iniciales cargados correctamente");
//    }
//}
