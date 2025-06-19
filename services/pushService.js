import webpush from 'web-push';
import dotenv from 'dotenv';

dotenv.config();

const VAPID_KEYS = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
    'mailto:your@email.com',
    VAPID_KEYS.publicKey,
    VAPID_KEYS.privateKey
);

export const sendNotification = (subscription, payload) => {
    return webpush.sendNotification(subscription, JSON.stringify(payload));
};