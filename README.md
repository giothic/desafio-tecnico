# Desafio Técnico - Place TI

Este repositório contém o código do desafio técnico realizado para a Place TI. O objetivo deste desafio foi demonstrar habilidades no desenvolvimento de um sistema completo com backend e frontend.

## Estrutura do Repositório

O repositório está dividido em duas partes:

- **Backend**: Desenvolvido em Java com Spring Boot.
- **Frontend**: Desenvolvido em Angular.

---

## Pré-Requisitos

Antes de rodar o projeto, é necessário ter as seguintes ferramentas instaladas:

- [Java 11 ou superior](https://adoptopenjdk.net/)
- [Node.js e npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [Banco de dados H2](https://www.h2database.com/html/main.html)

---
# Deploy

### Configuração do Backend

#### 1. Iniciar o Backend

Para rodar o backend da aplicação, siga os seguintes passos:


Clone este repositório:

   ```bash
   git clone https://github.com/giothic/desafio-tecnico
   ```
   
Navegue até o diretório do backend e compile o projeto:

   ```bash
   mvn clean install
   ```
Execute a aplicação:

   ```bash
   mvn spring-boot:run
   ```

#### 2. Acessar o Banco de Dados H2

Após iniciar o backend, o banco de dados H2 pode ser acessado através do seguinte endereço:

http://localhost:8080/placeti/h2-console

Dados de Conexão:

    URL: jdbc:h2:mem:database

    Usuário: admin

    Senha: admin

## Configuração do Frontend
#### 1. Instalar as Dependências do Frontend

Navegue até o diretório do frontend e instale as dependências:

```bash
npm install
```
#### 2. Iniciar o Servidor do Frontend
Após a instalação das dependências, inicie o servidor do frontend:

```bash
npm start
```
O frontend estará disponível em:

http://localhost:4200
## O que foi feito

### Backend

##### 1. **Criação da Entidade `Comercio`:**
   - A entidade `Comercio` foi criada conforme solicitado, com os parâmetros:
     - `ID`
     - `Nome do Comércio`
     - `Nome do Responsável`
     - `Tipo de Comércio` (com as opções FARMÁCIA, PADARIA, POSTO_GASOLINA, LANCHONETE)
   
   - Relacionamento: A entidade `Comercio` foi associada à entidade `Cidade`, respeitando a regra de que cada cidade pode ter vários comércios, mas um comércio está relacionado a uma única cidade.

##### 2. **Arquitetura Implementada:**
   - A arquitetura foi estruturada de acordo com a orientação dada, utilizando a separação entre Controller, Service e Repository:
     - O **Controller** chama o **Service**.
     - O **Service** chama o **Repository** para persistência dos dados.

##### 3. **Implementação do `CidadeController`:**
   - Implementei os métodos solicitados no `CidadeController`, conforme os comentários no código.

##### 4. **Implementação do `ProjetoService`:**
   - Criei os métodos no `ProjetoService`, que interagem com o repositório para obter e manipular os dados das entidades.

### Frontend

##### 1. **Ajustes na Classe `Cidade`:**
   - Modifiquei os atributos da classe `Cidade` para garantir que correspondam aos dados retornados pelo backend.

##### 2. **Implementação no `ProjetoService`:**
   - Implementei os métodos no `ProjetoService` para interagir com o backend, conforme os comentários no código.

##### 3. **Ajuste da Tabela de Cidades:**
   - A tabela de cidades foi ajustada para exibir os dados recuperados do backend, garantindo que a interface esteja corretamente integrada com a API.

##### 4. **Funcionalidades de CRUD:**
   - Implementei as funcionalidades de adicionar, alterar e excluir cidades, de forma que o frontend esteja funcionando corretamente com o backend.



### Resultado Esperado

Até o momento, todas as funcionalidades de backend e frontend foram implementadas conforme solicitado. O sistema permite a criação, alteração, exclusão e exibição das cidades e comércios, com a comunicação eficiente entre as camadas de frontend e backend.





## Observações Finais

Se você tiver alguma dúvida sobre a implementação ou se precisar de mais informações, sinta-se à vontade para entrar em contato.


#### Giovanna Rocha Cardoso



