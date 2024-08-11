"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const color = __importStar(require("colors"));
color.enable();
/**
 * Logger class
 */
class Logger {
    /**
     * Logger constructor
     * @param options The format and levels of the log message.
     * @example
     * const log = new Logger({
     *     format: "[{{level}}] {{date:HH:mm:ss}} {{msg}}",
     *     level: {
     *         Log: {
     *             color: 'white',
     *             use: 'log'
     *         }
     *     }
     * });
     * log.log('Log', "hello world");
     */
    constructor(options) {
        this.format = options.format || "[{{level}}] {{date:HH:mm:ss}} {{msg}}";
        this.level = options.level || {
            log: {
                color: 'white',
                use: 'log',
            }
        };
    }
    /**
     * log
     * @param level The level of the log message
     * @param message The log message
     */
    log(level, message) {
        const levelConfig = this.level[level];
        if (!levelConfig)
            throw new Error(`${level} is not a valid log level`);
        const date = (0, moment_1.default)().format(this.extractDateFormat());
        const formattedMessage = this.formatMessage(level, message, date);
        const outputFn = console[levelConfig.use];
        outputFn(formattedMessage[levelConfig.color]);
    }
    formatMessage(level, message, date) {
        let formatted = this.format;
        formatted = formatted.replace('{{level}}', level);
        formatted = formatted.replace('{{msg}}', message);
        formatted = formatted.replace(/{{date:(.*?)}}/, date);
        return formatted;
    }
    extractDateFormat() {
        const dateFormatMatch = this.format.match(/{{date:(.*?)}}/);
        return dateFormatMatch ? dateFormatMatch[1] : 'YYYY/MM/DD HH:mm:ss';
    }
}
exports.default = Logger;
// Usage example
// const log = new Logger({
//     format: "[{{level}}] {{date:HH:mm:ss}} {{msg}}",
//     level: {
//         Log: {
//             color: 'white',
//             use: 'log'
//         },
//         Error: {
//             color: 'red',
//             use: 'error'
//         }
//     }
// });
// // Now only the defined levels can be used
// log.log('Log', "This is an informational message.");
// log.log('Error', "This is an error message.");
// log.log('Debug', "This will throw an error because 'Debug' is not defined.");
//# sourceMappingURL=index.js.map