export const isMultidimensionalArray = (arr) => {
    if (!Array.isArray(arr)) {
        return false;
    }

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            return true;
        }
    }
    return false;
}

export const thousandSeparatedValue = (value = '', returnValueIfEmpty = '') => {
    if (value) {
        return Number(String(value).replace(/,/g, '')).toLocaleString('en-US');
    }
    return returnValueIfEmpty;
}

export const convertedNumberedValue = (value, returnValueIfEmpty = '') => {
    if (value) {
        return Number(String(value).replace(/,/g, ''));
    }
    return returnValueIfEmpty;
}

export const unixTimestampToDateFormat = (unixTimestamp, time = true,jpFormat=false) => {
    if (unixTimestamp) {
        // Create a Date object from the Unix timestamp
        const date = new Date(unixTimestamp * 1000); // Unix timestamp is in seconds, so multiply by 1000 to convert to milliseconds

        // Extract year, month, day, hour, and minute
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1 and pad with leading zero
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Format the date as "yyyy/MM/dd HH:mm"
        // let value = `${year}/${month}/${day}`;
        let value = `${year}${jpFormat?"年":"/"}${month}${jpFormat?"月":"/"}${day}${jpFormat?"日":""}`;
        if (time) {
            value += ` ${hours}:${minutes}`;
        }
        return value;
    }else{
        console.log("invalidUnixTime");
        return "";
    }
}
