package com.placeti.avaliacao.service;

import com.placeti.avaliacao.dto.ComercioDTO;
import com.placeti.avaliacao.model.Cidade;
import com.placeti.avaliacao.model.Comercio;
import com.placeti.avaliacao.Enum.TipoComercio;
import com.placeti.avaliacao.repository.CidadeRepository;
import com.placeti.avaliacao.repository.ComercioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@SuppressWarnings("unused")
@Service
public class ComercioService {

    @Autowired
    private ComercioRepository comercioRepository;

    @Autowired
    private CidadeRepository cidadeRepository;

    //---------------------------------------------------------
    /** Método para incluir um novo comércio */
    //---------------------------------------------------------
    public ComercioDTO incluirComercio(ComercioDTO comercioDTO) {
        Comercio comercio = new Comercio();
        comercio.setNome(comercioDTO.getNome());
        comercio.setResponsavel(comercioDTO.getResponsavel());
        comercio.setTipo(comercioDTO.getTipo());

        // Busca a cidade pelo ID
        Optional<Cidade> cidadeOptional = cidadeRepository.findById(comercioDTO.getCidadeId());
        if (cidadeOptional.isPresent()) {
            comercio.setCidade(cidadeOptional.get());
            Comercio savedComercio = comercioRepository.save(comercio);
            return toDTO(savedComercio);
        } else {
            throw new RuntimeException("Cidade não encontrada com o ID: " + comercioDTO.getCidadeId());
        }
    }

    //---------------------------------------------------------
    /** Método para buscar todos os comércios */
    //---------------------------------------------------------
    public List<ComercioDTO> pesquisarComercios() {
        List<Comercio> comercios = comercioRepository.findAll();
        return comercios.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    //---------------------------------------------------------
    /** Método para buscar um comércio pelo ID */
    //---------------------------------------------------------
    public ComercioDTO pesquisarComercio(Long id) {
        Optional<Comercio> comercioOptional = comercioRepository.findById(id);
        return comercioOptional.map(this::toDTO).orElse(null);
    }

    //---------------------------------------------------------
    /** Método para excluir um comércio pelo ID */
    //---------------------------------------------------------
    public void excluirComercio(Long id) {
        comercioRepository.deleteById(id);
    }

    //---------------------------------------------------------
    /** Método para converter Comercio em ComercioDTO */
    //---------------------------------------------------------
    private ComercioDTO toDTO(Comercio comercio) {
        ComercioDTO dto = new ComercioDTO();
        dto.setId(comercio.getId());
        dto.setNome(comercio.getNome());
        dto.setResponsavel(comercio.getResponsavel());
        dto.setTipo(comercio.getTipo());
        dto.setCidadeId(comercio.getCidade().getId());
        return dto;
    }
}
