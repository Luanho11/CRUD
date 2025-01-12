package org.hostos.back.dbz.repository;

import java.util.List;
import java.util.Optional;

import org.hostos.back.dbz.model.Personajes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonajesRepo extends JpaRepository<Personajes, Long>{
    Optional<Personajes> findByName(String name);
    List<Personajes> findByRaza(String raza);
}
