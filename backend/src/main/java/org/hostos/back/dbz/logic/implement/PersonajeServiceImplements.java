package org.hostos.back.dbz.logic.implement;

import java.util.List;

import org.hostos.back.dbz.logic.service.PersonajeService;
import org.hostos.back.dbz.model.Personajes;
import org.hostos.back.dbz.repository.PersonajesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonajeServiceImplements implements PersonajeService {

    @Autowired
    public PersonajesRepo personajeR;

    @Override
    public List<Personajes> findAll() {
        return (List<Personajes>) personajeR.findAll();
    }

    @Override
    public Personajes findById(Long id) {
        return personajeR.findById(id).orElse(null);
    }

    @Override
    public Personajes add(Personajes personajes) {
        return personajeR.save(personajes);
    }

    @Override
    public Personajes update(Long id, Personajes personajes) {
        Personajes DBPersonajes = personajeR.findById(id).orElse(null);
        if (DBPersonajes != null) {
            DBPersonajes.setName(personajes.getName());
            DBPersonajes.setDescription(personajes.getDescription());
            DBPersonajes.setRaza(personajes.getRaza());
            return personajeR.save(DBPersonajes);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        Personajes DBPersonajes = personajeR.findById(id).get();
        if (DBPersonajes != null) {
            personajeR.delete(DBPersonajes);
        }
    }

    @Override
    public Personajes findByName(String name) {
        return personajeR.findByName(name).get();
    }

    @Override
    public List<Personajes> findByRaza(String raza) {
        return personajeR.findByRaza(raza);
    }

}
