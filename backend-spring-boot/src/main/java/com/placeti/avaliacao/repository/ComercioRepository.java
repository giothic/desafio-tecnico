package com.placeti.avaliacao.repository;


import com.placeti.avaliacao.model.Comercio;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComercioRepository extends JpaRepository<Comercio, Long> {

            static final List<Comercio> comercios = new ArrayList<>();
            
}
