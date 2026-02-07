# language: pt
Funcionalidade: Portal Globo Esporte - Home

  Contexto:
    Dado que eu navego para a home do GE

  Cenário: Validar requisitos obrigatórios das notícias
    Então a página deve exibir no mínimo 10 notícias
    E cada notícia deve conter título e imagem ou resumo

  Cenário: Redirecionamento para matéria completa
    Quando eu clico na primeira notícia
    Então devo ser redirecionado para a página da matéria completa

  Esquema do Cenário: Navegação para página oficial de um clube
    Quando eu acesso a página do time "<clube>"
    Então devo visualizar a página oficial do time "<slug>"

    Exemplos:
      | clube       | slug        |
      | Flamengo    | flamengo    |
      | Corinthians | corinthians |
