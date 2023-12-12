const galleryImages = [
  {
    src: "./assets/gallery/image1.jpg",
    alt: "Image 1"
  },
  {
    src: "./assets/gallery/image2.jpg",
    alt: "Image 2"
  },
  {
    src: "./assets/gallery/image3.jpg",
    alt: "Image 3"
  }
];

const productImages = [
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 49.9,
    image: "./assets/products/img6.png"
  },
  {
    title: "Space Odissey",
    author: "Marie Anne",
    price: 35,
    image: "./assets/products/img1.png"
  },
  {
    title: "Doomed City",
    author: "Jason Cobert",
    price: 0,
    image: "./assets/products/img2.png"
  },
  {
    title: "Black Dog",
    author: "John Doe",
    price: 85.35,
    image: "./assets/products/img3.png"
  },
  {
    title: "My Little Robot",
    author: "Pedro Paulo",
    price: 0,
    image: "./assets/products/img5.png"
  },
  {
    title: "Garden Girl",
    author: "Ankit Patel",
    price: 45,
    image: "./assets/products/img4.png"
  }
];

//utility function
function celciusToFahr(temperature) {
  return temperature * (9 / 5) + 32;
}

function navigationHandler() {
  document.querySelector("button#open-nav-menu").addEventListener("click", function () {
    console.log("button#open-nav-menu clicked");
    document.querySelector(".wrapper").style.right = "0";
  });

  document.querySelector("button#close-nav-menu").addEventListener("click", function () {
    console.log("button#open-nav-menu clicked");
    document.querySelector(".wrapper").style.removeProperty("right");

  });
}

function greetingHandler() {
  //Greeting section
  let currentTime = new Date();
  let greetingText = "Welcome!";
  if (currentTime.getHours() < 12) {
    greetingText = "Welcome, Good Morning!";
  }
  else if (currentTime.getHours() < 17) {
    greetingText = "Welcome, Good Afternoon!";
  }
  else if (currentTime.getHours() < 24) {
    greetingText = "Welcome, Good Evening!";
  }
  const weather = "sunny";
  const place = "Kolkata";
  let temperature = 37;

  let celciusWeatherText = `The weather is ${weather} in ${place} and it's ${temperature.toFixed(1)}°C outside.`;
  let fahrWeatherText = `The weather is ${weather} in ${place} and it's ${celciusToFahr(temperature).toFixed(1)}°F outside.`;

  document.querySelector("h1#greeting").innerHTML = greetingText;
  document.querySelector("p#weather").innerHTML = celciusWeatherText;

  document.querySelector("div.weather-group").addEventListener("click", function (e) {
    console.log(e.target.id + " is clicked");
    if (e.target.id == "celsius") {
      document.querySelector("p#weather").innerHTML = celciusWeatherText;
    }
    else if (e.target.id == "fahr") {
      document.querySelector("p#weather").innerHTML = fahrWeatherText;
    }
  });
}

function clockHandler() {
  //standard format in YY-MM-dd
  let localDate = new Date();

  document.querySelector("span[data-time=hours]").innerHTML = localDate.getHours() % 12 || 12;
  document.querySelector("span[data-time=minutes]").innerHTML = localDate.getMinutes();
  document.querySelector("span[data-time=seconds]").innerHTML = localDate.getSeconds();

  setInterval(function () {
    let localDate = new Date();

    document.querySelector("span[data-time=hours]").innerHTML = (localDate.getHours() % 12 || 12).toString().padStart(2, 0);
    document.querySelector("span[data-time=minutes]").innerHTML = localDate.getMinutes().toString().padStart(2, 0);
    document.querySelector("span[data-time=seconds]").innerHTML = localDate.getSeconds().toString().padStart(2, 0);
  }, 1000);
}

