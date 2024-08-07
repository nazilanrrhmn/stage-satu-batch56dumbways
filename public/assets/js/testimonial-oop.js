class Testimonials {
  // Properties
  image = "";
  content = "";
  author = "";

  // Specials Method
  constructor(image, content, author) {
    this.image = image;
    this.content = content;
    this.author = author;
  }

  // Method
  html() {
    return `
      <div class="testimonial">
        <img 
          src="${this.image}"
          class="profile-testi"
        />
        <p class="quotes">${this.content}</p>
        <p class="authors">${this.author}</p>
      </div>
    `;
  }
}

const testimonial1 = new Testimonials(
  "https://images.pexels.com/photos/20877343/pexels-photo-20877343/free-photo-of-hitam-dan-putih-hitam-putih-hitam-putih-hitam-putih.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "Children are the most beautiful gift for us.",
  "Lunanina"
);
const testimonial2 = new Testimonials(
  "https://images.pexels.com/photos/18344327/pexels-photo-18344327/free-photo-of-kota-wanita-perempuan-kaum-wanita.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
  "Being beautiful is expensive",
  "Odeliana"
);
const testimonial3 = new Testimonials(
  "https://images.pexels.com/photos/27054257/pexels-photo-27054257/free-photo-of-laut-mode-fashion-fesyen.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
  "Today's Nature shoot",
  "Orielani"
);
const testimonial = [testimonial1, testimonial2, testimonial3];

let testimonialHTML = ``;

for (let i = 0; i < testimonial.length; i++) {
  // console.log(testimonial[i].html());
  testimonialHTML += testimonial[i].html();
}

document.getElementById("testimonials-list").innerHTML = testimonialHTML;
