package com.placeti.avaliacao.repository;

import java.util.ArrayList;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.placeti.avaliacao.model.Cidade;

//----------------------------------------------
/** Repositório para entidade Cidade */
//----------------------------------------------
@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Long> {

        static final List<Cidade> cidades = new ArrayList<>();

}
