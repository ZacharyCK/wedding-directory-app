const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const numberOfGuests = document.getElementById("guest-range");
const guestEmail = document.getElementById("guest-email");
const guestPhone = document.getElementById("guest-phone");
const guestAddress = document.getElementById("guest-address");
const guestAllergies = document.getElementById("guest-allergies");
const guestBlockOutDate1 = document.getElementById("guest-blockout-date1");

// creating variable for guests displayed in UI
const displayedGuests = [];

function sendGuestToDB(newGuest) {
  fetch("http://localhost:3000/newguest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGuest),
  })
    .then((response) => response.json())
    .then((result) => console.log(result));
}

function resetForm() {
  firstName.value = "";
  lastName.value = "";
  numberOfGuests.value = 0;
  guestEmail.value = "";
  guestPhone.value = "";
  guestAddress.value = "";
  guestAllergies.value = "";
  guestBlockOutDate1.value = "";
  if (document.getElementById("weddingPartyData")) {
    document.getElementById("weddingPartyData").remove();
  }
  document.getElementById("new-guest-btn").click();
}

// submiting the form to add a new guest
const newGuestForm = document.getElementById("new-guest");

newGuestForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const weddingPartyGuest = weddingPartyCheckbox.checked ? true : false;
  let guestRole;
  let roleClass;
  let pjShirtSize;
  let pjShortSize;
  let favoriteColor;
  let favoriteSnack;
  let favoriteCandy;
  let favoriteAlcohol;
  let favoriteNonAlcohol;
  if (document.getElementById("weddingPartyData")) {
    guestRole = document.getElementById("guest-role").value;
    roleClass = document.getElementById("role-class").value;
    pjShirtSize = document.getElementById("pj-shirt-size").value;
    pjShortSize = document.getElementById("pj-short-size").value;
    favoriteColor = document.getElementById("fav-color").value;
    favoriteSnack = document.getElementById("fav-snack").value;
    favoriteCandy = document.getElementById("fav-candy").value;
    favoriteAlcohol = document.getElementById("fav-alc").value;
    favoriteNonAlcohol = document.getElementById("fav-non-alc").value;
  }
  const newGuest = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: guestEmail.value,
    phone: guestPhone.value,
    address: guestAddress.value,
    numOfGuests: numberOfGuests.value,
    allergies: [guestAllergies.value],
    blockOutDates: [guestBlockOutDate1.value],
    isWeddingParty: weddingPartyGuest,
    role: guestRole ? guestRole : "N/A",
    roleClass: roleClass ? roleClass : "N/A",
    pajamaSizes: {
      shirt: pjShirtSize ? pjShirtSize : "N/A",
      shorts: pjShortSize ? pjShortSize : "N/A",
    },
    favorites: {
      color: favoriteColor ? favoriteColor : "N/A",
      snack: favoriteSnack ? favoriteSnack : "N/A",
      candy: favoriteCandy ? favoriteCandy : "N/A",
      alcohol: favoriteAlcohol ? favoriteAlcohol : "N/A",
      nonAlcohol: favoriteNonAlcohol ? favoriteNonAlcohol : "N/A",
    },
  };
  console.log(newGuest);
  displayedGuests.unshift(newGuest);
  displayGuestsInUI();
  sendGuestToDB(newGuest);
  resetForm();
});

// Form range for number of guests
const guestRangeLabelValue = document.getElementById("rangeValue");
const guestRangeValue = document.getElementById("guest-range");

// Update the label with the current value
guestRangeValue.addEventListener("input", function () {
  guestRangeLabelValue.textContent = guestRangeValue.value;
});

// Checkbox logic when wedding party checkbox is checked
const weddingPartyCheckbox = document.getElementById("wedding-party");
const formSubmitButton = document.getElementById("submitGuest");

