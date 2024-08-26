// Form range for number of guests
const guestRangeLabelValue = document.getElementById("rangeValue");
const guestRangeValue = document.getElementById("guestsRange");

// Update the label with the current value
guestRangeValue.addEventListener("input", function () {
  guestRangeLabelValue.textContent = guestRangeValue.value;
});

// Checkbox logic when wedding party checkbox is checked
const weddingPartyCheckbox = document.getElementById("weddingParty");
const formSubmitButton = document.getElementById("submitGuest");

//checkbox event listener
weddingPartyCheckbox.addEventListener("change", function () {
  if (weddingPartyCheckbox.checked) {
    formSubmitButton.insertAdjacentHTML(
      "beforebegin",
      `
        <div id="weddingPartyData">
          <div class="mb-3">
            <label for="guestRole" class="form-label"
              >Guest Role</label>
            <select id="guestRole" class="form-select" aria-label="Default select example">
              <option selected>Choose Role</option>
              <option value="best man">Best Man</option>
              <option value="maid of honor">Maid of Honor</option>
              <option value="groomsman">Groomsman</option>
              <option value="bridesmaid">Bridesmaid</option>
              <option value="usher">Usher</option>
              <option value="mother">Mother</option>
              <option value="father">Father</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="guestRole" class="form-label"
              >Role Class</label>
            <select id="guestRole" class="form-select" aria-label="Default select example">
              <option selected>Choose Role Class</option>
              <option value="groomsmen">Groomsmen</option>
              <option value="bridesmaids">Bridsmaids</option>
              <option value="parents">Parents</option>
            </select>
          </div>
        </div>
      `
    );
  } else {
    console.log("They are NOT in the wedding party!");
    document.getElementById("weddingPartyData").remove();
  }
});

function numberToWords(num) {
  const ones = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (num < 10) {
    return ones[num];
  } else if (num < 20) {
    return teens[num - 10];
  } else if (num < 100) {
    return (
      tens[Math.floor(num / 10)] + (num % 10 !== 0 ? "" + ones[num % 10] : "")
    );
  } else if (num < 1000) {
    return (
      ones[Math.floor(num / 100)] +
      "Hundred" +
      (num % 100 !== 0 ? "" + numberToWords(num % 100) : "")
    );
  } else {
    return "Number out of range";
  }
}

function formatPhoneNumber(number) {
  // Convert the number to a string in case it's provided as a different type
  const cleaned = number.toString().replace(/\D/g, "");

  // Match the first 3 digits, the next 3 digits, and the last 4 digits
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // Return null or an error message if the input is not valid
  return null;
}

function displayGuests(guests) {
  guests.forEach((guest, index) => {
    const textNumber = numberToWords(index);
    const guestPhone = formatPhoneNumber(guest.phone);
    const isWeddingParty = guest.isWeddingParty === true ? "Yes" : "No";
    const guestAllergies = guest.allergies.length ? guest.allergies : "None";
    const guestBlockOutDates = guest.blockOutDates.length
      ? guest.blockOutDates
      : "None";
    document.querySelector(".accordion").insertAdjacentHTML(
      "beforeend",
      `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button
                    class="accordion-button collapsed bg-info-subtle"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${textNumber}"
                    aria-expanded="false"
                    aria-controls="flush-collapse${textNumber}"
                    onclick="this.blur();"
                >
                    ${guest.firstName + " " + guest.lastName}
                </button>
            </h2>
            <div
            id="flush-collapse${textNumber}"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
            >
                <div class="accordion-body">
                    <div class="container">
                      <div class="row border-top border-bottom py-3 mb-2">
                        <div class="col">
                          Number of Guests: ${guest.numOfGuests}
                        </div>
                      </div>
                      <div class="row border-top border-bottom py-3 mb-2">
                        <div class="col">
                          ${guestPhone}
                        </div>
                      </div>
                      <div class="row border-top border-bottom py-1 mb-2">
                        <div class="col">
                          <a href="mailto:${
                            guest.email
                          }" class="btn btn-link">${guest.email}</a>
                        </div>
                      </div>
                      <div class="row border-top border-bottom py-3 mb-2">
                        <div class="col">
                          ${guest.address}
                        </div>
                      </div>
                      <div class="row border-top border-bottom py-3 mb-2">
                        <div class="col">
                          Wedding Party: ${isWeddingParty}
                        </div>
                      </div>
                      <div class="row border-top border-bottom py-3 mb-2">
                        <div class="col">
                          Role in Wedding: ${guest.role}
                        </div>
                      </div>
                      <div class="row border-top border-bottom py-3 mb-2">
                        <div class="col">
                          Role Class: ${guest.roleClass}
                        </div>
                      </div>
                      <div class="row border-top border-bottom py-1 mb-2">
                        <div class="col">
                          <div class="accordion accordion-flush" id="accordionPajamas">
                            <div class="accordian-item">
                              <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-pajamas${textNumber}" aria-expanded="false" aria-controls="flush-collapse-pajamas${textNumber}">
                                  Pajama Sizes
                                </button>
                              </h2>
                              <div id="flush-collapse-pajamas${textNumber}" class="accordion-collapse collapse" data-bs-parent="#accordionPajamas">
                                <div class="accordion-body">
                                  <div class="container">
                                    <div class="row">
                                      <div class="col">Shirt: ${
                                        guest.pajamaSizes.shirt
                                      } </div>
                                    </div>
                                    <div class="row">
                                      <div class="col">Shorts: ${
                                        guest.pajamaSizes.shorts
                                      }</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row border-top border-bottom py-1 mb-2">
                        <div class="col">
                          <div class="accordion accordion-flush" id="accordionFavorites">
                            <div class="accordian-item">
                              <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-favorites${textNumber}" aria-expanded="false" aria-controls="flush-collapse-favorites${textNumber}">
                                  Favorites
                                </button>
                              </h2>
                              <div id="flush-collapse-favorites${textNumber}" class="accordion-collapse collapse" data-bs-parent="#accordionFavorites">
                                <div class="accordion-body">
                                  <div class="container">
                                    <div class="row">
                                      <div class="col">Color: ${
                                        guest.favorites.color
                                      } </div>
                                    </div>
                                    <div class="row">
                                      <div class="col">Snack: ${
                                        guest.favorites.snack
                                      }</div>
                                    </div>
                                    <div class="row">
                                      <div class="col">Candy: ${
                                        guest.favorites.candy
                                      }</div>
                                    </div>
                                    <div class="row">
                                      <div class="col">Alcoholic Drink: ${
                                        guest.favorites.alcohol
                                      }</div>
                                    </div>
                                    <div class="row">
                                      <div class="col">Non-Alcoholic Drink: ${
                                        guest.favorites.nonAlcohol
                                      }</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row border-top border-bottom py-3 mb-2">
                        <div class="col">
                          Allergies: ${guestAllergies}
                        </div>
                      </div>
                      <div class="row border-top border-bottom py-3 mb-2">
                        <div class="col">
                          Block-Out Dates: ${guestBlockOutDates}
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        `
    );
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("/wedding-guests/data")
    .then((response) => response.json())
    .then((guests) => {
      // Use the data as needed in your JavaScript code
      displayGuests(guests);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
