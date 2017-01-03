import {
  createWorker,
  sendMessage,
  handleMessage,
  createPromise
} from '../worker-helper.js';

describe('exports', () => {
  it('should export functions', () => {
    expect(createWorker).toBeDefined();
    expect(sendMessage).toBeDefined();
    expect(handleMessage).toBeDefined();
  });
});

describe('sending messages', () => {
  it('should return promise', () => {
    expect(createPromise(0, 'method', [])).toBeInstanceOf(Promise);
  });
  it('should resolve promises', (done) => {
    createPromise(1, 'method', []).then(result => {
      expect(result).toEqual(42);
      done();
    });
    handleMessage({
      data: {
        id: 1,
        result: 42,
      }
    });
  });
  it('should reject promises on error', done => {
    createPromise(1, '', []).catch(err => {
      expect(err).toEqual('error');
      done();
    });
    handleMessage({
      data: {
        id: 1,
        error: 'error'
      }
    });
  });
});