//checkbox event listener
weddingPartyCheckbox.addEventListener("change", function () {
  if (weddingPartyCheckbox.checked) {
    formSubmitButton.insertAdjacentHTML(
      "beforebegin",
      `
        <div id="weddingPartyData">
          <div class="mb-3">
            <label for="guest-role" class="form-label"
              >Guest Role</label>
            <select id="guest-role" class="form-select" aria-label="Default select example">
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
            <label for="role-class" class="form-label"
              >Role Class</label>
            <select id="role-class" class="form-select" aria-label="Default select example">
              <option selected>Choose Role Class</option>
              <option value="groomsmen">Groomsmen</option>
              <option value="bridesmaids">Bridsmaids</option>
              <option value="parents">Parents</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="pj-shirt-size" class="form-label"
              >Pajama Shirt Size</label>
            <select id="pj-shirt-size" class="form-select" aria-label="Default select example">
              <option selected>Choose Shirt Size</option>
              <option value="extra-small">XS</option>
              <option value="small">S</option>
              <option value="medium">M</option>
              <option value="large">L</option>
              <option value="extra-large">XL</option>
              <option value="extra-extra-large">XXL</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="pj-short-size" class="form-label"
              >Pajama Short Size</label>
            <select id="pj-short-size" class="form-select" aria-label="Default select example">
              <option selected>Choose Short Size</option>
              <option value="extra-small">XS</option>
              <option value="small">S</option>
              <option value="medium">M</option>
              <option value="large">L</option>
              <option value="extra-large">XL</option>
              <option value="extra-extra-large">XXL</option>
            </select>
          </div>
          <div class="mb-3">
                <label for="fav-color" class="form-label"
                  >Favorite Color</label
                >
                <input type="text" class="form-control" id="fav-color" />
          </div>
          <div class="mb-3">
                <label for="fav-snack" class="form-label"
                  >Favorite Snack</label
                >
                <input type="text" class="form-control" id="fav-snack" />
          </div>
          <div class="mb-3">
                <label for="fav-candy" class="form-label"
                  >Favorite Candy</label
                >
                <input type="text" class="form-control" id="fav-candy" />
          </div>
          <div class="mb-3">
                <label for="fav-alc" class="form-label"
                  >Favorite Alcoholic Drink</label
                >
                <input type="text" class="form-control" id="fav-alc" />
          </div>
          <div class="mb-3">
                <label for="fav-non-alc" class="form-label"
                  >Favorite Non-Alcoholic Drink</label
                >
                <input type="text" class="form-control" id="fav-non-alc" />
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

function displayGuestsInUI() {
  const guestElements = document.querySelectorAll(".guest-item");
  guestElements.forEach((guest) => guest.remove());

  displayedGuests.forEach((guest, index) => {
    const listNumber = numberToWords(index);
    const guestPhone = formatPhoneNumber(guest.phone);
    const isWeddingParty = guest.isWeddingParty === true ? "Yes" : "No";
    const guestAllergies = guest.allergies.length ? guest.allergies : "None";
    const guestBlockOutDates = guest.blockOutDates.length
      ? guest.blockOutDates
      : "None";
    document.querySelector(".accordion").insertAdjacentHTML(
      "beforeend",
      `
        <div class="accordion-item guest-item">
            <h2 class="accordion-header">
                <button
                    class="accordion-button collapsed bg-info-subtle"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${listNumber}"
                    aria-expanded="false"
                    aria-controls="flush-collapse${listNumber}"
                    onclick="this.blur();"
                >
                    ${guest.firstName + " " + guest.lastName}
                </button>
            </h2>
            <div
            id="flush-collapse${listNumber}"
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
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-pajamas${listNumber}" aria-expanded="false" aria-controls="flush-collapse-pajamas${listNumber}">
                                  Pajama Sizes
                                </button>
                              </h2>
                              <div id="flush-collapse-pajamas${listNumber}" class="accordion-collapse collapse" data-bs-parent="#accordionPajamas">
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
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-favorites${listNumber}" aria-expanded="false" aria-controls="flush-collapse-favorites${listNumber}">
                                  Favorites
                                </button>
                              </h2>
                              <div id="flush-collapse-favorites${listNumber}" class="accordion-collapse collapse" data-bs-parent="#accordionFavorites">
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

function processGuests(guests) {
  guests.forEach((guest) => {
    // insert each guest into the global
    // guests array
    displayedGuests.push(guest);
  });
  displayGuestsInUI();
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("/wedding-guests/data")
    .then((response) => response.json())
    .then((guests) => {
      // Use the data as needed in your JavaScript code
      processGuests(guests);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
