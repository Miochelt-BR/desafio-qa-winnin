# language: pt
Funcionalidade: API ServeRest - Fluxo de E-commerce

  Cenário: Gerenciamento de Usuário e Login
    Dado que eu gero dados de um novo usuário
    Quando eu cadastro esse usuário na API
    Então o status code deve ser 201
    E eu realizo o login com as credenciais criadas
    Então devo receber um token de autenticação válido

  Cenário: Tentativa de Login com senha incorreta
    Dado que eu gero dados de um novo usuário
    E eu cadastro esse usuário na API
    Quando eu tento realizar login com uma senha inválida
    Então o status code deve ser 401
    E a mensagem de erro deve ser "Email e/ou senha inválidos"

  Cenário: Fluxo de Produto e Carrinho
    Dado que eu estou autenticado como administrador
    Quando eu cadastro um novo produto com preço 100 e quantidade 50
    Então o produto deve ser criado com sucesso
    E eu adiciono esse produto a um novo carrinho
    Então o carrinho deve ser validado com os itens corretos