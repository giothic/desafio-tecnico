package com.placeti.avaliacao.dto;

import com.placeti.avaliacao.model.Cidade;
import lombok.Data;

//-------------------------------------------------
/** DTO que guarda os dados de uma cidade */
//-------------------------------------------------
@Data // Inclui @Getter, @Setter, @ToString, @EqualsAndHashCode e @RequiredArgsConstructor
public class CidadeDTO {

    //---------------------------------------
    // Atributos do DTO
    //---------------------------------------
    private Long id;
    private String nome;
    private String uf;
    private boolean capital; 
    //-----------------------------------------------
    /** Construtor com todos os campos */
    //-----------------------------------------------
    public CidadeDTO(Long id, String nome, String uf, boolean capital) {
        this.id = id;
        this.nome = nome;
        this.uf = uf;
        this.capital = capital;
    }

    //-----------------------------------------------
    /** Carrega o DTO com dados da entidade */
    //-----------------------------------------------
    public static CidadeDTO toDTO(Cidade cidade) {
        if (cidade == null) {
            return null; 
        }

        return new CidadeDTO(
            cidade.getId(),
            cidade.getNome(),
            cidade.getUf(),
            cidade.getCapital()
        );
    }
}