import { sequelize, Task } from '../models/Index.js'
import { parse } from 'csv-parse/sync';

export const userService = {
    getAllTasksByDateAndUserId: async (id, date) => {
        return await Task.findAll({
            where: { user_id: id, date }
        });
    },

    addTasksByUserId: async (userId, csv) => {
        const records = parse(csv, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });

        const tasksToCreate = records.map(row => ({
            user_id: userId,
            date: row.Date,
            task: row.Task,
            from: row.From,
            to: row.To
        }));

        await Task.bulkCreate(tasksToCreate);
        return { success: true, inserted: tasksToCreate.length };
    }
}