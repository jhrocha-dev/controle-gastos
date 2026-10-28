const form = document.querySelector("#transactionForm");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const categoryInput = document.querySelector("#category");
const monthFilter = document.querySelector("#monthFilter");

const balanceElement = document.querySelector("#balance");
const incomeElement = document.querySelector("#income");
const expenseElement = document.querySelector("#expense");
const transactionList = document.querySelector("#transactionList");
const transactionCount = document.querySelector("#transactionCount");
const emptyState = document.querySelector("#emptyState");
const clearAllBtn = document.querySelector("#clearAllBtn");

const STORAGE_KEY = "controle-gastos-transactions";
const categories = {
  income: ["Salário", "Freelance", "Investimentos", "Vendas", "Outros"],
  expense: ["Moradia", "Alimentação", "Transporte", "Saúde", "Educação", "Lazer", "Contas", "Outros"],
};

let transactions = loadTransactions();

function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function updateCategoryOptions() {
  const options = categories[typeInput.value] || categories.expense;
  categoryInput.replaceChildren();

  options.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryInput.appendChild(option);
  });
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

function getMonthKey(timestamp) {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getVisibleTransactions() {
  const selectedMonth = monthFilter.value;
  if (!selectedMonth) return transactions;

  return transactions.filter((transaction) => getMonthKey(transaction.createdAt) === selectedMonth);
}

function updateSummary(visibleTransactions) {
  const income = visibleTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const expense = visibleTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  balanceElement.textContent = formatCurrency(income - expense);
  incomeElement.textContent = formatCurrency(income);
  expenseElement.textContent = formatCurrency(expense);
}

function renderTransactions(visibleTransactions) {
  transactionList.replaceChildren();

  const orderedTransactions = [...visibleTransactions].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  orderedTransactions.forEach((transaction) => {
    const item = document.createElement("li");
    item.className = "transaction-item";

    const info = document.createElement("div");
    info.className = "transaction-info";

    const description = document.createElement("strong");
    description.textContent = transaction.description;

    const details = document.createElement("div");
    details.className = "transaction-details";

    const category = document.createElement("span");
    category.className = `category-tag ${transaction.type === "income" ? "category-income" : "category-expense"}`;
    category.textContent = transaction.category || "Outros";

    const date = document.createElement("small");
    date.textContent = formatDate(transaction.createdAt);
    details.append(category, date);
    info.append(description, details);

    const actions = document.createElement("div");
    actions.className = "transaction-actions";

    const value = document.createElement("span");
    value.className = transaction.type === "income" ? "value-income" : "value-expense";
    value.textContent = `${transaction.type === "income" ? "+" : "-"} ${formatCurrency(Number(transaction.amount))}`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", `Excluir ${transaction.description}`);
    deleteButton.textContent = "✕";
    deleteButton.addEventListener("click", () => deleteTransaction(transaction.id));

    actions.append(value, deleteButton);
    item.append(info, actions);
    transactionList.appendChild(item);
  });

  const total = visibleTransactions.length;
  transactionCount.textContent = monthFilter.value
    ? `${total} ${total === 1 ? "movimentação" : "movimentações"} neste mês`
    : `${total} ${total === 1 ? "movimentação" : "movimentações"}`;

  emptyState.hidden = total > 0;
  if (total === 0) {
    emptyState.textContent = transactions.length > 0
      ? "Nenhuma movimentação encontrada neste mês."
      : "Nenhuma movimentação cadastrada ainda.";
  }
}

function render() {
  const visibleTransactions = getVisibleTransactions();
  updateSummary(visibleTransactions);
  renderTransactions(visibleTransactions);
}

function addTransaction(description, amount, type, category) {
  transactions.push({
    id: crypto.randomUUID(),
    description,
    amount,
    type,
    category,
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

typeInput.addEventListener("change", updateCategoryOptions);
monthFilter.addEventListener("input", render);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);
  const type = typeInput.value;
  const category = categoryInput.value;

  if (!description || !Number.isFinite(amount) || amount <= 0) return;

  addTransaction(description, amount, type, category);
  form.reset();
  typeInput.value = "income";
  updateCategoryOptions();
  descriptionInput.focus();
});

clearAllBtn.addEventListener("click", () => {
  if (transactions.length === 0) return;

  const confirmed = window.confirm("Tem certeza que deseja apagar todas as movimentações?");
  if (!confirmed) return;

  transactions = [];
  saveTransactions();
  render();
});

updateCategoryOptions();
render();
