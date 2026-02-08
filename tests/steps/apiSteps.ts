import { Given, When, Then } from '@cucumber/cucumber';
import { expect, request, APIRequestContext } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { UserBuilder, ProductBuilder } from '../models/User.js'; 

let apiContext: APIRequestContext;
let userEmail: string;
let userPassword = "password123"; 
let authToken: string;
let productId: string;
let response: any;



Given('que eu gero dados de um novo usuário', async function () {
    apiContext = await request.newContext({ baseURL: 'https://serverest.dev' });
    userEmail = faker.internet.email();
});

When('eu cadastro esse usuário na API', async function () {
    const userData = UserBuilder.buildAdminUser();
    userEmail = userData.email; 
    userPassword = userData.password;

    response = await apiContext.post('/usuarios', { data: userData });
});

Then('o status code deve ser {int}', async function (status: number) {
    expect(response.status()).toBe(status);
});

When('eu realizo o login com as credenciais criadas', async function () {
    response = await apiContext.post('/login', {
        data: { email: userEmail, password: userPassword }
    });
    const body = await response.json();
    authToken = body.authorization;
});

Then('devo receber um token de autenticação válido', async function () {
    expect(authToken).toBeDefined();
    expect(authToken).toContain('Bearer');
});



When('eu tento realizar login com uma senha inválida', async function () {
    const senhaIncorreta = "12345"; 
    const emailTarget = userEmail || faker.internet.email();
    
    apiContext = await request.newContext({ baseURL: 'https://serverest.dev' });
    response = await apiContext.post('/login', {
        data: {
            email: emailTarget,
            password: senhaIncorreta
        }
    });
});

Then('a mensagem de erro deve ser {string}', async function (mensagem: string) {
    const body = await response.json();
    expect(body.message).toBe(mensagem);
});



Given('que eu estou autenticado como administrador', async function () {
    if (!authToken) {
        const adminData = UserBuilder.buildAdminUser();
        apiContext = await request.newContext({ baseURL: 'https://serverest.dev' });
        
        await apiContext.post('/usuarios', { data: adminData });
        const loginRes = await apiContext.post('/login', {
            data: { email: adminData.email, password: adminData.password }
        });
        
        const loginBody = await loginRes.json();
        authToken = loginBody.authorization;
    }
    expect(authToken).toBeDefined();
});

When('eu cadastro um novo produto com preço {int} e quantidade {int}', async function (preco: number, qtd: number) {
    const productData = ProductBuilder.buildProduct(preco, qtd);
    
    response = await apiContext.post('/produtos', {
        headers: { 'Authorization': authToken },
        data: productData
    });
    const body = await response.json();
    productId = body._id;
});

Then('o produto deve ser criado com sucesso', async function () {
    expect(response.status()).toBe(201);
});

When('eu adiciono esse produto a um novo carrinho', async function () {
    response = await apiContext.post('/carrinhos', {
        headers: { 'Authorization': authToken },
        data: {
            produtos: [{ idProduto: productId, quantidade: 1 }]
        }
    });
});

Then('o carrinho deve ser validado com os itens corretos', async function () {
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.message).toBe('Cadastro realizado com sucesso');
});