import { Sequelize, DataTypes } from 'sequelize';
import config from '../config.cjs';
import taskDefine from './Task.js';
import userDefine from './UserS.js';

const sequelize = new Sequelize(config.development);

const Task = taskDefine(sequelize, DataTypes);
const User = userDefine(sequelize, DataTypes);

Task.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Task, { foreignKey: 'user_id', onDelete: 'CASCADE' });

await sequelize.sync({ force: false });
export { sequelize, Task, User };
