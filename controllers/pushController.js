import { sendNotification } from '../services/pushService.js';

const subscriptions = [];
let notifNumber = 0;

export const subscribe = (req, res) => {
    const subscription = req.body;

    // Avoid duplicate subscriptions
    const alreadySubscribed = subscriptions.some(sub => sub.endpoint === subscription.endpoint);
    if (!alreadySubscribed) {
        subscriptions.push(subscription);
        console.log('New client subscribed');
    } else {
        console.log('Client already subscribed');
    }

    return res.status(201).json({ message: 'Subscribed successfully.' });
};

export const unsubscribe = (req, res) => {
    const { endpoint } = req.body;

    const index = subscriptions.findIndex(sub => sub.endpoint === endpoint);
    if (index !== -1) {
        subscriptions.splice(index, 1);
        console.log('Client unsubscribed');
        return res.status(200).json({ message: 'Unsubscribed successfully.' });
    } else {
        return res.status(404).json({ message: 'Subscription not found.' });
    }
};

export const sendReminders = () => {
    notifNumber++;
    const payload = {
        notification: {
            title: 'Reminder',
            body: `Look at the sky! n: ${notifNumber}`,
            tag: 'reminder',
        }
    };

    subscriptions.forEach(sub => {
        sendNotification(sub, payload).catch(err => console.error('Push error:', err));
    });
};
