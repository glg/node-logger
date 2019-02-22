const assert = require('chai').assert;

const logger = require('..');

describe('logger', () => {
  it('should expose createLogger', () => {
    assert.isFunction(logger.createLogger);

    // no required params
    assert.lengthOf(logger.createLogger, 0);
  });

  it('should export levels', () => {
    assert.deepEqual(logger.levels, {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7
    });
  });

  it('should export validLogLevels', () => {
    assert.isArray(logger.validLogLevels);
  });
});
