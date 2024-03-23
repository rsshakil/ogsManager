
export const isNumeric = (value) => {
    const re = /^-?[0-9]\d*(\.\d+)?$/;
    return re.test(value);
}