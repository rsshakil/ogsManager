const RegularExpression = {
    passwordValidation: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])([!"#$%&'()*+\-.\/:;,\\<=>?@\[\]^_{|}0-9A-Za-z]+){8,}$/,
    alphaNumeric: /^[a-z0-9]+$/i,
    alphaLowerCaseNumeric: /^[a-z0-9]+$/,
    couponValidation: /^[a-z0-9-_#]+$/,
    basicAuthenticationPasswordValidation: /^[a-zA-Z0-9]{8,}$/gm,
    urlValidation: /^([a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi,
    zipCode: /^[0-9]{3}-[0-9]{4}$|^$/,
    telNo: /^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$|^$/,
    withoutSpace: /^\S*$/
};

export default RegularExpression;
