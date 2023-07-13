
let Open = document.getElementById("open-menu")
Open.addEventListener("click",()=>
{
  var navContainer = document.querySelector('.nav');
  navContainer.classList.toggle('show');
})
window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.nav');
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled');

  } else {
    navbar.classList.remove('scrolled');
  }
});
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,



  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },


})
    // Function to create HTML elements for each array
function createReviewElements(data) {
  const reviewContainer = document.querySelector(".review-container");
  reviewContainer.innerHTML = ""; // Clear previous content
  
  data.forEach(array => {
    const div = document.createElement("div");
    div.className = "review";
    
    array.forEach(line => {
      const paragraph = document.createElement("p");
      if (line.startsWith("First Name:")) {
        const firstName = line.split(":")[1].trim();
        paragraph.textContent = "First Name: " + firstName;
      } else if (line.startsWith("Email:")) {
        const email = line.split(":")[1].trim().replace(/%/g, ""); // Remove all occurrences of "%"
        paragraph.textContent = "Email: " + email;
      } else {
        paragraph.textContent = line;
      }
      div.appendChild(paragraph);
    });
    
    reviewContainer.appendChild(div);
    reviewContainer.appendChild(document.createElement("hr"));
  });
}

// Function to handle the click event on the "Show Reviews" button
document.querySelector(".show-reviews-btn").addEventListener("click", function() {
  const reviewContainer = document.querySelector(".review-container");
  const buttonText = document.querySelector(".show-reviews-btn");

  if (reviewContainer.style.display === "none") {
    // Reviews are hidden, show them
    reviewContainer.style.display = "block";
    buttonText.textContent = "Close Reviews";

    // Read the contents of the form_data.txt file
    fetch("http://localhost:8000/reviews")
      .then(response => response.text())
      .then(data => {
        // Parse the data and extract the arrays
        const reviews = data.split("Array ");
        console.log("1")
        reviews.shift(); // Remove the empty first element
        const reviewData = reviews.map(review => {
          const lines = review.trim().split("\n");
          return lines.map(line => line.trim());
        });

        // Display the reviews on the page
        createReviewElements(reviewData);
      })
      .catch(error => console.error("Error fetching reviews:", error));
  } else {
    // Reviews are visible, hide them
    reviewContainer.style.display = "none";
    buttonText.textContent = "Show Reviews";
  }
});

// function showPage() {
//   var overlay = document.getElementById('pageOverlay');
//   overlay.style.display = 'block';
//   document.body.classList.add('overlay-active');
// }

// function hidePage() {
//   var overlay = document.getElementById('pageOverlay');
//   overlay.style.display = 'none';
//   document.body.classList.remove('overlay-active');
// }