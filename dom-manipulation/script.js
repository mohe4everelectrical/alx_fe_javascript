// script.js

// Step 1: Array of quote objects
const quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
];

// Step 2: Cache key DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Step 3: Function to show a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Clear existing content
  quoteDisplay.innerHTML = "";

  // Create new DOM elements dynamically
  const quoteText = document.createElement("p");
  quoteText.textContent = `"${quote.text}"`;

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `— ${quote.category}`;
  quoteCategory.style.fontStyle = "italic";
  quoteCategory.style.color = "gray";

  // Append new elements
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Step 4: Function to create the "Add Quote" form dynamically
function createAddQuoteForm() {
  // Create form container
  const formContainer = document.createElement("div");
  formContainer.id = "addQuoteForm";

  // Create input for quote text
  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  // Create input for category
  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  // Create Add Quote button
  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  // Append elements to form container
  formContainer.appendChild(textInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  // Append form to body (or anywhere appropriate)
  document.body.appendChild(formContainer);
}

// Step 5: Function to add a quote dynamically
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and its category.");
    return;
  }

  // Add the new quote to the array
  quotes.pu
  // script.js
// Dynamic Quote Generator with localStorage, sessionStorage, and JSON import/export.

// Local storage key
const LS_KEY = "dqg_quotes_v1";          // change version when structure changes
const SS_LAST_QUOTE = "dqg_last_quote";

// Initial default quotes (used only if localStorage is empty)
const defaultQuotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
];

// In-memory array (kept in sync with localStorage)
let quotes = [];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categorySelect = document.getElementById("categorySelect");
const dynamicControls = document.getElementById("dynamicControls");
const clearQuotesBtn = document.getElementById("clearQuotesBtn");

// ---------- Storage helpers ----------
function saveQuotes() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(quotes));
  } catch (err) {
    console.error("Failed to save quotes to localStorage:", err);
    alert("Unable to save quotes to local storage (quota exceeded?).");
  }
}

function loadQuotes() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) {
    quotes = [...defaultQuotes];
    saveQuotes();
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      quotes = parsed;
    } else {
      // malformed — reset to defaults
      quotes = [...defaultQuotes];
      saveQuotes();
    }
  } catch (err) {
    console.error("Failed to parse saved quotes:", err);
    quotes = [...defaultQuotes];
    saveQuotes();
  }
}

// Save last shown quote to sessionStorage
function saveLastShownQuote(quoteObj) {
  try {
    sessionStorage.setItem(SS_LAST_QUOTE, JSON.stringify(quoteObj));
  } catch (err) {
    console.warn("sessionStorage not available:", err);
  }
}

// Try to restore last shown quote (if any) on init
function restoreLastShownQuote() {
  try {
    const raw = sessionStorage.getItem(SS_LAST_QUOTE);
    if (!raw) return false;
    const obj = JSON.parse(raw);
    if (obj && obj.text) {
      renderQuote(obj);
      return true;
    }
  } catch (err) {
    // ignore
  }
  return false;
}

// ---------- UI helpers ----------
function populateCategories() {
  const cats = [...new Set(quotes.map(q => q.category))].sort();
  categorySelect.innerHTML = "";
  // Add an "All" option
  const optAll = document.createElement("option");
  optAll.value = "__ALL__";
  optAll.textContent = "All categories";
  categorySelect.appendChild(optAll);

  cats.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function renderQuote(quote) {
  quoteDisplay.innerHTML = "";
  const pText = document.createElement("p");
  pText.textContent = `"${quote.text}"`;
  pText.style.fontSize = "1.1rem";
  pText.style.marginBottom = "8px";

  const pCat = document.createElement("p");
  pCat.textContent = `— ${quote.category}`;
  pCat.style.fontStyle = "italic";
  pCat.style.color = "#666";
  pCat.style.marginTop = "0";

  quoteDisplay.appendChild(pText);
  quoteDisplay.appendChild(pCat);
}

// ---------- Core features ----------
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const selectedCategory = categorySelect.value;
  const filtered = selectedCategory && selectedCategory !== "__ALL__"
    ? quotes.filter(q => q.category === selectedCategory)
    : quotes.slice();

  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const idx = Math.floor(Math.random() * filtered.length);
  const quote = filtered[idx];

  renderQuote(quote);
  saveLastShownQuote(quote);
}

// Create the add-quote form and import/export UI dynamically
function createAddQuoteForm() {
  const container = document.createElement("div");
  container.id = "addQuoteForm";

  // Form inputs
  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";
  textInput.style.width = "45%";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.style.width = "25%";

  const addButton = document.createElement("button");
  addButton.id = "addQuoteBtn";
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", function (e) {
    e.preventDefault();
    addQuote();
  });

  // Export button
  const exportBtn = document.createElement("button");
  exportBtn.textContent = "Export JSON";
  exportBtn.className = "secondary";
  exportBtn.addEventListener("click", exportToJson);

  // Import input
  const importFile = document.createElement("input");
  importFile.type = "file";
  importFile.id = "importFile";
  importFile.accept = ".json,application/json";
  importFile.addEventListener("change", importFromJsonFile);

  // Small notes
  const note = document.createElement("p");
  note.className = "note";
  note.textContent = "You can export all quotes to a JSON file or import a JSON file with an array of quote objects: [{text, category}, ...].";

  // Append
  container.appendChild(textInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);
  container.appendChild(exportBtn);
  container.appendChild(importFile);
  container.appendChild(note);

  dynamicControls.appendChild(container);
}

