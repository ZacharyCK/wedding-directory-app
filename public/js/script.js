// initializing the form input elements
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const numberOfGuests = document.getElementById("guest-range");
const guestEmail = document.getElementById("guest-email");
const guestPhone = document.getElementById("guest-phone");
const guestAddress = document.getElementById("guest-address");
const guestAllergies = document.getElementById("guest-allergies");

// initializing block out date variables
let guestBlockOutDate1 = document.getElementById("guest-blockout-date1");
let guestBlockOutDates = [];
let numberOfDates = 1;

// creating variable for guests displayed in UI
const displayedGuests = [];

// submiting the form to add a new guest
const newGuestForm = document.getElementById("new-guest");

// Form range for number of guests
const guestRangeLabelValue = document.getElementById("rangeValue");
const guestRangeValue = document.getElementById("guest-range");

// Checkbox logic when wedding party checkbox is checked
const weddingPartyCheckbox = document.getElementById("wedding-party");
const formSubmitButton = document.getElementById("submitGuest");

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: makeDateButtonFunctionality
//
// Parameters: None
//
// Summary: This adds an event listener to the add-date-btn. This needs to be
//          in a function because it needs to also be called after we submit a
//          guest because we are removing the entire add blackout dates container
//          which will remove the .add-date-btn element as well, so we need to
//          re-add this event listener.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function makeDateButtonFunctionality() {
  document.querySelector(".add-date-btn").addEventListener("click", (e) => {
    e.preventDefault();

    // increment number of dates variable so we can use that for our
    // attributes in the added date input element
    numberOfDates++;

    const newDateHTML = `
      <label for="guest-blockout-date${numberOfDates}" class="form-label">Block-Out Date ${numberOfDates}</label>
      <input type="date" class="form-control date-form-input" id="guest-blockout-date${numberOfDates}"/>
    `;

    // Inserting the new input element after the previous one
    document
      .querySelector(".add-date-btn")
      .insertAdjacentHTML("beforebegin", newDateHTML);

    // Setting the attribute of the previous block out date to required
    // so user can't leave it blank and insert a date in the input element
    // after it
    document
      .getElementById(`guest-blockout-date${numberOfDates - 1}`)
      .setAttribute("required", "");
  });
}
makeDateButtonFunctionality(); // Initially calling it to add event listener

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: processDates
//
// Parameters: dates
//
// Summary: Pushes dates to guestBlockOutDates array
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function processDates(dates) {
  guestBlockOutDates = [];
  dates.forEach((date) => {
    console.log(date.value);
    guestBlockOutDates.push(date.value);
    console.log(guestBlockOutDates);
  });
  // console.log(guestBlockOutDates);
}

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: sendGuestToDB
//
// Parameters: newGuest
//
// Summary: This function sends a POST request to the server to insert
//          a new guest into the database.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
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

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: resetForm
//
// Parameters: None
//
// Summary: This is called once a new guest is submitted to clear the input fields
//          and close the accoridian that contains the form for inputing new guests
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function resetForm() {
  firstName.value = "";
  lastName.value = "";
  numberOfGuests.value = 0;
  guestEmail.value = "";
  guestPhone.value = "";
  guestAddress.value = "";
  guestAllergies.value = "";
  guestBlockOutDate1.value = "";
  numberOfDates = 1;
  document.querySelector(".dates-block").remove();
  document.querySelector(".allergies-block").insertAdjacentHTML(
    "afterend",
    `
    <div class="mb-3 dates-block">
      <label for="guest-blockout-date1" class="form-label">
        Block-Out Date 1
      </label>
      <input
        type="date"
        class="form-control date-form-input"
        id="guest-blockout-date1"
      />
      <button class="btn add-date-btn">Add Date</button>
    </div>  
  `
  );
  guestBlockOutDate1 = document.getElementById("guest-blockout-date1");
  makeDateButtonFunctionality();
  if (document.getElementById("weddingPartyData")) {
    document.getElementById("weddingPartyData").remove();
  }
  document.getElementById("new-guest-btn").click();
}

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: submit newGuestForm (Event Listener)
//
// Parameters: N/A
//
// Summary: Inserts the new user into the guests array in the application.
//          It calls the functions to add new guests to the user interface and
//          the database.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
newGuestForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log(document.querySelectorAll(".date-form-input"));
  processDates(document.querySelectorAll(".date-form-input"));

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
    blockOutDates:
      guestBlockOutDate1.value !== "" ? [...guestBlockOutDates] : [],
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
  displayedGuests.unshift(newGuest);
  displayGuestsInUI();
  sendGuestToDB(newGuest);
  resetForm();
});

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: input guestRangeValue (Event Listener)
//
// Parameters: N/A
//
// Summary: This event listener changes the label to the corresponding value
//          on the number of guests range input every time it is changed.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
guestRangeValue.addEventListener("input", function () {
  guestRangeLabelValue.textContent = guestRangeValue.value;
});

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: change weddingPartyCheckbox (Event Listener)
//
// Parameters: N/A
//
// Summary: When a user enters in a new guest they can click the checkbox
//          that specifies whether or not that guest is a part of the
//          wedding party. If it is checked, this event handler adds extra
//          fields to get data that only pertains to the wedding party.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
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

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: numberToWords
//
// Parameters: num
//
// Summary: Takes a number value and makes the string version of that number
//          with the number word to go with it. For example, if we pass in the
//          number 5, the return value will be "Five". This is used to specify
//          the id name of each accorian item that contains each guest. Each id
//          of each guest element corresponds the number index they are in
//          the guests array.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
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

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: formatPhoneNumber
//
// Parameters: number
//
// Summary: Takes in a number for the phone number as a string and
//          formats it like this (XXX) XXX-XXXX
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
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

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: formatDate
//
// Parameters: dateInput
//
// Summary: Gets a date input and formats it like MM/DD/YYYY and returns the value
//          as a string.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function formatDate(dateInput) {
  const date = new Date(dateInput);
  // console.log("This is the date coming in " + dateInput);
  // console.log("This is the date to be formated " + date);

  // Extract the UTC month, day, and year
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();

  // Format the date as MM/DD/YYYY
  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: loopDates
