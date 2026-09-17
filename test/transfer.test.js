const test = require('node:test');
const assert = require('node:assert/strict');
const { createAccounts, transferFunds } = require('../src/transfer');

test('creates the two expected demo accounts', () => {
  const accounts = createAccounts();
  assert.equal(accounts.ACC001.balance, 1000);
  assert.equal(accounts.PAY001.balance, 500);
});

test('transfers funds and updates both balances', () => {
  const accounts = createAccounts();
  const result = transferFunds(accounts, 'ACC001', 'PAY001', 250);
  assert.equal(result.message, 'Transfer Successful');
  assert.equal(accounts.ACC001.balance, 750);
  assert.equal(accounts.PAY001.balance, 750);
});

test('rejects a transfer amount of zero or less', () => {
  const accounts = createAccounts();
  assert.throws(() => transferFunds(accounts, 'ACC001', 'PAY001', 0), /greater than zero/);
  assert.throws(() => transferFunds(accounts, 'ACC001', 'PAY001', -10), /greater than zero/);
});

test('rejects a transfer between the same account', () => {
  const accounts = createAccounts();
  assert.throws(() => transferFunds(accounts, 'ACC001', 'ACC001', 10), /must be different/);
});

test('rejects a transfer exceeding the available balance (intentional failing test)', () => {
  const accounts = createAccounts();
  assert.throws(
    () => transferFunds(accounts, 'ACC001', 'PAY001', 1500),
    /exceeds available balance/
  );
});
