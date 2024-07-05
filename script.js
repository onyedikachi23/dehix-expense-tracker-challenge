/** @format */

// select DOM items
const balanceValueEl = document.querySelector(".balance-value");
const totalIncomeValueEl = document.querySelector(".total-income-value");
const totalExpensesValueEl = document.querySelector(".total-expenses-value");
const allEntriesDeleteBtn = document.querySelector(".all-entries-delete-btn");
const transactionEntryForm = document.querySelector("#transaction-entry-form");
const entryTypeSelectEl = document.querySelector("#entry-type-select");
const entryNameInputEl = document.querySelector("#entry-name-input");
const entryAmountInputEl = document.querySelector("#entry-amount-input");
const addEntryBtn = document.querySelector(".add-entry-btn");
const entryTypeText = addEntryBtn.querySelector(".entry-type-text");
const transactionEntriesDetailsContainer = document.querySelector(
	".transactions-entry-details-container"
);

// Add event listeners
allEntriesDeleteBtn.addEventListener("click", deleteAllEntries);

transactionEntryForm.addEventListener("submit", addEntry);

entryTypeSelectEl.addEventListener("change", handleOptionChange);

// declare variables

let addedItemsCount = 0;
let totalIncome = 0;
let totalExpenses = 0;

/* declare functions */

function deleteAllEntries() {
	// clear all transaction entries and update balance, income, and expenses total

	transactionEntriesDetailsContainer.innerHTML = "";

	// update balance and traditionalist
	totalIncome = 0;
	totalExpenses = 0;
	updateBalanceAndTotals("0", "0", "add");
}

function updateBalanceAndTotals(income = 0, expense = 0, updateType) {
	if (updateType === "add") {
		if (income) {
			totalIncome += Number(income);
			totalIncomeValueEl.textContent = totalIncome;
		}
		if (expense) {
			totalExpenses += Number(expense);
			totalExpensesValueEl.textContent = expense;
		}
	} else if (updateType === "delete") {
		if (income) {
			totalIncome = totalIncome - Number(income);
			totalIncomeValueEl.textContent = totalIncome;
		}
		if (expense) {
			totalExpenses = totalExpenses - Number(expense);
			totalExpensesValueEl.textContent = expense;
		}
	}

	// calculate and update balance
	const balance = totalIncome - totalExpenses;
	console.log(balance);
	balanceValueEl.textContent = balance;
}

function handleOptionChange(event) {
	entryTypeText.textContent = event.target.value;
}

function deleteEntry(event) {
	// get the parent element of the delete button and remove the entry from the DOM
	const itemToDeleteContainer = event.currentTarget.parentElement;
	console.log(itemToDeleteContainer);
	const entryAmountValue =
		itemToDeleteContainer.querySelector(".entry-amount").textContent;
	const entryTypeValue =
		itemToDeleteContainer.querySelector(".entry-type").textContent;

	// remove the item
	transactionEntriesDetailsContainer.removeChild(itemToDeleteContainer);

	// update balance and totals
	if (entryTypeValue === "income") {
		console.log("ran income");
		updateBalanceAndTotals(entryAmountValue, null, "delete");
	} else {
		console.log("ran expense");
		updateBalanceAndTotals(null, entryAmountValue, "delete");
	}
}

function addEntry(event) {
	event.preventDefault();

	// get values from form fields
	const entryType = entryTypeSelectEl.value;
	const entryName = entryNameInputEl.value;
	const entryAmount = entryAmountInputEl.value;

	// if the table intro paragraph is there, remove it
	if (addedItemsCount === 0) {
		transactionEntriesDetailsContainer.innerHTML = "";
	}

	const newTableItem = document.createElement("div");
	newTableItem.className = "entry-container";
	newTableItem.innerHTML = `<span class="s-n">${addedItemsCount + 1}</span>
								<span class="entry-name">${entryName}</span>
								<span class="entry-amount">${entryAmount}</span>
								<span class="entry-type">${entryType}</span>
								<button class="entry-delete-btn">
									<i class="ri-chat-delete-line"></i>
								</button>`;

	transactionEntriesDetailsContainer.appendChild(newTableItem);
	const newDeleteItemBtn = newTableItem.querySelector(".entry-delete-btn");
	newDeleteItemBtn.addEventListener("click", deleteEntry);
	addedItemsCount++;

	// update balance and traditionalist
	if (entryType === "income") {
		updateBalanceAndTotals(`${entryAmount}`, null, "add");
	} else {
		updateBalanceAndTotals(null, `${entryAmount}`, "add");
	}
}
