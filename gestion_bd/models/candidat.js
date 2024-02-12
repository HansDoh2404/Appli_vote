'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Candidat.hasMany(sequelize.define('users'))
    }
  }
  Candidat.init({
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
    vision: DataTypes.TEXT,
    slogan: DataTypes.TEXT,
    nb_voie: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Candidat',
  });
  return Candidat;
};