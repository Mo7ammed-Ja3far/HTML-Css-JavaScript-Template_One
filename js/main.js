const nav = document.querySelector("nav");
const slid = document.querySelector(".slide");
const icon = document.querySelector(".icon");
const landPage = document.querySelector(".land-page");
const random = Array.from(document.querySelectorAll(".random span"));
const bullets = Array.from(document.querySelectorAll(".bulltets span"));
const colors = Array.from(document.querySelectorAll(".colors li"));
const rest = document.getElementById("reset");
const menu = document.getElementById("menu-toggle");
const links = document.querySelector(".links");
if (localStorage.getItem("page-color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("page-color")
  );
}
colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      color.dataset.color
    );
    localStorage.setItem("page-color", color.dataset.color);
  });
});
function dointerval() {
  change = setInterval(function () {
    let num = Math.ceil(Math.random() * 9);
    landPage.style = `background-image: url('media/${
      num < 10 ? "0" + num : num
    }.jpg')`;
    //   console.log(num);
  }, 5000);
  window.onload = {};
}
if (localStorage.getItem("show")) {
  bullets.map((e) => e.classList.remove("active"));

  if (localStorage.getItem("show") == "yes") {
    bullets[0].className = "active";
    nav.classList.remove("disable");
  } else {
    bullets[1].className = "active";
    nav.classList.add("disable");
  }
}
if (localStorage.getItem("change")) {
  random.map((e) => e.classList.remove("active"));

  if (localStorage.getItem("change") == "yes") {
    random[0].className = "active";
    dointerval();
  } else {
    random[1].className = "active";
  }
}
if (bullets[0].classList.contains("active")) {
  try {
    clearInterval(change);
  } catch {}
  dointerval();
}
icon.onclick = function () {
  this.children[0].classList.toggle("fa-spin");
  slid.classList.toggle("open");
};
bullets.forEach((ele) => {
  ele.addEventListener("click", function () {
    bullets.map((e) => e.classList.remove("active"));
    if (ele.innerHTML == "Yes") {
      ele.className = "active";
      nav.classList.remove("disable");
      localStorage.setItem("show", "yes");
    } else {
      nav.classList.add("disable");
      ele.className = "active";
      localStorage.setItem("show", "no");
    }
  });
});
random.forEach((ele) => {
  ele.addEventListener("click", function () {
    random.map((e) => e.classList.remove("active"));
    if (ele.innerHTML == "Yes") {
      console.log("cli");
      ele.className = "active";
      try {
        clearInterval(change);
      } catch (e) {
        clearInterval(change);
        console.log(e);
      }
      dointerval();
      localStorage.setItem("change", "yes");
    } else {
      clearInterval(change);

      ele.className = "active";
      localStorage.setItem("change", "no");
    }
  });
});
// console.log(rest);
rest.onclick = function () {
  random[0].click();
  bullets[0].click();
  colors[0].click();
};
menu.onclick = function (e) {
  e.stopPropagation();
  links.classList.toggle("open");
  this.classList.toggle("open");
};
links.onclick = function (e) {
  e.stopPropagation();
};
document.addEventListener("click", (e) => {
  if (e.target !== links && e.target !== menu) {
    if (menu.classList.contains("open")) {
      links.classList.toggle("open");
      menu.classList.remove("open");
    }
  }
});
