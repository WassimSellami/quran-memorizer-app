import { Sequelize, DataTypes } from 'sequelize';
import taskDefine from './Task.js';
import userDefine from './UserS.js';

const sequelize = new Sequelize(
    process.env.DATABASE_URL
);


const Task = taskDefine(sequelize, DataTypes);
const User = userDefine(sequelize, DataTypes);

Task.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Task, { foreignKey: 'user_id', onDelete: 'CASCADE' });


try {
    await sequelize.authenticate();
    console.log('✅ Connected to Neon PostgreSQL successfully.');
    await sequelize.sync({ force: false });
} catch (error) {
    console.error('❌ Unable to connect:', error);
}
export { sequelize, Task, User };
