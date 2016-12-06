# Guia de início rápido

### Gupy Chat
Este é um exemplo de Chat, seu objetivo é a troca de mensagens entre os usuários.

### Estrutura

     .
    ├── api                        # api folder
    │   ├── models                 # models folder   
    │   │   ├── Channel.js         # model for channel
    │   ├── test                   # unit tests folder
    │	│   ├── api.js             # api unit test
    │   └── api.js                 # api rest
    │── app                        # app folder
    │   ├── client                 # client folder   
    │   │   ├── css                # css folder
    │	│   │   └── style.css      # css file
    │   │   ├── scripts            # scripts folder
    │	│   │   └── scripts.js     # scripts file
    │   ├── server                 # chat folder
    └──	└──   └── app.js           # app chat


**1 - API (Rest)**
>**Responsável por:**
>Criar o canal.
>Salvar as mensagens.
>Listar as mensagens.

**2 - APP (Aplicação Web)**
>**Responsável por:**
>Consumir a API (enviar mensagens, buscar mensagens)
>Interface para utilizar o chat.

### Tecnologias ultilizadas
Como linguagem de programção escolhemos o **node.js**.
Para guardar as mensagens usamos o banco **mongoDb**, que se encontra no **mlab**.
Ultilizamos o **Socket .io** para envio/recebimento das mensagens em tempo real.
Na interface do chat, temos **html**, **css**, **javascript**, **jquery**, **bootstrap**.
Nos testes atomatizados, usamos **mocha** e **chai**.
Para rodar o chat, rodar a API e rodar os testes, temos o maravilhoso **gulp**.

### Passos para executar o projeto

Baixar o projeto:
```
 git clone XXXXXXXXXXX
```

Entrar no projeto:

```
 cd XXXXXXXXXXX
```

Instalar as dependências usando o npm:
```
 npm install
```

Para rodar os testes:
```
 gulp test
```

Para rodar o Projeto:
(o chat vai abrir automaticamente no seu navegador padrão)
```
 gulp serve
```

#### Observações:
>O chat e a Api, rodam nas portas 3000 e 3001 respectivamente, verifique se essas portas não estão em uso antes de rodar a aplicação.

>Url da Api
>http://localhost:3001

>Url do Chat
>http://localhost:3000/<nome-de-qualquer-canal>
>ex.: http://localhost:3000/canal-dev-gupy

### Testar API pelo Postman

status da api, **get**
http://localhost:3001/api/

deletar tudo (só pra ficar melhor de testar), **get**
http://localhost:3001/api/deleteAll

listar tadas mensagens desse canal, **get**
se o canal não existir, aqui que o canal é criado
http://localhost:3001/api/<nome-de-qualquer-canal>

enviar mensagem para esse canal, **post**, parametros: {"user":"userX","message":"msgX"}
nesse momento, o canal precisa existir
http://localhost:3001/api/<nome-de-qualquer-canal>

### Próximas Features
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
>AWS lambda para API
>AWS Api Gateway para os endpoits
>AWS S3 para o conteúdo estático
>AWS CloudFront para o conteúdo estático
>AWS Ec2 para rodar o socket .io do chat
>AWS Waf para proteger os endpoits
>AWS DynamoDb para guardar as mensagens
>pensar em EBS e AutoScaling
>prévia da futura infra:
https://cloudcraft.co/view/70de798f-b451-423d-b8ce-41755f64a926?key=y-xZBkl7UPyB2JDZn1zfGg
