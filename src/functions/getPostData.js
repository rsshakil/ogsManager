//getPostData.js
import { debugState } from "../store/debugState";
import { fieldState } from "../store/fieldState";
import { useRecoilState, useRecoilValue } from "recoil";

/**
 * Get the data needed in the post requests
 * @returns Json containing various data
 */
function getPostData() {
  const [fieldStateValue, setFieldState] = useRecoilState(fieldState);
  const [recoilDebugStateValue, setRecoilDebugState] = useRecoilState(debugState);

  let sendData = {...fieldStateValue};
  sendData.useTimeMachine = recoilDebugStateValue.useTimeMachine;
  sendData.timeDifference = recoilDebugStateValue.timeDifference;

  return sendData;
}

export default getPostData;