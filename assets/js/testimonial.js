// Using Asyn-await
async function fetchUrl(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Network Error!");
  }
}

async function allTestimonials() {
  try {
    const testimonials = await fetchUrl(
      "https://api.npoint.io/e0a6c5ea3c71a63e8576"
    );
    const testimonialsHTML = testimonials
      .map((testimonial) => {
        return `
        <div class="testimonial">
          <img 
            src="${testimonial.images}"
            class="profile-testi"
          />
          <p class="quotes">${testimonial.content}</p>
          <p class="authors">${testimonial.author}</p>
        </div>
      `;
      })
      .join(" ");
    document.getElementById("testimonials-list").innerHTML = testimonialsHTML;
  } catch (error) {
    alert(error.message);
  }
}

async function filterTesti(rating) {
  try {
    const testimonials = await fetchUrl(
      "https://api.npoint.io/e0a6c5ea3c71a63e8576"
    );
    const filteredTestimonials = testimonials.filter((testimonial) => {
      return testimonial.rating == rating;
    });
    const testimonialsHTML = filteredTestimonials
      .map((testimonial) => {
        return `
        <div class="testimonial">
          <img 
            src="${testimonial.images}"
            class="profile-testi"
          />
          <p class="quotes">${testimonial.content}</p>
          <p class="authors">${testimonial.author}</p>
        </div>
      `;
      })
      .join(" ");
    document.getElementById("testimonials-list").innerHTML = testimonialsHTML;
  } catch (error) {
    alert(error.message);
  }
}

// Event listeners for filtering testimonials by rating
document.querySelectorAll(".rating-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const rating = button.textContent.trim();
    if (rating === "All") {
      allTestimonials();
    } else {
      filterTesti(rating);
    }
  });
});

// Load all testimonials initially
allTestimonials();
