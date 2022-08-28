export class Logger {
  static getTimeLog = (): string => {
    const now = new Date()
    return `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`
  }

  static log = (message: string): void => {
    console.log(Logger.getTimeLog(), ' ', message)
  }

  static error = (message: string): void => {
    console.log(Logger.getTimeLog(), ' ❌ ', message)
  }
}
