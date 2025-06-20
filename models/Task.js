export default (sequelize, DataTypes) => {
    return sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        task: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        from: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        to: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'tasks',
        timestamps: false
    });
};