// Add a new quote (validates and saves)
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  if (!textInput || !categoryInput) {
    alert("Form inputs not available.");
    return;
  }

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and its category.");
    return;
  }

  const newQ = { text, category };
  quotes.push(newQ);
  saveQuotes();

  // update UI
  populateCategories();
  textInput.value = "";
  categoryInput.value = "";
  renderQuote(newQ);
  saveLastShownQuote(newQ);
  alert("Quote added and saved to localStorage.");
}

// Export quotes array to JSON file
function exportToJson() {
  try {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quotes_export_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Export failed:", err);
    alert("Failed to export quotes.");
  }
}

// Import quotes from a user-chosen JSON file
function importFromJsonFile(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const parsed = JSON.parse(e.target.result);

      // Accept either an array of quotes or an object { quotes: [...] }
      let imported = [];
      if (Array.isArray(parsed)) {
        imported = parsed;
      } else if (parsed && Array.isArray(parsed.quotes)) {
        imported = parsed.quotes;
      } else {
        throw new Error("JSON must be an array of quote objects or an object with a 'quotes' array.");
      }

      // Validate imported items and only add valid ones
      const valid = imported.filter(item =>
        item && typeof item.text === "string" && typeof item.category === "string"
      ).map(item => ({ text: item.text.trim(), category: item.category.trim() }));

      if (valid.length === 0) {
        alert("No valid quotes found in file.");
        return;
      }

      // Append and save
      quotes.push(...valid);
      saveQuotes();
      populateCategories();

      // Optionally show the first imported quote
      renderQuote(valid[0]);
      saveLastShownQuote(valid[0]);

      alert(`Imported ${valid.length} quote(s).`);
    } catch (err) {
      console.error("Import failed:", err);
      alert("Failed to import JSON: " + err.message);
    } finally {
      // reset input so user can re-import same file if needed
      event.target.value = "";
    }
  };

  reader.onerror = function () {
    alert("Failed to read file.");
    event.target.value = "";
  };

  reader.readAsText(file);
}

// Clear all saved quotes (with confirmation)
function clearAllSavedQuotes() {
  if (!confirm("This will remove all saved quotes and reset to defaults. Continue?")) return;
  localStorage.removeItem(LS_KEY);
  loadQuotes();
  populateCategories();
  quoteDisplay.textContent = "Quotes reset to defaults.";
}

// ---------- Initialization ----------
function init() {
  loadQuotes();
  createAddQuoteForm();
  populateCategories();

  // Restore last shown quote from session if available, else show nothing
  const restored = restoreLastShownQuote();
  if (!restored) {
    quoteDisplay.textContent = "Choose a category and click 'Show New Quote'.";
  }

  // Listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  categorySelect.addEventListener("change", () => {
    // if user changes category and there's a selected quote shown that doesn't match,
    // we could clear or leave it; here we'll just clear and ask them to click "Show New Quote".
    quoteDisplay.textContent = "Category changed. Click 'Show New Quote' to view.";
  });
  clearQuotesBtn.addEventListener("click", clearAllSavedQuotes);
}

init();
// script.js
// Dynamic Quote Generator with Web Storage + JSON Import/Export

const LOCAL_STORAGE_KEY = "quotesData";
const SESSION_STORAGE_KEY = "lastViewedQuote";

// Step 1: Initialize quotes (load from localStorage if available)
let quotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
];

// Step 2: Cache DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const exportBtn = document.getElementById("exportQuotes");

// Step 3: Show random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Display quote
  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <p style="font-style: italic; color: gray;">— ${quote.category}</p>
  `;

  // Save last viewed quote in sessionStorage
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(quote));
}

// Step 4: Create form dynamically to add quotes
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.id = "addQuoteForm";

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formContainer.appendChild(textInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// Step 5: Add new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please fill in both fields!");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
}

// Step 6: Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quotes));
}

// Step 7: Export quotes to JSON
function exportQuotes() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

// Step 8: Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format: Expected an array.");
      }
    } catch (error) {
      alert("Error importing file: " + error.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Step 9: Load last viewed quote from sessionStorage
function loadLastViewedQuote() {
  const lastQuote = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <p style="font-style: italic; color: gray;">— ${quote.category}</p>
    `;
  }
}

// Step 10: Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
exportBtn.addEventListener("click", exportQuotes);

// Initialize
createAddQuoteForm();
loadLastViewedQuote();

