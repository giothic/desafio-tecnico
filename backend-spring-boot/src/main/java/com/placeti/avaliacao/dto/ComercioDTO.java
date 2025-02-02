package com.placeti.avaliacao.dto;

import com.placeti.avaliacao.Enum.TipoComercio;
import com.placeti.avaliacao.model.Comercio;
import lombok.Data;

//-------------------------------------------------
/** DTO que guarda os dados de um comércio */
//-------------------------------------------------
@Data 
public class ComercioDTO {

    //---------------------------------------
    // Atributos do DTO
    //---------------------------------------
    private Long id;
    private String nome;
    private String responsavel;
    private TipoComercio tipo;
    private Long cidadeId;

    //-----------------------------------------------
    /** Construtor com todos os campos */
    //-----------------------------------------------
    public ComercioDTO(Long id, String nome, String responsavel, TipoComercio tipo, Long cidadeId) {
        this.id = id;
        this.nome = nome;
        this.responsavel = responsavel;
        this.tipo = tipo;
        this.cidadeId = cidadeId;
    }

    //-----------------------------------------------
    /** Carrega o DTO com dados da entidade */
    //-----------------------------------------------
    public static ComercioDTO toDTO(Comercio comercio) {
        if (comercio == null) {
            return null; 
        }

        return new ComercioDTO(
            comercio.getId(),
            comercio.getNome(),
            comercio.getResponsavel(),
            comercio.getTipo(),
            comercio.getCidade().getId()
        );
    }
}
