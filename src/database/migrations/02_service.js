module.exports = {
    up: async function(knex){
        return knex.schema.createTable('service', table => {
            table.increments('id').primary()
            table.string('image')
            table.string('name').notNullable()
            table.string('description').notNullable()
            table.string('kind').notNullable()
            table.decimal('price').notNullable()
        });
    },
    down: async function(knex){
        return knex.schema.dropTable('service');
    }
}