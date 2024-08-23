document.addEventListener("DOMContentLoaded", function () {
  fetch("/wedding-guests/data")
    .then((response) => response.json())
    .then((guests) => {
      console.log("Guest data from the API:", guests);
      // Use the data as needed in your JavaScript code
    })
    .catch((error) => console.error("Error fetching data:", error));
});
