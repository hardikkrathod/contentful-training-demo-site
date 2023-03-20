// const winston = require('winston');

// const tsFormat = () => (new Date()).toLocaleTimeString();

// const logger = new winston.createLogger({
//   transports: [
//     // colorize the output to the console
//     new (winston.transports.Console)({
//       timestamp: tsFormat,
//       colorize: true,
//     }),
//   ],
// });

// logger.level = 'debug';

// /**
//  * Log some strings
//  * @param {string} level debug, info, silly
//  * @param {string} mod module
//  * @param {string} msg message
//  */
// const log = (level, mod, msg) => {
//   logger.log(level, msg, {
//     module: mod,
//   });
// };

// module.exports = log ;