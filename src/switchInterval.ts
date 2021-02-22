import chameleonSwitch from './chameleonSwitch'

let timer: NodeJS.Timeout

export default function switchInterval(interval: number) {
  timer && clearInterval(timer)
  timer = setInterval(() => {
    chameleonSwitch()
  }, interval * 60 * 60 * 1000)
}
