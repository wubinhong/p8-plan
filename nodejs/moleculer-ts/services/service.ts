'use strict';
/**
 * This module provide decorated Service drived from 'moleculer'
 */
import {
    Service as moleculerService,
    ServiceBroker, ServiceSchema,
    ServiceSettingSchema
} from 'moleculer';
import 'source-map-support/register'

/**
 * Custom logger instance derive from LoggerInstance in 'moleculer'
 */
export class LoggerFormatted {
    /**
     * Inject logger into class Logger's constructor
     * @param logger logger of Service from 'moleculer'
     */
    constructor(public service: Service) {
        this.service = service;
    }

    private formatter(...args: any[]): string {
        // Sample: "at GreeterService.log (/Users/wubinhong/Workspace/moleculer-ts/services/greeter.service.ts:80:17)"
        let s = new Error().stack.split('\n');
        // let logLoc = s[3].match(/\(.+\/([a-zA-Z0-9_\.]+:\d+:\d+)\)$/)[1];    // Get file name and code line.
        let logLoc = s[3].match(/\(.+\)$/)[0]; // Get file's full name as well as code line.
        return `\n${logLoc}: ${args.join(' ')}\n`;
    }

    fatal(...args: any[]) {
        this.service.logger.fatal(this.formatter(...args));
    }
    error(...args: any[]) {
        this.service.logger.error(this.formatter(...args));
    }
    warn(...args: any[]) {
        this.service.logger.warn(this.formatter(...args));
    }
    info(...args: any[]) {
        this.service.logger.info(this.formatter(...args));
    }
    debug(...args: any[]) {
        this.service.logger.debug(this.formatter(...args));
    }
    trace(...args: any[]) {
        this.service.logger.trace(this.formatter(...args));
    }
}

export class Service<S = ServiceSettingSchema> extends moleculerService {
    log: LoggerFormatted;

    constructor(broker: ServiceBroker, schema?: ServiceSchema<S>) {
        super(broker, schema);
        this.log = new LoggerFormatted(this);
    }
}
