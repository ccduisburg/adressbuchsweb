const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
};
export const convertTimestampToDate = (ts: string | undefined): Date => {
    if (ts !== undefined) return new Date(parseInt(ts));
    return new Date();
};

export const convertAndFormatTimestamp = (ts: string | undefined): string => {
    const date: Date = convertTimestampToDate(ts);
    // console.log(ts);
    // console.log(date, `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`);
    return date.toLocaleDateString('de-DE', options);
};


export const formatDate = (date: Date | undefined): string => {
    if (date !== undefined)  return date.toLocaleDateString('de-DE', options);
    return "";
};


export const convertTimestampToTime = (ts: string | undefined): string => {
    const date: Date = convertTimestampToDate(ts);
    return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}