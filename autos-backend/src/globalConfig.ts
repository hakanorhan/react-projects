export const CONSOLE_DEV = (message: any) => {
    if(process.env.NODE_ENV === 'development') console.log(message);
}
