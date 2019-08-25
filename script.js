function checkForVisibility() {
var lastScrollTop = 0;
var st = window.pageYOffset || document.documentElement.scrollTop; 
var sections = document.querySelectorAll(".section");
sections.forEach(function(section) {
  
  let iceCream = section.querySelector('.ice-cream');
  
  if (st > lastScrollTop && isElementInViewport(section)){
    
    
    iceCream.classList.add("ice-cream-visible")
    // iceCream
    iceCream.dataset.isVisible = "true";
    // downscroll code
  }
  
    else {
      // upscroll code
      if(iceCream.dataset.isVisible == "false")return
      
      iceCream.classList.remove("ice-cream-visible");
      iceCream.dataset.isVisible == "false"
    }
  });
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}

//_______________________Scroll check__________________



  function isElementInViewport (el) {
    let rect = el.getBoundingClientRect();
  
    return (
      rect.top  + rect.height/2 < window.innerHeight/2
    );
  }
  
  if (window.addEventListener) {
    addEventListener('DOMContentLoaded', checkForVisibility, false); 
    addEventListener('load', checkForVisibility, false);
    addEventListener('scroll', checkForVisibility, false)
    addEventListener('scroll', checkTopping, false)
    addEventListener('scroll', parallax, false)
    /* Lyssna på scroll-eventet, och kör funktionen checkForVisibility */
  }
  
  
  
  
  // Sprinkels_________________________________
  
  //min funktion
  const staggerVisualizerEl = document.querySelector('.stagger-visualizer');
  const fragment = document.createDocumentFragment();
  const grid = [25, 25];
  const col = grid[0];
  const row = grid[1];
  const numberOfElements = col * row;
  for (let i = 0; i < numberOfElements; i++) {
    const ourColors = ['#563A34', '#F68A91', '#F9EBD3', '#FDF9F2']
    var div = document.createElement('div');
    div.style.backgroundColor = ourColors[Math.floor(Math.random() * 7)];
  div.style.opacity = '0';
  fragment.appendChild(div);
}
staggerVisualizerEl.appendChild(fragment);
let topping = {
  arrive: function () {
    const staggersAnimation = anime.timeline({
      targets: '.section .stagger-visualizer div',
      delay: 0,
      loop: false,
        autoplay: false,
        duration: 0,
      })
      .add({ //splashar
        opacity: 1,
        translateX: () => anime.random(5000, 1000),
        translateY: () => anime.random(-1, 1),
        delay: anime.stagger(3, {
          from: 'first'
        })
      })
      .add({
        translateX: () => anime.random(-30, 120),
        translateY: () => anime.random(110, 80),
        scale: .5,
        rotate: function () {
          return Math.floor(Math.random() * 1000)
        },
        duration: 200,
        delay: anime.stagger(100, {
          grid: grid,
          from: 'center'
        })
      })
      .add({
        delay: anime.stagger(20, {
          grid: grid,
          from: 'center',
        })
      })
      staggersAnimation.play();
    }, //arrive
  disappear: function () {
    const staggersAnimation = anime.timeline({
      targets: '.stagger-visualizer div',
        delay: 0,
        loop: false,
        duration: 0,
      })
      .add({ //splashar
        opacity: 1,
        translateX: () => anime.random(-5000, 5000),
        translateY: () => anime.random(-1000, 1000),
        delay: anime.stagger(3, {
          from: 'last'
        }),
        duration: 500
      })
    }
  } //obj

  const stagger = document.querySelector('.stagger-visualizer');
  const sprinkles = document.querySelector('.sprinkles');
  function checkTopping() {
  console.log(sprinkles);
  
  if (isElementInViewport(sprinkles)) {
    if (sprinkles.dataset.hasAnimated == "false") {
      sprinkles.dataset.hasAnimated = "true"
      // sprinkles.style.position = 'fixed';
      
      topping.arrive();
      sprinkles.dataset.hasDisappeared = "false"
    }
  } else {
    if (sprinkles.dataset.hasDisappeared == "true") return;
    topping.disappear();
    sprinkles.dataset.hasDisappeared = "true"
    sprinkles.dataset.hasAnimated = "false"
  }
  
}


function parallax() {
  let images = document.querySelectorAll(".bg_image");
  let multiplier = 0.1;
  
  images.forEach(function (bg_image, i) {
      let distance = window.scrollY;
      if (i % 2) {
          bg_image.style.transform = "translateX(-" + distance * multiplier + "px)";
      } else {
          bg_image.style.transform = "translateX(" + distance * multiplier + "px)";
      }
  });
}
