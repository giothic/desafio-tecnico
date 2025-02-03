package com.placeti.avaliacao.controller;

import com.placeti.avaliacao.dto.ComercioDTO;
import com.placeti.avaliacao.service.ComercioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comercios")
public class ComercioController {

    @Autowired
    private ComercioService comercioService;

    //----------------------------------------------------------
    /** Endpoint para incluir um novo comércio */
    //----------------------------------------------------------
    @PostMapping
    public ResponseEntity<ComercioDTO> incluirComercio(@RequestBody ComercioDTO comercioDTO) {
        ComercioDTO novoComercio = comercioService.incluirComercio(comercioDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoComercio);
    }

    //----------------------------------------------------------
    /** Endpoint para buscar todos os comércios */
    //----------------------------------------------------------
    @GetMapping
    public ResponseEntity<List<ComercioDTO>> pesquisarComercios() {
        List<ComercioDTO> comercios = comercioService.pesquisarComercios();
        return ResponseEntity.ok(comercios);
    }

    //----------------------------------------------------------
    /** Endpoint para buscar um comércio pelo ID */
    //----------------------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<ComercioDTO> buscarPeloId(@PathVariable Long id) {
        ComercioDTO comercioDTO = comercioService.pesquisarComercio(id);
        if (comercioDTO != null) {
            return ResponseEntity.ok(comercioDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{id}")
public ResponseEntity<Void> alterarComercio(@PathVariable Long id, @RequestBody ComercioDTO comercioDto) {
    comercioDto.setId(id);
    comercioService.alterarComercio(comercioDto);
    return ResponseEntity.ok().build();
}

    //----------------------------------------------------------
    /** Endpoint para excluir um comércio pelo ID */
    //----------------------------------------------------------
    @DeleteMapping("/{idComercio}")
    public ResponseEntity<Void> excluirComercio(@PathVariable Long idComercio) {
        comercioService.excluirComercio(idComercio);
        return ResponseEntity.noContent().build();
    }
}
