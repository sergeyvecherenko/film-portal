export default (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        name: { type: DataTypes.TEXT, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true }
    });
};
