export const CONSOLE_DEV = (message) => {
    if (process.env.NODE_ENV === 'development')
        console.log(message);
};
