# Desafio Ton
O seu desafio é construir uma API que conta o número de acessos ao site do Ton e permitir que um usuário crie uma conta. Para contar os acessos você deverá usar a API https://countapi.xyz e para criar a conta você pode usar o banco de dados e as bibliotecas que preferir, mas queremos que você saiba explicar sua escolha e como elas funcionam (de forma aprofundada, de preferência).

## Tarefas
1. Criar uma rota para incrementar o número de acessos;
   *  POST /access
2. Criar uma rota para consultar o número de acessos;
   * GET /access
3. Criar uma rota para criar um usuário;
   * POST /users
4. Criar uma rota para visualizar as informações de um usuário.
   * GET /users/{id}
   
## Bônus
* Disponibilizar o desafio em algum servidor;
  * https://3s9ev07k6g.execute-api.us-east-2.amazonaws.com
  * [Insomnia](docs/Insomnia.json)
* Escrever testes para os códigos (unitários, de integração e e2e);
  * [Tests](src/domain/use-cases) 
* Documentação (open-api, fluxogramas e etc);
  * [Docs](docs) 
  
## Instruções
* Use versionamento (aqui no Ton tentamos seguir essa convenção:
  * https://www.conventionalcommits.org/en/v1.0.0/#summary)
* Mande o link do repositório ou um .zip caso você prefira
* Seguimos o clean code, e gostaríamos de ver isso também em sua implementação:
  * https://github.com/ryanmcdermott/clean-code-javascript
* Queremos uma entrega pronta para ir para produção, então pense em um sistema resiliente e na segurança do mesmo
* Qualquer solução será aceita e avaliada igual pois queremos entender seu conhecimento, mas seria interessante utilizar a mesma arquitetura que usamos, a Arquitetura Serverless (API Gateway + Lambda + DynamoDB);
* Para infraestrutura, pode utilizar serverless ou terraform
