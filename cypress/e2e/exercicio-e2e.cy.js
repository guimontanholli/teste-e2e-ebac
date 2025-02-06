/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import ProdutosPage from '../support/page_objects/ProdutosPage';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('/')
  });

  it.skip('Realizando cadastro e configuração de dados', () => {

    var nome = faker.person.firstName()
    var email = faker.internet.email(nome)
    var sobrenome = faker.person.lastName()
    var display = faker.person.fullName(nome,sobrenome)

      cy.visit('minha-conta')
      cy.get('#reg_email').type(email)
      cy.get('#reg_password').type('teste@123')
      cy.get(':nth-child(4) > .button').click()
      cy.get('.page-title').should('exist')
      cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
      cy.get('#account_first_name').type(nome)
      cy.get('#account_last_name').type(sobrenome)
      cy.get('#account_display_name').type(display)
      cy.get('.woocommerce-Button').click()
      cy.get('.woocommerce-message').should('exist')
      cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(2) > a').click()

    });

    it('Realizando login', () => {
        const perfil = require('../fixtures/perfil.json')

        cy.visit('minha-conta')
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
    });

    it.only('adicionando produtos no carrinho', () => {
        const perfil = require('../fixtures/perfil.json')
        cy.fixture('produtos').then(dados => {

    //declarando variaveis
     var nome = faker.person.firstName()
     var email = faker.internet.email(nome)
     var sobrenome = faker.person.lastName()
     var endereco = faker.location.streetAddress()
     var numero = faker.location.buildingNumber()
     var cep = faker.location.zipCode()
     var telefone = faker.phone.number()


            //fazendo login
            cy.visit('minha-conta')
            cy.get('#username').type(perfil.usuario)
            cy.get('#password').type(perfil.senha)
            cy.get('.woocommerce-form > .button').click()

            //adicionando produtos
            ProdutosPage.buscarProduto(dados[1].nomeProduto)
            ProdutosPage.addProdutoCarrinho(
            dados[1].tamanho,
            dados[1].cor,
            dados[1].quantidade)

            cy.visit('produtos') 
            ProdutosPage.buscarProduto(dados[0].nomeProduto)
            ProdutosPage.addProdutoCarrinho(
            dados[0].tamanho,
            dados[0].cor,
            dados[0].quantidade)

            cy.visit('produtos') 
            ProdutosPage.buscarProduto(dados[2].nomeProduto)
            ProdutosPage.addProdutoCarrinho(
            dados[2].tamanho,
            dados[2].cor,
            dados[2].quantidade)

            cy.visit('produtos') 
            ProdutosPage.buscarProduto(dados[3].nomeProduto)
            ProdutosPage.addProdutoCarrinho(
            dados[3].tamanho,
            dados[3].cor,
            dados[3].quantidade)

            //acessando carrinho e fazendo checkout
            cy.get('#cart > .dropdown-toggle').click()
            cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
           
            cy.get('#billing_first_name').clear().type(nome)
            cy.get('#billing_last_name').clear().type(sobrenome)
            cy.get('#billing_address_1').clear().type(endereco)
            cy.get('#billing_address_2').clear().type(numero)
            //cy.get('#billing_postcode').clear().type(cep) cep ficticio não aceito
            //cy.get('#billing_phone').clear().type(telefone)
            cy.get('#billing_email').clear().type(email)

            cy.get('#terms').click()
            cy.get('#place_order').click()
            cy.get('.woocommerce-order-overview').should('exist')
        })  


    });


})