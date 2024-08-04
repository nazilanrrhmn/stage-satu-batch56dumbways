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
        <div class="testimonial-card">
          <div class="card">
            <img 
              src="${testimonial.images}"
              class="card-img-top"
              alt="Testimonial image"
            />
            <div class="card-body">
              <p class="card-text">"${testimonial.content}"</p>
              <p class="card-title">${testimonial.author}</p>
              <div class="star-rating">
                ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}
                ${'<i class="far fa-star"></i>'.repeat(5 - testimonial.rating)}
              </div>
            </div>
          </div>
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
        <div class="testimonial-card">
          <div class="card">
            <img 
              src="${testimonial.images}"
              class="card-img-top"
              alt="Testimonial image"
            />
            <div class="card-body">
              <p class="card-text">"${testimonial.content}"</p>
              <p class="card-title">${testimonial.author}</p>
              <div class="star-rating">
                ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}
                ${'<i class="far fa-star"></i>'.repeat(5 - testimonial.rating)}
              </div>
            </div>
          </div>
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
    const rating = button.textContent.trim().split(" ")[0]; // Get the rating number
    if (rating === "All") {
      allTestimonials();
    } else {
      filterTesti(rating);
    }
  });
});

// Load all testimonials initially
allTestimonials();
