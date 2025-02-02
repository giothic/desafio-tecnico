package com.placeti.avaliacao.service;

import com.placeti.avaliacao.dto.CidadeDTO;
import com.placeti.avaliacao.model.Cidade;
import com.placeti.avaliacao.repository.CidadeRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

//------------------------------------------------------------------
/** Service usado para acessar os repositórios da aplicação */
//------------------------------------------------------------------
@Service
public class ProjetoService {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private CidadeRepository cidadeRepository; 
    //---------------------------------------------------------
    /** Método que busca uma cidade pelo seu ID */
    //---------------------------------------------------------

	
    @SuppressWarnings("unused")
	public CidadeDTO pesquisarCidade(Long id) {
		logger.info("Buscando cidade com ID: {}", id);
		Optional<Cidade> cidadeOptional = cidadeRepository.findById(id); 
		return cidadeOptional.map(CidadeDTO::toDTO).orElse(null); 
	}

    //---------------------------------------------------------
    /** Método que retorna todas as cidades cadastradas */
    //---------------------------------------------------------
	public List<CidadeDTO> pesquisarCidades() {
		logger.info("Buscando todas as cidades cadastradas");
		List<Cidade> cidades = cidadeRepository.findAll(); 
		return cidades.stream()
				.map(CidadeDTO::toDTO) 
				.collect(Collectors.toList());
	}

    //----------------------------------------------------------
    /** Método chamado para incluir uma nova cidade */
    //----------------------------------------------------------	
    public void incluirCidade(Cidade cidade2) {
        logger.info("Incluindo nova cidade: {}", cidade2.getNome());
        Cidade cidade = new Cidade();
        cidade.setNome(cidade2.getNome());
        cidade.setUf(cidade2.getUf());
        cidade.setCapital(cidade2.getCapital());
        cidadeRepository.save(cidade);
    }

    //----------------------------------------------------------
    /** Método chamado para alterar os dados de uma cidade */
    //----------------------------------------------------------
    public void alterarCidade(CidadeDTO cidadeDto) {
        // Acessa o ID a partir da instância cidadeDto
        Cidade cidadeExistente = cidadeRepository.findById(cidadeDto.getId())
            .orElseThrow(() -> new RuntimeException("Cidade não encontrada"));
    
        // Atualiza os dados da cidade usando a instância cidadeDto
        cidadeExistente.setNome(cidadeDto.getNome());
        cidadeExistente.setUf(cidadeDto.getUf());
        cidadeExistente.setCapital(cidadeDto.isCapital());
    
        // Salva a cidade atualizada
        cidadeRepository.save(cidadeExistente);
    }

    //----------------------------------------------------------
    /** Método chamado para excluir uma cidade */
    //----------------------------------------------------------	
    public void excluirCidade(Long idCidade) {
        logger.info("Excluindo cidade com ID: {}", idCidade);
        cidadeRepository.deleteById(idCidade); 
    }
}