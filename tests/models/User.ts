import { faker } from '@faker-js/faker';

export class UserBuilder {
    static buildAdminUser() {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: "password123",
            administrador: "true"
        };
    }
}

export class ProductBuilder {
    static buildProduct(preco: number, qtd: number) {
        return {
            nome: `${faker.commerce.productName()} ${faker.string.uuid()}`,
            preco: preco,
            descricao: faker.commerce.productDescription(),
            quantidade: qtd
        };
    }
}