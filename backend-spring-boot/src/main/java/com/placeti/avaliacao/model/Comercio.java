package com.placeti.avaliacao.model;

import com.placeti.avaliacao.Enum.TipoComercio;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "comercio")
public class Comercio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)    
    private Long id;

    @Column(name = "NOME", nullable = false)    
    private String nome;

    @Column(name = "RESPONSAVEL", nullable = false)    
    private String responsavel;

    @Column(name = "TIPO", nullable = false)    
    @Enumerated(EnumType.STRING)
    private TipoComercio tipo;

    @ManyToOne 
    @JoinColumn(name = "cidade_id", nullable = false)
    private Cidade cidade;
}