function galleryHandler() {
  let mainImage = document.querySelector("#gallery >img");
  let thumbnails = document.querySelector("#gallery .thumbnails")
  mainImage.src = galleryImages[0].src;
  mainImage.alt = galleryImages[0].alt;

  galleryImages.forEach(function (eachImg, index) {
    let thumbnail = document.createElement("img");
    thumbnail.src = eachImg.src;
    thumbnail.alt = eachImg.src;
    thumbnail.dataset.arrayIndex = index;
    thumbnail.dataset.selected = index == 0 ? true : false;
    //Adding eventListener to thumbnail one by one.
    thumbnail.addEventListener("click", function (e) {
      let selectedImage = galleryImages[e.target.dataset.arrayIndex];
      mainImage.src = selectedImage.src;
      mainImage.alt = selectedImage.alt;

      //to make all unselected and select one.
      thumbnails.querySelectorAll("img").forEach(function (img) {
        img.dataset.selected = false;
      });
      e.target.dataset.selected = true;
    })
    thumbnails.appendChild(thumbnail);
  });
}

function productsPopulator(productImages) {
  let productAreaSection = document.querySelector(".products-area");
  productAreaSection.innerHTML="";
  //run a loop through the products and create an html elements("product-item" for each of them.)
  productImages.forEach(function (eachProduct, index) {
    let productItemElm = document.createElement("div");
    productItemElm.classList.add("product-item");
    // create product image
    let eachProductImg = document.createElement("img");
    eachProductImg.src = eachProduct.image;
    eachProductImg.alt = "Image for " + eachProduct.title;

    //define the product details div here and add it to productItem div element
    let eachProductDetailsSection = document.createElement("div");
    eachProductDetailsSection.classList.add("product-details");

    let productTitle = document.createElement("h3");
    productTitle.classList.add("product-title");
    productTitle.textContent = eachProduct.title;

    let productAuthor = document.createElement("p");
    productAuthor.classList.add("product-author");
    productAuthor.textContent = eachProduct.author;

    let productPriceTitle = document.createElement("p");
    productPriceTitle.classList.add("price-title");
    productPriceTitle.textContent = "Price ";

    let productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent = eachProduct.price > 0 ? "$ " + eachProduct.price.toFixed(2) : "Free";

    //append the productDetails one by one.
    eachProductDetailsSection.append(productTitle);
    eachProductDetailsSection.append(productAuthor);
    eachProductDetailsSection.append(productPriceTitle);
    eachProductDetailsSection.append(productPrice);

    //Add all child html elements of the product.
    productItemElm.append(eachProductImg);
    productItemElm.append(eachProductDetailsSection);
    //add the complete individual product to the product section.
    productAreaSection.append(productItemElm);
  }

  );
}

function productsFilter(){
  productsPopulator(productImages);
  document.querySelector(".products-filter label[for=all] span.product-amount").textContent=productImages.length;
  
  let paidProductImages = productImages.filter(eachImages =>eachImages.price>0);
  document.querySelector(".products-filter label[for=paid] span.product-amount").textContent=paidProductImages.length;

  let freeProductImages = productImages.filter(eachImages =>(eachImages.price<=0 || eachImages.price===undefined));
  document.querySelector(".products-filter label[for=free] span.product-amount").textContent=freeProductImages.length;

  // Get all radio buttons and their corresponding labels
const allRadioButton = document.getElementById('all');
const paidRadioButton = document.getElementById('paid');
const freeRadioButton = document.getElementById('free');

// Add a change event listener to each radio button
allRadioButton.addEventListener('change', () => {
    if (allRadioButton.checked) {
        // Perform action for the "All" radio button
        console.log('All radio button selected');
        productsPopulator(productImages);
        
    }
});

paidRadioButton.addEventListener('change', () => {
    if (paidRadioButton.checked) {
        // Perform action for the "Paid" radio button
        console.log('Paid radio button selected');
        productsPopulator(paidProductImages);
        
    }
});

freeRadioButton.addEventListener('change', () => {
    if (freeRadioButton.checked) {
        // Perform action for the "Free" radio button
        console.log('Free radio button selected');
        productsPopulator(freeProductImages);
        
    }
});
}

function footerHandler(){
  let currentYear = new Date().getFullYear();
  document.querySelector("footer").innerHTML=`© ${currentYear} All Right Reserved.`;
}

//On page load
navigationHandler();
greetingHandler();
clockHandler();
galleryHandler();
productsFilter();
footerHandler();
