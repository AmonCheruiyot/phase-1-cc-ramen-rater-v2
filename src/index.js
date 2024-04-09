// API Base URL
const baseURL = 'http://localhost:3000';

// Display all ramen images when the page loads
async function displayRamens() {
  try {
    const response = await fetch(`${baseURL}/ramens`);
    if (!response.ok) {
      throw new Error('Failed to fetch ramens');
    }
    const ramens = await response.json();

    const ramenMenu = document.getElementById('ramen-menu');
    ramenMenu.innerHTML = ''; // Clear previous content

    ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(img);
    });
  } catch (error) {
    console.error(error);
  }
}

// Display detailed ramen info when an image is clicked
function handleClick(ramen) {
  const detailImage = document.querySelector('.detail-image');
  detailImage.src = ramen.image;

  const name = document.querySelector('.name');
  name.textContent = ramen.name;

  const restaurant = document.querySelector('.restaurant');
  restaurant.textContent = ramen.restaurant;

  const ratingDisplay = document.getElementById('rating-display');
  ratingDisplay.textContent = ramen.rating;

  const commentDisplay = document.getElementById('comment-display');
  commentDisplay.textContent = ramen.comment;
}

// Add event listener to form for adding new ramen
function addSubmitListener() {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value
    };

    try {
      const response = await fetch(`${baseURL}/ramens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRamen)
      });

      if (!response.ok) {
        throw new Error('Failed to add new ramen');
      }

      const ramen = await response.json();

      const ramenMenu = document.getElementById('ramen-menu');
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(img);

      // Update the displayed ramens after adding a new one
      displayRamens();
    } catch (error) {
      console.error(error);
    }
  });
}

// Main function to start the program
function main() {
  displayRamens();
  addSubmitListener();
}

// Invoke main function after DOM has loaded
document.addEventListener('DOMContentLoaded', main);
