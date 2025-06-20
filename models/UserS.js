export default (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(320),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'users',
        timestamps: false
    });
};