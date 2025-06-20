import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { userService } from './userService.js';
import { taskService } from './taskService.js';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const emailService = {
    subscribe: async (subscription) => {
        if (subscription) {
            const user = await userService.getUserByEmail(subscription.email);
            if (user) {
                return { message: 'This email is already subscribed' }
            }
            else {
                const user = await userService.createUserByEmail(subscription.email);
                await emailService.sendWelcomeEmail(subscription.email);
                await taskService.addTasksByUserId(user.dataValues.id, subscription.csv)
                return { message: 'You have successfully subscribed!' };
            }
        }
    },

    unsubscribe: async (email) => {
        if (email) {
            const user = await userService.getUserByEmail(email);
            if (user) {
                await userService.deleteUserByEmail(email);
                await emailService.sendUnsubscribeEmail(email);
                return { message: 'You have unsubscribed successfully!' };
            }
            else {
                return { message: 'This email is already unsubscribed' }
            }
        }
    },

    sendWelcomeEmail: async (toEmail) => {
        const mailOptions = {
            from: '"Quran Memorizer"',
            to: toEmail,
            subject: 'Welcome to Quran Memorizer!',
            html: `
      <h2>Welcome!</h2>
      <p>Thanks for subscribing. We're excited to help you memorize the Quran.</p>
    `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Welcome email sent to ${toEmail}`);
        } catch (error) {
            console.error('❌ Error sending welcome email:', error);
        }
    },

    sendUnsubscribeEmail: async (toEmail) => {
        const mailOptions = {
            from: '"Quran Memorizer"',
            to: toEmail,
            subject: 'You’ve Unsubscribed',
            html: `
    <h2>Unsubscribed</h2>
    <p>You’ve successfully unsubscribed from Quran Memorizer reminders.</p>
    <p>We hope to see you again soon!</p>
  `
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Unsubscribe email sent to ${toEmail}`);
        } catch (error) {
            console.error('❌ Error sending unsubscribe email:', error);
        }
    },

    prepareReminderEmail: (toEmail, task, start, end) => {
        return {
            from: '"Quran Memorizer"',
            to: toEmail,
            subject: 'Your Daily Quran Reminder',
            html: `
                <h2>${task}</h2>
                <p>${start} -> ${end}</p>
                <p>May Allah help you!</p>
            `
        };
    },
    sendReminderEmail: async (userId, date) => {
        const user = await userService.getUserById(userId)
        const task = await taskService.getTaskByDateAndUserId(userId, date)
        const mailOptions = emailService.prepareReminderEmail(user.email, task.task, task.from, task.to);
        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Reminder email sent to ${user.email}`);
        } catch (error) {
            console.error('❌ Error sending reminder email:', error);
        }
    },

    sendReminders: async (date) => {
        const userIds = await userService.getAllUsersIds();
        userIds.forEach(userId => {
            emailService.sendReminderEmail(userId, date);
        });
    }
};

