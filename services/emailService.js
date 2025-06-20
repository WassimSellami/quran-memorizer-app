import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const subscriptions = [];

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
            const alreadySubscribed = subscriptions.some(sub => sub.email === subscription.email);
            if (alreadySubscribed) {
                return { message: 'This email is already subscribed' }
            }
            else {
                subscriptions.push(subscription);
                await emailService.sendWelcomeEmail(subscription.email);
                return { message: 'You are successfully subscribed!' };
            }
        }
    },

    unsubscribe: (email) => {
        const index = subscriptions.findIndex(sub => sub.email === email);
        if (index !== -1) {
            subscriptions.splice(index, 1);
            emailService.sendUnsubscribeEmail(email);
            return { message: 'Unsubscribed successfully.' }
        } else {
            return { message: 'Subscription not found.' }
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
    sendReminderEmail: async (toEmail, csv) => {
        const mailOptions = emailService.prepareReminderEmail(toEmail, 'Memorize', 'H1T1', 'H1T2');
        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Reminder email sent to ${toEmail}`);
        } catch (error) {
            console.error('❌ Error sending reminder email:', error);
        }
    },

    sendReminders: () => {
        subscriptions.forEach(sub => {
            emailService.sendReminderEmail(sub.email, sub.csv);
        });
    }
};

