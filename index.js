const winston = require('winston');

const validLogLevels = [
  'emerg',
  'alert',
  'crit',
  'error',
  'warning',
  'notice',
  'info',
  'debug',
];
const levels = validLogLevels.reduce((result, level, index) => {
  result[level] = index;

  return result;
}, {});

module.exports = {
  createLogger: (logLevel='info', metadata={}, stderrLevels=[], { format } = {}) => {
    return winston.createLogger({
      format: format || winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.simple()
      ),
      defaultMeta: metadata,
      level: logLevel,
      levels,
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
          stderrLevels,
        })
      ]
    });
  },
  format: winston.format,
  levels,
  validLogLevels
};
