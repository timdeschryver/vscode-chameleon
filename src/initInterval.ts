import chameleonSwitch from "./chameleonSwitch";

let timerInterval: NodeJS.Timeout;

export default function initInterval(timeInterval: number) {
  timerInterval && clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    chameleonSwitch();
  }, timeInterval * 60 * 60 * 1000);
}
