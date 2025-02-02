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
    private Long id;

    private String nome;
    private String responsavel;

    @Enumerated(EnumType.STRING)
    private TipoComercio tipo;

    @ManyToOne
    @JoinColumn(name = "cidade_id", nullable = false)
    private Cidade cidade;
}
