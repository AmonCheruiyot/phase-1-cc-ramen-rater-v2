document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch and display all ramens
  async function displayRamens() {
    const ramenMenuDiv = document.getElementById('ramen-menu');
    ramenMenuDiv.innerHTML = ''; // Clear previous content

    try {
      const response = await fetch('http://localhost:3000/ramens');
      const ramens = await response.json();

      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenuDiv.appendChild(img);
      });
    } catch (error) {
      console.error('Error fetching ramens:', error);
    }
  }

  // Function to display ramen details
  function handleClick(ramen) {
    const ramenDetailDiv = document.getElementById('ramen-detail');
    ramenDetailDiv.innerHTML = `
      <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
      <h2 class="name">${ramen.name}</h2>
      <h3 class="restaurant">${ramen.restaurant}</h3>
    `;
    document.getElementById('rating-display').textContent = ramen.rating;
    document.getElementById('comment-display').textContent = ramen.comment;
  }

  // Function to handle form submission for adding a new ramen
  async function addSubmitListener() {
    const form = document.getElementById('new-ramen');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const newRamen = {
        name: document.getElementById('new-name').value,
        restaurant: document.getElementById('new-restaurant').value,
        image: document.getElementById('new-image').value,
        rating: parseInt(document.getElementById('new-rating').value),
        comment: document.getElementById('new-comment').value
      };

      try {
        // POST request to add the new ramen
        const response = await fetch('http://localhost:3000/ramens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRamen)
        });

        if (!response.ok) {
          throw new Error('Failed to add new ramen');
        }

        // Display all ramens including the new one
        await displayRamens();
      } catch (error) {
        console.error('Error adding new ramen:', error);
      }

      // Reset the form fields
      form.reset();
    });
  }

  // Main function to start the program logic
  function main() {
    displayRamens(); // Display existing ramens when the page loads
    addSubmitListener(); // Attach submit event listener to add new ramen
  }

  // Call the main function after the DOM has fully loaded
  main();
});
