package org.hostos.back.dbz.logic.service;

import java.util.List;

import org.hostos.back.dbz.model.Personajes;

public interface PersonajeService {

    public List<Personajes> findAll();

    public Personajes findById(Long id);

    public Personajes add(Personajes personajes);

    public Personajes update(Long id, Personajes personajes);

    public void delete(Long id);

    public Personajes findByName(String name);

    public List<Personajes> findByRaza(String raza);

}