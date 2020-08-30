Feature: Listagem

    Como usuário após o login quero visualizar os usuários cadastrados
    Para que possa visualizar meus dados de cadastro

Scenario: Sem registro
    Given que o site não possui registros
    When acessar a listagem
    Then devo visualizar a listagem vazia

Scenario: Com um registro
    Given que o site possui apenas 1 registro
    When acessar a listagem
    Then devo visualizar apenas um registro