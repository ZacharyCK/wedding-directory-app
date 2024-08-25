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

function displayGuests(guests) {
  guests.forEach((guest, index) => {
    const textNumber = numberToWords(index);
    document.querySelector(".accordion").insertAdjacentHTML(
      "beforeend",
      `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${textNumber}"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                >
                    ${guest.firstName}
                </button>
            </h2>
            <div
            id="flush-collapse${textNumber}"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
            >
                <div class="accordion-body">
                    <ul>
                        <li>${guest.phone}</li>
                        <li>${guest.email}</li>
                    </ul>
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
