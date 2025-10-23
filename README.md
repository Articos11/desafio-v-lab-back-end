# Desafio V-Lab Backend

O Desafio V-lab Backend foi proposto pela V-lab UFPE, onde o candidato deve desenvolver uma API RESTful de gerencia de biblioteca digital. Os usuários autenticados poderão cadastrar e gerenciar os arquivos, enquanto usuários não autenticados (publico geral) poderá realizar buscas e visualizar diferentes tipos de materiais (livros, artigos, videos). Os usuários autenticados podem associa-los a diferentes autores (desde pessoas até instituições). 

O sistema é seguro, bem validado, segue boas práticas REST e possui testes unitários parciais.

# Tecnologias utilizadas. 


*Tecnologias*: NodeJS, Express, MySQL. 

O projeto foi feito principalmente nos moldes de projeto em Express, utilizando a linguagem Javascript (NodeJS) e o banco de dados MySQL. O projeto segue o padrão de arquitetura em Express, onde são utilizazdos models, controllers, routes, middlewares e testes unitários para manter um fluxo de escrita limpo, prático e de alta manutenção. O banco de dados escolhido foi proposto pelo desafio e foi elaborado em diversas tabelas para acomodar os dados propostos. 

# Como o projeto foi testado durante o desenvolvimento?

O projeto foi amplamente testado utilizando o ThunderClient (extensão do Vscode) que simula o envio de dados para a API, registrando os dados de acordo com as especificações dos controllers. Caso algum erro fosse acusado, o próprio ThunderClient demonstra em sua interface os erros (contanto que estes tenham sido listados no código através de consoles.log ou consoles.error), facilitando a correção.

# Organização do projeto:

1. O projeto foi criado unicamente em formato backend.

    * A estrutura de pastas foi pensada para facilitar o acesso a determinados arquivos para futuras manutenções do projeto.

2. Como funciona a API? 

    * Dadas as especificações do projeto, a API foi pensada de forma que três controllers fosem usados para inserir e manipular os dados no banco de dados. Seguem as explicações e motivações de cada controller abaixo:

        * userController.js é o ponto de partida inicial do projeto. Sem ele, praticamente nada irá funcionar. Aqui criamos o usuário e somos capazes de realizar login com os já criados, além de listarmos todos que já existem (Esta última é apenas para fins de desenvolvimento e provavelmente não iria para uma possível produção).

            * A função registerUser utiliza a biblioteca bcrypt para encriptar a senha do usuário antes de salva-la no banco de dados. 
            * Ao conectar, o usuário gera um token para futuras autenticações e sem ele, o usuário não conseguirá cadastrar um novo material ou novo autor na biblioteca. 

        * O authorController.js segue a ideia do userController.js é a primeira vez que utilizamos a autenticação de usuários para manipular esta parte do projeto. Com o usuário propriamente autenticado, podemos cadastrar um autor para ser referenciado nos materiais da biblioteca. Podemos listar todos os autores e também procurar um autor por IDs específicos. 

        * materialController.js é o maior controller do projeto, pela sua grande quantidade de tarefas. A partir daqui somos capazes de registrar todos os tipos de materiais - Dado que o Autor exista e que o usuário esteja autenticado -, e além de cadastrarmos na tabela Materials, também cadastramos respectivamente os livros, artigos e videos em suas próprias tabelas, carregando o ID gerado para cada um. Se necessário, podemos deletar um material registrado ou atualiza-lo para alterar quaisquer pontos necessários. 

            * Deletar um material também o deleta de sua tabela respectiva. 

# Como rodar o projeto? 

1. Clone o repositório. 
2. Abra-o na sua IDE de preferência. 
3. use cd server no terminal para acessar a pasta do servidor.
4. utilize npm install para instalar todas as dependências do projeto.
5. Utilize um .env para registrar suas chaves próprias, como porta, JWT_Secret, Node_env, etc. 
6. utilize npm run dev para realizar ajustes no servidor.
7. Utilize npm run start para deixar o servidor rodando. 
8. Utilize npm test para realizar os testes unitários (não foram propriamente implementados por falta de tempo)
9. A fim de realizar testes sem um frontend, utilize Postman ou Thunderclient para realizar o consumo da API.

    * Seguem as rotas disponíveis, assumindo um localhost:
        * localhost:5001/api - Prefixo obrigatório para qualquer rota.
        * localhost:5001/api/register - Registra o usuário
        * localhost:5001/api/login - Conecta o usuário
        * localhost:5001/api/ - Retorna todos os usuários (get).
        * localhost:5001/api/materials - Cadastra um novo material (post).
        * localhost:5001/api/materials - Recebe todos os materias (get).
        * localhost:5001/api/materials/:id - Procura um material por um ID específico (get).
        * localhost:5001/api/materials/:id - Atualiza um material específico (put).
        * localhost:5001/api/materials/:id - Deleta um material específico (delete).
        * localhost:5001/api/authors - Cria um autor específico.
        * localhost:5001/api/authors - Lista todos os autores. (get).
        * localhost:5001/api/authors/:id - Lista um autor específico.

# Lições aprendidas durante o desenvolvimento. 

Foram aprendidas algumas lições bastante importantes durante o desenvolvimento desse projeto:

1. A conexão entre o backend e um banco de dados relacional utilizando mysql2. Para futuros projetos, serão consideradas arquiteturas ORM.
2. A como fazer uma documentação bem elaborada. Para futuras situações, Swagger será considerado. 
3. A como quebrar um projeto real em tarefas pequenas para não se deixar sobrecarregar e conseguir conclui-lo em etapas diárias. 
4. Criação de testes unitários - Mesmo que estes não tenham sido tão bem implementados quanto eu gostaria. 
5. Padrões REST e Status HTTP para indicar o funcionamento da API, como erros, sucesso, falta de autorização, etc. 
6. Estruturação do projeto para facilitar manutenção futura, com comentários pontuais e colocações para indiciar onde cada função está agindo.

# Possíveis melhorias:  

1. O consumo de uma API externa. 
2. Cobertura de testes em 80% 
3. Deploy online
4. Documentação interativa 
5. Mini frontend simples.


# Agradeço desde já pela oportunidade.