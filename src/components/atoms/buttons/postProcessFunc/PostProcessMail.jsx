
export default function PostProcessMail(functionType, buttonType, button1Destination, button2Destination) {
    console.log('Post process mail clicked.....')
    let callBackFun = async () => console.log('No case matched. Something went wrong... in post process mail');

    switch (buttonType) {
        case "button1":
            callBackFun = async () => {
                return { functionType: functionType, status: 200, destination: `mailto:${button1Destination}` }
            };
            break;
        case "button2":
            callBackFun = async () => {
                return { functionType: functionType, status: 200, destination: `mailto:${button2Destination}` }
            };
            break;
    }

    return callBackFun;
} 