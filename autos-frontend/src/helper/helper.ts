export const dateFormatter = (date: Date)=> {
    return date.toISOString().slice(0, 10);
}

export const CONSOLE_DEV = (message: any) => {
    if(import.meta.env.DEV) console.log(message);
}

export const seperateThousand = (numberData: number | undefined): string | undefined => {
    return numberData?.toLocaleString('de-DE'); 
};