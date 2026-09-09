const form = document.querySelector("#transactionForm");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");

const balanceElement = document.querySelector("#balance");
const incomeElement = document.querySelector("#income");
const expenseElement = document.querySelector("#expense");
const transactionList = document.querySelector("#transactionList");
const transactionCount = document.querySelector("#transactionCount");
const emptyState = document.querySelector("#emptyState");
const clearAllBtn = document.querySelector("#clearAllBtn");

const STORAGE_KEY = "controle-gastos-transactions";

let transactions = loadTransactions();

function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(timestamp) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

function updateSummary() {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expense;

  balanceElement.textContent = formatCurrency(balance);
  incomeElement.textContent = formatCurrency(income);
  expenseElement.textContent = formatCurrency(expense);
}

function renderTransactions() {
  transactionList.innerHTML = "";

  const orderedTransactions = [...transactions].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  orderedTransactions.forEach((transaction) => {
    const item = document.createElement("li");
    item.className = "transaction-item";

    const info = document.createElement("div");
    info.className = "transaction-info";

    const description = document.createElement("strong");
    description.textContent = transaction.description;

    const date = document.createElement("small");
    date.textContent = formatDate(transaction.createdAt);

    info.append(description, date);

    const actions = document.createElement("div");
    actions.className = "transaction-actions";

    const value = document.createElement("span");
    value.className =
      transaction.type === "income" ? "value-income" : "value-expense";
    value.textContent = `${transaction.type === "income" ? "+" : "-"} ${formatCurrency(
      transaction.amount
    )}`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", "Excluir movimentação");
    deleteButton.textContent = "✕";
    deleteButton.addEventListener("click", () => deleteTransaction(transaction.id));

    actions.append(value, deleteButton);
    item.append(info, actions);
    transactionList.appendChild(item);
  });

  const total = transactions.length;
  transactionCount.textContent = `${total} ${total === 1 ? "movimentação" : "movimentações"}`;
  emptyState.hidden = total > 0;
}

function render() {
  updateSummary();
  renderTransactions();
}

function addTransaction(description, amount, type) {
  transactions.push({
    id: crypto.randomUUID(),
    description,
    amount,
    type,
    createdAt: Date.now(),
  });

  saveTransactions();
  render();
}

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  saveTransactions();
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeInput.value;

  if (!description || !Number.isFinite(amount) || amount <= 0) {
    return;
  }

  addTransaction(description, amount, type);

  form.reset();
  typeInput.value = "income";
  descriptionInput.focus();
});

clearAllBtn.addEventListener("click", () => {
  if (transactions.length === 0) return;

  const confirmed = window.confirm(
    "Tem certeza que deseja apagar todas as movimentações?"
  );

  if (!confirmed) return;

  transactions = [];
  saveTransactions();
  render();
});

render();
