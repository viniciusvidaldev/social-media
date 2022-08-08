## Faça os seguintes passos para rodar a aplicação

 Necessário ter instalado para rodar o projeto: `Node`, `Docker`, `Docker-Compose` e `npm` ou `yarn`.

 - Clone o projeto no seu computador.
 - Vá para a pasta clonada executando `cd social-meida`.
 - Abra o backend utilizando `code backend`.
 - Instale as dependências rodando no terminal o comando `yarn` ou `npm install`.
 - Crie um novo arquivo chamado `.env` e cole nele o conteúdo do arquivo `.env.example`, adicionando algum valor à variável `JWT_SECRET`.
 - Crie a imagem da api utilizando o seguinte comando `docker build -t social-media .`.
 - Após isso, suba o docker-compose da aplicação utilizando `docker-compose up` no terminal.
 - Por fim, abra uma nova aba no terminal e rode o comando `yarn typeorm migration:run -d src/database/connect.ts`, para criar as tabelas do banco de dados.
 
 - Inicie o projeto utilizando `npm run start` ou `yarn start`.