//
// Parameters: dates
//
// Summary: Gets an array of dates and formats them and creates one string to
//          return with all the dates separated by a comma.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function loopDates(dates) {
  const dateString = dates
    .map(function (date) {
      return formatDate(date);
    })
    .join(", ");

  return dateString;
}

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: displayGuestsInUI
//
// Parameters: None
//
// Summary: Remove all of the guests in the UI. Loop through the guests
//          in the guest list array, with any new guests, and display them
//          in the UI where the guests need to be listed.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function displayGuestsInUI() {
  const guestElements = document.querySelectorAll(".guest-item");

  guestElements.forEach((guest) => guest.remove());

  displayedGuests.forEach((guest, index) => {
    let guestEmoji = "";
    if (guest.roleClass === "groomsmen") {
      guestEmoji = "🤵‍♂️";
    } else if (guest.roleClass === "bridesmaids") {
      guestEmoji = "👰‍♀️";
    }
    const listNumber = numberToWords(index);
    const guestPhone = formatPhoneNumber(guest.phone);
    const isWeddingParty = guest.isWeddingParty === true ? "Yes" : "No";
    const guestAllergies = guest.allergies.length ? guest.allergies : "None";
    const guestBlockOutDates =
      guest.blockOutDates.length || guest.blockOutDates[0] == true
        ? loopDates(guest.blockOutDates)
        : "None";
    document.querySelector(".accordion").insertAdjacentHTML(
      "beforeend",
      `
        <div class="accordion-item guest-item">
            <h2 class="accordion-header">
                <button
                    class="accordion-button collapsed text-bg-primary"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${listNumber}"
                    aria-expanded="false"
                    aria-controls="flush-collapse${listNumber}"
                    onclick="this.blur();"
                >
                    ${
                      guest.firstName + " " + guest.lastName
                    } <span id="guest-emoji">${guestEmoji}</span>
                </button>
            </h2>
            <div
            id="flush-collapse${listNumber}"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
            >
                <div class="accordion-body py-1 px-1">
                    <div class="container">
                      <div class="row bg-opacity-10 py-0 mb-2">
                        <div class="col d-grid gap-2 px-0">
                          <a class="btn btn-no-radius btn-info btn-info-custom px-4 py-2" id="edit-${
                            guest.firstName
                          }-${guest.lastName}">Edit</a>
                          <a class="btn btn-no-radius btn-danger btn-danger-custom px-4 py-2 btn-delete" id="delete-${
                            guest.firstName
                          }-${guest.lastName}">Delete</a>
                        </div>
                      </div>
                      <div class="row border border-info-subtle bg-info bg-opacity-10 py-3 mb-2">
                        <div class="col">
                          Number of Guests: ${guest.numOfGuests}
                        </div>
                      </div>
                      <div class="row border border-info-subtle bg-info bg-opacity-10 py-3 mb-2">
                        <div class="col">
                          Phone #: ${guestPhone}
                        </div>
                      </div>
                      <div class="row border border-info-subtle bg-info bg-opacity-10 py-1 mb-2">
                        <div class="col">
                          Email: 
                          <a href="mailto:${
                            guest.email
                          }" class="btn btn-link">${guest.email}</a>
                        </div>
                      </div>
                      <div class="row border border-info-subtle bg-info bg-opacity-10 py-3 mb-2">
                        <div class="col">
                          Address: ${guest.address}
                        </div>
                      </div>
                      <div class="row border border-info-subtle bg-info bg-opacity-10 py-3 mb-2">
                        <div class="col">
                          Wedding Party: ${isWeddingParty}
                        </div>
                      </div>
                      <div class="row border border-info-subtle bg-info bg-opacity-10 py-3 mb-2">
                        <div class="col">
                          Role in Wedding: ${guest.role}
                        </div>
                      </div>
                      <div class="row border border-info-subtle bg-info bg-opacity-10 py-3 mb-2">
                        <div class="col">
                          Role Class: ${guest.roleClass}
                        </div>
                      </div>
                      <div class="row border border-info-subtle bg-info bg-opacity-10 py-1 mb-2">
                        <div class="col w-100 p-0">
                          <div class="accordion accordion-flush" id="accordionPajamas">
                            <div class="accordian-item">
                              <h2 class="accordion-header">
                                <button class="accordion-button collapsed bg-light bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-pajamas${listNumber}" aria-expanded="false" aria-controls="flush-collapse-pajamas${listNumber}" onclick="this.blur();">
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
                      <div class="row border border-info-subtle bg-info bg-opacity-10 py-1 mb-2">
                        <div class="col w-100 p-0">
                          <div class="accordion accordion-flush" id="accordionFavorites">
                            <div class="accordian-item">
                              <h2 class="accordion-header">
                                <button class="accordion-button collapsed bg-light bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-favorites${listNumber}" aria-expanded="false" aria-controls="flush-collapse-favorites${listNumber}" onclick="this.blur();">
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
                      <div class="row border border-info-subtle bg-info bg-opacity-10 py-3 mb-2">
                        <div class="col">
                          Allergies: ${guestAllergies}
                        </div>
                      </div>
                      <div class="row border border-info-subtle bg-info bg-opacity-10 py-3 mb-2">
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

    // Add event listeners for delete and edit buttons
    document
      .getElementById(`delete-${guest.firstName}-${guest.lastName}`)
      .addEventListener("click", deleteGuest);

    document
      .getElementById(`edit-${guest.firstName}-${guest.lastName}`)
      .addEventListener("click", editGuestForm);
  });
}

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: deleteGuestFromDB
//
// Parameters: firstName, lastName
//
// Summary: Takes in firstName and lastName of guest that needs
//          to be deleted and sends a delete request to the server.
//          Console.logs the response we get from the server.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
async function deleteGuestFromDB(firstName, lastName) {
  try {
    // URL to pass into the delete http request
    const requestUrl = `/guests?firstName=${firstName}&lastName=${lastName}`;

    // Make a DELETE request using fetch
    const response = await fetch(requestUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is OK (status code 200-299)
    if (response.ok) {
      const result = await response.json();
      console.log("Guest deleted successfully:", result);
    } else {
      // Handle errors (e.g., guest not found, server errors)
      const errorData = await response.json();
      console.error("Error deleting guest:", errorData.message);
    }
  } catch (error) {
    console.error("Error making request:", error);
  }
}

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: deleteGuestFromUI
//
// Parameters: delBtn, fName, lName
//
// Summary: Takes in the delete button that was pressed and removes the parent
//          element that contains the whole of the guest in the UI. We go in
//          and delete the element in the displayedGuests array using the first
//          name and last name to specify the index.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function deleteGuestFromUI(delBtn, fName, lName) {
  // Remove the guest item to be deleted
  delBtn.closest(".guest-item").remove();

  // get the index of the element in the
  // displayed guest array so it can be deleted
  // in the array
  const indexOfDeletedGuest = displayedGuests.findIndex((guest) => {
    return guest.firstName === fName && guest.lastName === lName;
  });

  // cut the deleted guest out of the array
  displayedGuests.splice(indexOfDeletedGuest, 1);
}

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: deleteGuest
//
// Parameters: event
//
// Summary: Gets the first name and last name from the delete buttons id
//          and stores it in two variables to be able to pass into the
//          deleteGuestFromDB and deleteGuestFromUI functions. Call the
//          functions to delete the guest from the database and the
//          user interface respectively.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function deleteGuest(event) {
  // get the first name and last name
  // from the id of the button we pushed
  // so we can delete that specific guest
  const firstName = event.target.id.split("-")[1];
  const lastName = event.target.id.split("-")[2];

  // function to delete the guest from the mongodb database
  deleteGuestFromDB(firstName, lastName);

  // function to delete the guest from the UI
  deleteGuestFromUI(event.target, firstName, lastName);
}

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: editGuestForm
//
// Parameters: event
//
// Summary: shows form to edit the guest
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function editGuestForm(event) {
  // Get the element we will be inserting the form into
  const accordionBody = event.target.closest(".accordion-body");

  // Import the guest data from the displayedGuests array
  // get the first and last name of the guest to query the array
  const firstName = event.target.id.split("-")[1];
  const lastName = event.target.id.split("-")[2];
  // Use the find array method to get the guest object based on firstName and lastName
  const editGuest = displayedGuests.find(
    (guest) => guest.firstName === firstName && guest.lastName === lastName
  );

  console.log(editGuest.blockOutDates);
  const formattedDates = editGuest.blockOutDates.map((date) => {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 10);
  });

  // Dynamically create our form inputs for dates
  // since the number of black out dates varry per guest
  const boDateHTMLElements = formattedDates.reduce(
    (htmlStrAcc, currDate, index, arr) => {
      const isLast = index === arr.length - 1;
      console.log(isLast);
      const htmlStr = `
      <div class="mb-3 dates-block">
          <label for="guest-blockout-date${index + 1}" class="form-label"
            >Block-Out Date ${index + 1}</label
          >
          <input
            type="date"
            class="form-control date-form-input"
            id="guest-blockout-date1"
            value="${currDate}"
          />
          ${isLast ? '<button class="btn add-date-btn">Add Date</button>' : ""}
      </div>
    `;
      return htmlStrAcc + htmlStr;
    },
    ``
  );

  // set a generic form input element for black out dates
  const htmlGenBODates = `
    <div class="mb-3 dates-block">
          <label for="guest-blockout-date1" class="form-label"
            >Block-Out Date 1</label
          >
          <input
            type="date"
            class="form-control date-form-input"
            id="guest-blockout-date1"
          />
          <button class="btn add-date-btn">Add Date</button>
      </div>
  `;

  console.log(boDateHTMLElements);

  const guestAllergies = editGuest.allergies.join(", ");

  // Hide the data for the guest
  event.target.closest(".container").classList.add("hidden");
  // insert the form to edit the guest
  const htmlForm = `
            <form id="new-guest">
              <div class="mb-3">
                <label for="first-name" class="form-label">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="first-name"
                  value="${editGuest.firstName}"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="last-name" class="form-label">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="last-name"
                  value="${editGuest.lastName}"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="guest-range" class="form-label"
                  >Guests: <span id="rangeValue">${
                    editGuest.numOfGuests
                  }</span></label
                >
                <input
                  type="range"
                  class="form-range"
                  min="0"
                  max="5"
                  step="1"
                  value="${editGuest.numOfGuests}"
                  id="guest-range"
                />
              </div>
              <div class="mb-3">
                <label for="guest-email" class="form-label"
                  >Email Address</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="guest-email"
                  value="${editGuest.email}"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="guest-phone" class="form-label">Phone Number</label>
                <input
                  type="text"
                  class="form-control"
                  id="guest-phone"
                  value="${editGuest.phone}"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="guest-address" class="form-label"
                  >Home Address</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="guest-address"
                  value="${editGuest.address}"
                  required
                />
              </div>
              <div class="mb-3 allergies-block">
                <label for="guest-allergies" class="form-label"
                  >Allergies/Food Preferences</label
                >
                <input type="text" class="form-control" id="guest-allergies" value="${guestAllergies}" />
              </div>
              ${boDateHTMLElements === "" ? htmlGenBODates : boDateHTMLElements}
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="wedding-party"
                />
                <label class="form-check-label" for="wedding-party"
                  >Wedding Party?</label
                >
              </div>
              <button type="submit" class="btn btn-primary" id="submitGuest">
                Add Guest
              </button>
            </form>
  `;
  accordionBody.insertAdjacentHTML("afterbegin", htmlForm);
  // populate form fields with current guest data
  // have a button to save data and update
  // have a button to cancel editing
}

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: processGuests
//
// Parameters: guests
//
// Summary: Takes an array for guests acquired when the database was queried
//          and pushes each element into the displayedGuests array. We then
//          call the displayGuestsInUI function to display all the guests
//          in the user interface.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function processGuests(guests) {
  guests.forEach((guest) => {
    // insert each guest into the global
    // guests array
    displayedGuests.push(guest);
  });
  displayGuestsInUI();
}

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
// Function: DOMContentLoaded (Event Listener)
//
// Parameters: N/A
//
// Summary: Runs a function when the page is loaded with the DOM content.
//          The function sends a request to the server that returns the guests
//          from the database and passes it into the processGuests function
//          so the data can be processed on the client side.
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  fetch("/wedding-guests/data")
    .then((response) => response.json())
    .then((guests) => {
      // Use the data as needed in your JavaScript code
      processGuests(guests);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
