const form = document.getElementById("add-cost-form");
const responseElement = document.getElementById("response");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the form data
  const userId = form.elements.user_id.value;
  const sum = form.elements.sum.value;
  const category = form.elements.category.value;
  const description = form.elements.description.value;

  // Make a POST request to the /addcost endpoint
  fetch("/addcost", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      sum: sum,
      category: category,
      description: description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((response) => {
      // Display the response from the server
      responseElement.textContent = response;
    })
    .catch((error) => {
      console.error(error);
      responseElement.textContent = "Error adding cost item";
    });
});
