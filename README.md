# Guia de início rápido

### Gupy Chat
Este é um exemplo de Chat, seu objetivo é a troca de mensagens entre os usuários.

### Estrutura

     .
    ├── api                        # api folder
    │   ├── models                 # models folder   
    │   │   ├── Channel.js         # model for channel
    │   ├── test                   # unit tests folder
    │	  │   ├── api.js             # api unit test
    │   └── api.js                 # api rest
    │── app                        # app folder
    │   ├── client                 # client folder   
    │   │   ├── css                # css folder
    │	  │   │   └── style.css      # css file
    │   │   ├── scripts            # scripts folder
    │	  │   │   └── scripts.js     # scripts file
    │   ├── server                 # chat folder
    └─  └─  └─  app.js             # app chat


**1 - API (Rest)**
>**Responsável por:**<br />
>Criar o canal.<br />
>Salvar as mensagens.<br />
>Listar as mensagens.

**2 - APP (Aplicação Web)**
>**Responsável por:**<br />
>Consumir a API (enviar mensagens, buscar mensagens)<br />
>Interface para utilizar o chat.

### Tecnologias ultilizadas
Como linguagem de programção escolhemos o **node.js**.<br />
Para guardar as mensagens usamos o banco **mongoDb**, que se encontra no **mlab**.<br />
Ultilizamos o **Socket .io** para envio/recebimento das mensagens em tempo real.<br />
Na interface do chat, temos **html**, **css**, **javascript**, **jquery**, **bootstrap**.<br />
Nos testes atomatizados, usamos **mocha** e **chai**.<br />
Para rodar o chat, rodar a API e rodar os testes, temos o maravilhoso **gulp**.<br />

### Passos para executar o projeto

Baixar o projeto:
```
 git clone https://github.com/Geander/gupy-chat.git
```

Entrar no projeto:

```
 cd gupy-chat/
```

Instalar as dependências usando o npm:
```
 npm install
```

Para rodar os testes:
```
 npm run gulp test
```

Para rodar o Projeto:
(o chat vai abrir automaticamente no seu navegador padrão)
```
 npm run gulp serve
```

#### Observações:
>O chat e a Api, rodam nas portas 3000 e 3001 respectivamente, verifique se essas portas não estão em uso antes de rodar a aplicação.

>É necessário internet para acessar o banco, e baixar os arquivos estáticos das cdns.

>Url da Api
>http://localhost:3001

>Url do Chat
>http://localhost:3000/ < nome-de-qualquer-canal > <br />
>ex.: http://localhost:3000/canal-dev-gupy

<br />
### Testar API pelo Postman

status da api, **get**<br />
http://localhost:3001/api/<br />

deletar tudo (só pra ficar melhor de testar), **get**<br />
http://localhost:3001/api/deleteAll<br />

listar tadas mensagens desse canal, **get**<br />
se o canal não existir, aqui que o canal é criado<br />
http://localhost:3001/api/<nome-de-qualquer-canal><br />

enviar mensagem para esse canal, **post**, parametros: {"user":"userX","message":"msgX"}<br />
nesse momento, o canal precisa existir<br />
http://localhost:3001/api/<nome-de-qualquer-canal><br />

### Próximas Features
- Tirar a senha do db no projeto.
- Coverage.
- Testes com mais de 90% de cobertura.
- Melhorar front-end, talves colocar reactjs ou angularjs.
- Ultilização de scss.
- Gulp Task de build, com Webpack para mimificar css, js, html e disponibilizar na pasta dist.
- Ofuscar js.
- Implementar melhorias de segurança no javascript e nodejs.
- Criptografar as mensagens.
- Visualizar usuários conectados no canal.
- Parte admninistrativa, para gerenciar os usuários e mensagens.
- Testes para html (DOM).
- Ci Buil no Jenkins.
- Colocar na Cloud AWS (vide próximo tópico)

### Cloud AWS
Devido ao socket .io não conseguiremos ultilizar uma infra totalmente serverless, porém ultilizaremos:
>AWS lambda para API<br />
>AWS Api Gateway para os endpoits<br />
>AWS S3 para o conteúdo estático<br />
>AWS CloudFront para o conteúdo estático<br />
>AWS Ec2 para rodar o socket .io do chat<br />
>AWS Waf para proteger os endpoits<br />
>AWS DynamoDb para guardar as mensagens<br />
>pensar em EBS e AutoScaling<br />
>prévia da futura infra:<br />
https://cloudcraft.co/view/70de798f-b451-423d-b8ce-41755f64a926?key=y-xZBkl7UPyB2JDZn1zfGg
