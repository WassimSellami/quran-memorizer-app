import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or use SMTP provider like SendGrid
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const emailService = {
    subscribe: async (subscription) => {
        if (subscription.email) {
            return 'success !';
        }
        else {
            return 'failure !'
        }
    },
    sendWelcomeEmail: async (toEmail) => {
        const mailOptions = {
            from: '"Quran Memorizer"',
            to: toEmail,
            subject: 'Welcome to Quran Memorizer!',
            html: `
      <h2>Welcome!</h2>
      <p>Thanks for subscribing. We're excited to help you memorize the Quran 🙏.</p>
    `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Welcome email sent to ${toEmail}`);
        } catch (error) {
            console.error('❌ Error sending welcome email:', error);
        }
    }

};

