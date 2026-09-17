const loginView = document.querySelector('#loginView');
const dashboardView = document.querySelector('#dashboardView');
const loginForm = document.querySelector('#loginForm');
const transferForm = document.querySelector('#transferForm');
const logoutButton = document.querySelector('#logoutButton');
const transferMessage = document.querySelector('#transferMessage');
const accounts = ABCBank.createAccounts();

const currency = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD'
});

function renderBalances() {
  document.querySelector('#acc001Balance').textContent = currency.format(accounts.ACC001.balance);
  document.querySelector('#pay001Balance').textContent = currency.format(accounts.PAY001.balance);
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  loginView.classList.add('hidden');
  dashboardView.classList.remove('hidden');
  renderBalances();
});

logoutButton.addEventListener('click', () => {
  dashboardView.classList.add('hidden');
  loginView.classList.remove('hidden');
  transferForm.reset();
  transferMessage.textContent = '';
});

transferForm.addEventListener('submit', (event) => {
  event.preventDefault();
  transferMessage.className = 'message';

  try {
    const result = ABCBank.transferFunds(
      accounts,
      document.querySelector('#fromAccount').value,
      document.querySelector('#toAccount').value,
      document.querySelector('#amount').value
    );
    renderBalances();
    transferMessage.textContent = result.message;
    transferMessage.classList.add('success');
    document.querySelector('#amount').value = '';
  } catch (error) {
    transferMessage.textContent = error.message;
    transferMessage.classList.add('error');
  }
});
