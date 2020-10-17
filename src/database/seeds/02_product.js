
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('product').del()
      .then(function () {
        // Inserts seed entries
        return knex('product').insert([
          {image: 'Camisa social masculina.jpg', name: 'Camisa social masculina', kind: 'camisa', description: 'Camisa Social Masculina Manga Longa Slim Fácil Passar', stock: 3, price: 15.00},
          {image: 'Camisa social feminina.jpg', name: 'Camisa social feminina', kind: 'camisa', description: 'Camisa Social Feminina Manga Longa Estilo Romênia na cor preta', stock: 3, price: 15.00},
          {image: 'Calça social masculina.jpg', name: 'Calça social masculina', kind: 'calça', description: 'Calça social masculina confeccionada na cor azul marinho. Possui modelagem reta, dois bolsos frontais e dois bolsos na parte posterior', stock: 3, price: 15.00},
          {image: 'Calça social feminina.jpg', name: 'Calça social feminina', kind: 'calça', description: 'Calça social lisa em poliéster com elastano. Cintura média, passante duplo.', stock: 3, price: 15.00},
          {image: 'Máscara personalizada Batman.jpg', name: 'Máscara personalizada Batman', kind: 'mascara personalizada', description: 'Máscara infantil personalizada . Tema Batman Material 100% poliéster com dupla face em TNT.', stock: 3, price: 15.00},
          {image: 'Máscara personalizada Super Man.jpg', name: 'Máscara personalizada Super Man', kind: 'mascara personalizada', description: 'Estampa personalizada no tecido 100% poliéster Revestimento: 1 camada de TECIDO TRICOLINE 100% ALGODÃO formando uma dupla proteção.', stock: 3, price: 15.00},
          {image: 'Máscara personalizada Flamengo.jpg', name: 'Máscara personalizada Flamengo', kind: 'mascara personalizada', description: 'Confeccionada com Tecido Dupla camada. Tamanho único Adulto ou Infantil', stock: 3, price: 15.00},
          {image: 'Máscara personalizada Hulk.jpg', name: 'Máscara personalizada Hulk', kind: 'mascara personalizada', description: 'Máscara de tecido - Lavável Camada Dulpa ( 1 - 100% tricoline e outra oxford) temos tamanhos: adulto infantil baby (1 a 4 anos) Estampa pode lavar', stock: 3, price: 15.00},
          {image: 'Vestido de festa.jpg', name: 'Vestido de festa', kind: 'vestido', description: 'Vestido de festa., Com alças ombro a ombro. Sem bojo., Todo em renda. Com forro em poliéster', stock: 3, price: 15.00},
          {image: 'Blusa de malha preta.jpg', name: 'Blusa de malha preta', kind: 'blusa', description: 'Blusa Malha MVS Thirty Plus Preto Reativo', stock: 3, price: 15.00}
        ]);
      });
  };
  