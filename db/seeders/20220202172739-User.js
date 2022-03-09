module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        name: 'клиент', email: 'клиент@', password: '123', geo: '55.36 37.42', tel: '8-800-555', roleId: '1', createdAt: new Date(), updatedAt: new Date(),
      },

      {
        name: 'Курьер', email: 'курьер@', password: '123', geo: '55.36 37.42', tel: '8-800-555', roleId: '2', createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
