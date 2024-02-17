export const dateFormatter = (date: Date)=> {
    return date.toISOString().slice(0, 10);
}