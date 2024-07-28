const testimonials = [
  {
    images:
      "https://images.pexels.com/photos/20877343/pexels-photo-20877343/free-photo-of-hitam-dan-putih-hitam-putih-hitam-putih-hitam-putih.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Children are the most beautiful gift for us.",
    author: "Lunanina",
    rating: 5,
  },
  {
    images:
      "https://images.pexels.com/photos/18344327/pexels-photo-18344327/free-photo-of-kota-wanita-perempuan-kaum-wanita.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    content: "Being beautiful is expensive",
    author: "Odeliana",
    rating: 1,
  },
  {
    images:
      "https://images.pexels.com/photos/27054257/pexels-photo-27054257/free-photo-of-laut-mode-fashion-fesyen.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    content: "Today's Nature shoot",
    author: "Orielani",
    rating: 2,
  },
];

function allTestimonials() {
  const allTestimonials = testimonials.map((testimonials) => {
    return `
      <div class="testimonial">
        <img 
          src="${testimonials.images}"
          class="profile-testi"
        />
        <p class="quotes">${testimonials.content}</p>
        <p class="authors">${testimonials.author}</p>
      </div>
    `;
  });

  document.getElementById("testimonials-list").innerHTML =
    allTestimonials.join(" ");
}

function testiByRating(rating) {
  const testiByRatingFillter = testimonials.filter((testimonials) => {
    return testimonials.rating == rating;
  });

  const testiByRatingHTML = testiByRatingFillter.map((testimonials) => {
    return `
     <div class="testimonial">
        <img 
          src="${testimonials.images}"
          class="profile-testi"
        />
        <p class="quotes">${testimonials.content}</p>
        <p class="authors">${testimonials.author}</p>
      </div>
    `;
  });

  document.getElementById("testimonials-list").innerHTML =
    testiByRatingHTML.join(" ");
}

allTestimonials();
