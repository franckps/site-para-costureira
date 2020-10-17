module.exports = {
    up: async function(knex){
        return knex.schema.createTable('request', table => {
            table.increments('id').primary()
            table.timestamp('requested_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at')
            table.string('description')
            table.integer('amount').notNullable()
            table.char('state').notNullable().defaultTo('A')
            table.string('state_description')
            table.integer('customer_id').unsigned().notNullable()
            table.foreign('customer_id').references('customer.id')
            table.integer('product_id').unsigned()
            table.foreign('product_id').references('product.id')
            table.integer('service_id').unsigned()
            table.foreign('service_id').references('service.id')
        });
    },
    down: async function(knex){
        return knex.schema.dropTable('request');
    }
}