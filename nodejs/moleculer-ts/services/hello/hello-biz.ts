import { LoggerFormatted } from '../service';

let log: LoggerFormatted;

export function init(iLog: LoggerFormatted) {
    log = iLog;
}

export function say(name: string, age: number) {
    log.info(`Say something by: ${name} | ${age}`);
    return {
        ts: new Date().getTime(),
        data: {
            name,
            age,
        },
    };
}
