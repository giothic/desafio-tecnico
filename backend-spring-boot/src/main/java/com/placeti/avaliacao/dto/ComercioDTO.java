package com.placeti.avaliacao.dto;

import com.placeti.avaliacao.Enum.TipoComercio;
import lombok.Data;

@Data
public class ComercioDTO {

    private Long id;
    private String nome;
    private String responsavel;
    private TipoComercio tipo;
    private Long cidadeId; 
}
