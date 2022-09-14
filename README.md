# Node Logger

This is a good default configuration of [winston](https://github.com/winstonjs/winston).

## Install

To install in your project, do `npm install @glg/node-logger`.

## Usage

### createLogger

`createLogger(logLevel, metadata, stderrLevels) => Winston.Logger`

Params

| Param        | Type     | Description                                                                 | Default |
|--------------|----------|-----------------------------------------------------------------------------|---------|
| logLevel     | `String` | The minimum severity level to log. [See Log Levels](#log-levels)            | `info`
| metadata     | `Object` | Any extra data you want included in your logging, like what service this is | `{}`
| stderrLevels | `Array`  | Which log levels should be logged to `stderr` instead of `stdout`           | `[]`

```javascript
const { createLogger } = require('node-logger');

const logger = createLogger('info', { service: 'my-service', component: 'index.js' });

logger.info('Some message');
// info: Some message {"service":"my-service","component":"index.js","timestamp":"2019-02-22 15:41:34"}

logger.error('Some other message');
// error: Some other message {"service":"my-service","component":"index.js","timestamp":"2019-02-22 15:41:34"}
```

### Logging JSON (custom format)

```js
const { createLogger, format } = require('node-logger');

const logger = createLogger(
  'info', 
  { service: 'catpants', sha: process.env.GITHUB_SHA }, 
  [], 
  { format: format.json() },
);

logger.log({ 
  level: 'warn',
  message: 'mayday',
});
// {"level":"info","message":"mayday","service":"catpants","sha":"<github-sha-value>"}
```

## Log Levels

This supports the following log levels, in order of decreasing severity:

- emerg
- alert
- crit
- error
- warning
- notice
- info
- debug

If you create a logger with the log level `info` (default), it will log all outputs that are at least an `info` level severity, which would be everything except `debug`.

If you create a logger with the log level `error`, it will only log messages that are `error`, `crit`, `alert`, or `emerg`.

## Local development

To work on this locally, clone it and run `npm install`. You should be good to go.

Be sure to read CONTRIBUTING.md for guidelines on contributing to this repo.
