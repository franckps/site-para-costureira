module.exports = {
    up: async function(knex){
        return knex.schema.createTable('user', table => {
            table.increments('id').primary()
            table.string('image')
            table.string('name').notNullable()
            table.string('login').unique().notNullable()
            table.string('password').notNullable()
        });
    },
    down: async function(knex){
        return knex.schema.dropTable('user')
    }
}