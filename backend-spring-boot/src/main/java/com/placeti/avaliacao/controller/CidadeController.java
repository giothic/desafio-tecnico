package com.placeti.avaliacao.controller;

import com.placeti.avaliacao.dto.CidadeDTO;
import com.placeti.avaliacao.model.Cidade;
import com.placeti.avaliacao.service.ProjetoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//--------------------------------------------------
/** Endpoint para consultar e manter cidades */
//--------------------------------------------------
@RestController 
@RequestMapping("/cidades")
public class CidadeController {

    @Autowired
    private ProjetoService projetoService;

    //----------------------------------------------------------
    /** Endpoint que retorna uma cidade conforme seu ID */
    //----------------------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<CidadeDTO> buscarPeloId(@PathVariable Long id) { 
        CidadeDTO cidadeDTO = projetoService.pesquisarCidade(id);
        if (cidadeDTO != null) {
            return ResponseEntity.ok(cidadeDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //----------------------------------------------------------
    /** Endpoint que retorna todas as cidades cadastradas */
    //----------------------------------------------------------
    @GetMapping
    public ResponseEntity<List<CidadeDTO>> pesquisarCidades() {
        List<CidadeDTO> cidades = projetoService.pesquisarCidades();
        return ResponseEntity.ok(cidades);
    }

    //----------------------------------------------------------
    /** Endpoint para incluir nova cidade */
    //----------------------------------------------------------
    @PostMapping
    public ResponseEntity<Void> salvarCidade(@RequestBody CidadeDTO cidadeDto) {
        Cidade cidade = new Cidade();
        cidade.setNome(cidadeDto.getNome());
        cidade.setUf(cidadeDto.getUf());
        cidade.setCapital(cidadeDto.isCapital());

        projetoService.incluirCidade(cidade);
        return ResponseEntity.ok().build();
	}

    //----------------------------------------------------------
    /** Endpoint para alterar cidade */
    //----------------------------------------------------------
	
		@PutMapping("/{id}")
		public ResponseEntity<Void> alterarCidade(@PathVariable Long id, @RequestBody CidadeDTO cidadeDto) {
			cidadeDto.setId(id); 
			projetoService.alterarCidade(cidadeDto);
			return ResponseEntity.ok().build();
		}

    //----------------------------------------------------------
    /** Endpoint para excluir uma cidade */
    //----------------------------------------------------------
    @DeleteMapping("/{idCidade}")
    public ResponseEntity<Void> excluirCidade(@PathVariable Long idCidade) {
        projetoService.excluirCidade(idCidade);
        return ResponseEntity.noContent().build();
    }
}