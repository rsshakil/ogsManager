
export default function PostProcessCall(functionType, buttonType, button1Destination, button2Destination) {
    console.log('Post process call clicked.....')
    let callBackFun = async () => console.log('No case matched. Something went wrong... in post process call');

    switch (buttonType) {
        case "button1":
            callBackFun = async () => {
                return { functionType: functionType, status: 200, destination: `tel:${button1Destination}` }
            };
            break;
        case "button2":
            callBackFun = async () => {
                return { functionType: functionType, status: 200, destination: `tel:${button2Destination}` }
            };
            break;
    }

    return callBackFun;
} 