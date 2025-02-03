package com.placeti.avaliacao.service;

import com.placeti.avaliacao.dto.ComercioDTO;
import com.placeti.avaliacao.model.Cidade;
import com.placeti.avaliacao.model.Comercio;
import com.placeti.avaliacao.repository.ComercioRepository;
import com.placeti.avaliacao.repository.CidadeRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ComercioService {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private ComercioRepository comercioRepository;

    @Autowired
    private CidadeRepository cidadeRepository;

    //---------------------------------------------------------
    /** Método que busca um comércio pelo seu ID */
    //---------------------------------------------------------
    public ComercioDTO pesquisarComercio(Long id) {
        logger.info("Buscando comércio com ID: {}", id);
        Optional<Comercio> comercioOptional = comercioRepository.findById(id);
        return comercioOptional.map(this::toDTO).orElse(null);
    }

    //---------------------------------------------------------
    /** Método que retorna todos os comércios cadastrados */
    //---------------------------------------------------------
    public List<ComercioDTO> pesquisarComercios() {
        logger.info("Buscando todos os comércios cadastrados");
        List<Comercio> comercios = comercioRepository.findAll();
        return comercios.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    //----------------------------------------------------------
    /** Método chamado para incluir um novo comércio */
    //----------------------------------------------------------
    public ComercioDTO incluirComercio(ComercioDTO comercioDTO) {
        logger.info("Incluindo novo comércio: {}", comercioDTO.getNome());
        Comercio comercio = new Comercio();
        comercio.setNome(comercioDTO.getNome());
        comercio.setResponsavel(comercioDTO.getResponsavel());
        comercio.setTipo(comercioDTO.getTipo());

        Optional<Cidade> cidadeOptional = cidadeRepository.findById(comercioDTO.getCidadeId());
        if (cidadeOptional.isPresent()) {
            comercio.setCidade(cidadeOptional.get());
            Comercio savedComercio = comercioRepository.save(comercio);
            return toDTO(savedComercio);
        } else {
            throw new RuntimeException("Cidade não encontrada com o ID: " + comercioDTO.getCidadeId());
        }
    }

    //----------------------------------------------------------
    /** Método chamado para excluir um comércio */
    //----------------------------------------------------------
    public void excluirComercio(Long id) {
        logger.info("Excluindo comércio com ID: {}", id);
        comercioRepository.deleteById(id);
    }

    //---------------------------------------------------------
    /** Método para converter Comercio em ComercioDTO */
    //---------------------------------------------------------
    private ComercioDTO toDTO(Comercio comercio) {
        ComercioDTO dto = new ComercioDTO(null, null, null, null, null);
        dto.setId(comercio.getId());
        dto.setNome(comercio.getNome());
        dto.setResponsavel(comercio.getResponsavel());
        dto.setTipo(comercio.getTipo());
        dto.setCidadeId(comercio.getCidade().getId());
        return dto;
    }

    public void alterarComercio(ComercioDTO comercioDto) {
        Comercio comercioExistente = comercioRepository.findById(comercioDto.getId())
            .orElseThrow(() -> new RuntimeException("Comércio não encontrado"));
    

        comercioExistente.setNome(comercioDto.getNome());
        comercioExistente.setResponsavel(comercioDto.getResponsavel());
        comercioExistente.setTipo(comercioDto.getTipo());
        comercioExistente.setCidade(cidadeRepository.findById(comercioDto.getCidadeId())
            .orElseThrow(() -> new RuntimeException("Cidade não encontrada")));
    

        comercioRepository.save(comercioExistente);
    }
}
