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

  describe('when instantiated', () => {
    let instance;
    let metadata;
    let fake;

    beforeEach(() => {
      const now = Date.now();

      metadata = {
        service: `catpants-${now}`,
        now,
      };

      fake = sinon.replace(console._stdout, 'write', sinon.fake());
    });

    afterEach(sinon.restore);

    it('should support replacing the log formatter', () => {
      const expected = { deeply: { nested: 'json', here: true } };
      instance = logger.createLogger('info', metadata, [], { format: logger.format.json() });

      instance.info(expected);

      // allow mocha to write to the console again
      sinon.restore();

      assert.calledOnce(fake);
      assert.lengthOf(fake.firstCall.args, 1);

      assert.deepEqual(
        JSON.parse(fake.firstCall.firstArg),
        Object.assign({ level: 'info', message: expected }, metadata),
      );
    });
  });
});
