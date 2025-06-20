import { emailService } from '../services/emailService.js';

const subscriptions = [];

export const subscribe = async (req, res) => {
    var message;
    try {
        const subscription = req.body;
        if (subscription) {
            const alreadySubscribed = subscriptions.some(sub => sub.email === subscription.email);
            if (alreadySubscribed) {
                const response = { message: 'This email is already subscribed' }
                return res.status(201).json({ response });
            }
            else {
                message = await emailService.subscribe(subscription);
                await emailService.sendWelcomeEmail(subscription.email);
                const response = { message: message };
                subscriptions.push(subscription);//move this to service
                return res.status(201).json({ response });
            }
        }
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: 'Internal Server Error' });

    }
};

export const unsubscribe = (req, res) => {
    const { email } = req.body;

    const index = subscriptions.findIndex(sub => sub.email === email);
    if (index !== -1) {
        subscriptions.splice(index, 1);
        const response = { message: 'Unsubscribed successfully.' }
        return res.status(200).json({ response });
    } else {
        const response = { message: 'Subscription not found.' }
        return res.status(200).json({ response });
    }
};

// export const sendReminders = () => {
//     notifNumber++;
//     const payload = {
//         notification: {
//             title: 'Reminder',
//             body: `Look at the sky! n: ${notifNumber}`,
//             tag: 'reminder',
//         }
//     };

//     subscriptions.forEach(sub => {
//         sendNotification(sub, payload).catch(err => console.error('Push error:', err));
//     });
// };
