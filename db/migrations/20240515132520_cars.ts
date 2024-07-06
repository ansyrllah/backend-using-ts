import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
      table.increments('id').primary();
      table.string('cars_name').notNullable();
      table.integer('cars_price').notNullable();
      table.string('cars_image').notNullable();
      table.string('cars_size').notNullable();
      table.string("created_by", 255);
      table.string("updated_by", 255);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars")
}

