export default function PostProcessNone(functionType, buttonType, button1Destination, button2Destination) {
    console.log('Post process None clicked.....')

    let callBackFun = async () => console.log('No case matched. Something went wrong... in post process none');

    switch (buttonType) {
        case "button1":
            callBackFun = async () => {
                return { functionType: functionType, status: 200, destination: button1Destination }
            }
            break;

        case "button2":
            callBackFun = async () => {
                return { functionType: functionType, status: 200, destination: button2Destination };
            }
            break;
    }

    return callBackFun;
} 