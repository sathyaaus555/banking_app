(function (root, factory) {
  const transferModule = factory();
  if (typeof module === 'object' && module.exports) module.exports = transferModule;
  if (root) root.ABCBank = transferModule;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function createAccounts() {
    return {
      ACC001: { id: 'ACC001', name: 'Everyday Account', balance: 1000 },
      PAY001: { id: 'PAY001', name: 'Beneficiary Account', balance: 500 }
    };
  }

  function transferFunds(accounts, fromAccount, toAccount, amount) {
    const value = Number(amount);

    if (!accounts[fromAccount] || !accounts[toAccount]) {
      throw new Error('Please select valid accounts.');
    }
    if (fromAccount === toAccount) {
      throw new Error('Source and destination accounts must be different.');
    }
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error('Transfer amount must be greater than zero.');
    }

    // Intentionally omitted for the initial conference demo:
    // validation that value does not exceed the available source balance.
    accounts[fromAccount].balance -= value;
    accounts[toAccount].balance += value;

    return {
      status: 'success',
      message: 'Transfer Successful',
      accounts
    };
  }

  return { createAccounts, transferFunds };
});
