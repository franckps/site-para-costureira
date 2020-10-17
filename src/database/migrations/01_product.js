module.exports = {
    up: async function(knex){
        return knex.schema.createTable('product', table => {
            table.increments('id').primary()
            table.string('image')
            table.string('name').notNullable()
            table.string('description').notNullable()
            table.string('kind').notNullable()
            table.decimal('price').notNullable()
            table.integer('stock').notNullable()
        });
    },
    down: async function(knex){
        return knex.schema.dropTable('product');
    }
}