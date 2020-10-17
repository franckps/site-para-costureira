
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('service').del()
      .then(function () {
        // Inserts seed entries
        return knex('service').insert([
          {image: 'Máscara sem estampa.jpg', name: 'Máscara sem estampa', kind: 'camisa', description: 'Fazer máscara lisa sem estampa simples', price: 15.00},
          {image: 'Máscara estampada.jpg', name: 'Máscara estampada', kind: 'camisa', description: 'Fazer máscara com estampa personalizada e escolhida pelo cliente', price: 15.00},
          {image: 'Vestido de noiva.jpg', name: 'Vestido de noiva', kind: 'camisa', description: 'Fazer vestidos personalizados para noivas ', price: 15.00},
          {image: 'Vestido de gala.jpg', name: 'Vestido de gala', kind: 'camisa', description: 'Fazer vestidos para festas formais de gala', price: 15.00},
          {image: 'Calça jeans.jpg', name: 'Calça jeans', kind: 'camisa', description: 'Fazer calça jeans no gosto do cliente e modelos personalizados', price: 15.00},
          {image: 'Calça de malha.jpg', name: 'Calça de malha', kind: 'camisa', description: 'Faxzer calças de malha no gosto do cliente', price: 15.00},
          {image: 'Calça social.jpg', name: 'Calça social', kind: 'camisa', description: 'Fazer calça social no modelo e no gosto do cliente', price: 15.00},
          {image: 'Bainha de calça.jpg', name: 'Bainha de calça', kind: 'camisa', description: 'Costurar ou diminuir bainha de calça', price: 15.00},
          {image: 'Diminuir calça.jpg', name: 'Diminuir calça', kind: 'camisa', description: 'Diminuir e apertar calça', price: 15.00},
          {image: 'Diminuir vestido.jpg', name: 'Diminuir vestido', kind: 'camisa', description: 'Diminuir e apertar vestidos', price: 15.00}
        ]);
      });
  };
  