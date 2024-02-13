// Base URL for the currency conversion API
const base_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// Select dropdown elements and button
const dropdowns = document.querySelectorAll(".dropdowns select");
const button = document.querySelector(".form-button button");

// Select result message element
const message = document.querySelector(".result");

// Select 'from' and 'to' currency select elements
const fromcur = document.querySelector("#from");
const tocur = document.querySelector("#to");

// Function to populate dropdowns with currency codes
const populateDropdowns = () => {
  for (let select of dropdowns) {
    for (let code in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = code;
      newOption.value = code;
      if (select.name === "from" && code === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && code === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change", (event) => {
      updateCountryFlag(event.target);
    });
  }
};

// Function to update country flag based on selected currency code
const updateCountryFlag = (element) => {
  let currentCode = element.value;
  let countryCode = countryList[currentCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Event listener for button click to perform currency conversion
button.addEventListener("click", (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".input-data input");
  let amountValue = amount.value;

  // Check if amount is empty or not a positive number
  if (amountValue === "" || amountValue < 0) {
    amountValue = 1;
    amount.value = "1";
  }
  const url = `${base_url}/${fromcur.value.toLowerCase()}/${tocur.value.toLowerCase()}.json`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      let rate = data[tocur.value.toLowerCase()];
      let finalAmount = rate * amountValue;
      message.innerHTML = `${amount.value} ${fromcur.value} = ${finalAmount} ${tocur.value}`;
    })
    .catch((error) => {
      console.error("Error fetching currency conversion data:", error);
      message.innerHTML = "Error: Unable to fetch currency conversion data";
    });
});

// Populate dropdowns with currency codes
populateDropdowns();
