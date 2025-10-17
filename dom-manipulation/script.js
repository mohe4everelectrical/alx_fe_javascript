// Initialize quotes array with objects (text + category)
const quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
];

// Cache DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Function to display a random quote
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

  // Append elements to the display container
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Function to add a new quote dynamically
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and its category.");
    return;
  }

  // Add new quote to the array
  quotes.push({ text, category });

  // Clear inputs
  textInput.value = "";
  categoryInput.value = "";

  // Update DOM feedback
  const successMsg = document.createElement("p");
  successMsg.textContent = "Quote added successfully!";
  successMsg.style.color = "green";

  quoteDisplay.innerHTML = "";
  quoteDisplay.appendChild(successMsg);

  // Optionally, display the new quote
  setTimeout(showRandomQuote, 1000);
}

// Add event listener for showing a new quote
newQuoteBtn.addEventListener("click", showRandomQuote);
