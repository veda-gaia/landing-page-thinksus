export const environment = {
    production: false,

    api: {
        path: 'http://ec2-54-200-130-21.us-west-2.compute.amazonaws.com:3001',
    },
 
    encrypt_key: '5e99d833-bcfa-411e-ad92-97686ca6890c',
    jwt_key: 'e3098c3f-434a-4ca8-96ce-4fbbadc4d5ec',
    socket: {
        notification: {
            host: '',
            path: '/socket/notification',
        }
    },
};
