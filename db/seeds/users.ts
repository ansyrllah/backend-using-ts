import { Knex } from "knex";
import {encyrptPassword} from "../../app/utils/encrypt";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    const encyrptedPassword = await encyrptPassword('123')

    // Inserts seed entries
    await knex("users").insert([
        { nama: "admin", email: "admin@gmail.com", password: encyrptedPassword, avatar: '', role: 'superadmin' }
    ]);
};
