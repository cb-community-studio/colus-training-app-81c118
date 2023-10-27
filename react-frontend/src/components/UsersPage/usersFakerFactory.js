
import { faker } from "@faker-js/faker";
export default (count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
email: faker.internet.email(),
name: faker.name.firstName(),

        };
        data = [...data, fake];
    }
    return data;
};
