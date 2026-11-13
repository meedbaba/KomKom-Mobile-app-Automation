import 'dotenv/config';

export const credentials = {
    valid: {
        email: process.env.VALID_EMAIL,
        password: process.env.VALID_PASSWORD
    },

    invalidPassword: {
        email: process.env.VALID_EMAIL,
        password: process.env.INVALID_PASSWORD
    },

    unregistered: {
        email: process.env.INVALID_EMAIL,
        password: process.env.INVALID_PASSWORD
    }
};