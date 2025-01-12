package org.hostos.back.dbz.controller;

import java.util.List;

import org.hostos.back.dbz.logic.service.PersonajeService;
import org.hostos.back.dbz.model.Personajes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/personajes")
@CrossOrigin(origins = "http://localhost:3000")
@Validated
public class PersonajeController {
    @Autowired
    public PersonajeService personajeS;

    @GetMapping
    public ResponseEntity<List<Personajes>> findAll() {
        return new ResponseEntity<>(personajeS.findAll(),
                HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Personajes> findById(@PathVariable Long id) {
        return new ResponseEntity<>(personajeS.findById(id), HttpStatus.OK);
    }

    @GetMapping("/nombre/{name}")
    public ResponseEntity<Personajes> findByName(@PathVariable String name) {
        return new ResponseEntity<>(personajeS.findByName(name), HttpStatus.OK);
    }

    @GetMapping("/raza/{raza}")
    public ResponseEntity<List<Personajes>> findByRaza(@PathVariable String raza) {
        List<Personajes> personajes = personajeS.findByRaza(raza);
        return new ResponseEntity<>(personajes, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Personajes> add(@Validated @RequestBody Personajes personajes) {
        return new ResponseEntity<>(personajeS.add(personajes),
                HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Personajes> update(@PathVariable Long id,
            @RequestBody Personajes personajes) {
        return new ResponseEntity<>(personajeS.update(id, personajes),
                HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        personajeS.delete(id);
    }

}
