const nav = document.querySelector("nav");
const slid = document.querySelector(".slide");
const icon = document.querySelector(".icon");
const landPage = document.querySelector(".land-page");
const random = Array.from(document.querySelectorAll(".random span"));
const bullets = Array.from(document.querySelectorAll(".bulltets span"));
const colors = Array.from(document.querySelectorAll(".colors li"));
const ele = document.getElementById("sp");
const skills = document.querySelectorAll(".our-skills .boxs .parent .prog");
const rest = document.getElementById("reset");
const menu = document.getElementById("menu-toggle");
const links = document.querySelector(".links");
const imgs = document.querySelectorAll(".imgs img");
const imgPlace = document.querySelector(".our-gallery");
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

let observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("hello");

        skills.forEach((skill) => {
          skill.style.width = skill.dataset.prog;
        });
        observer.unobserve(entry.target); // لإيقاف المراقبة بعد الحدث الأول
      }
    });
  },
  { threshold: 0.5 }
);
observer.observe(ele);
imgs.forEach((element) => {
  element.addEventListener("click", openImg);
});

function openImg() {
  let overlay = document.createElement("div");
  let show = document.createElement("div");
  let it = document.createElement("img");
  let pop = document.createElement("div");
  pop.append("X");
  pop.style.cssText =
    "cursor: pointer;top: 0%;position: absolute;background-color: rgb(255, 0, 0);left: 0%;transform: translate(-50%, -50%);border-radius: 50%;color: white;width: 29px;font-weight: bold;font-size: 20px;height: 29px;display: flex;text-align: center;justify-content: center;align-items: center;";
  it.src = this.src;
  it.style.width = "100%";
  show.className = "project";
  show.style.cssText =
    "padding:10px ; top:50% ;position : absolute ;background-color:rgb(255,255,255);left:50%;transform:translate(-50% ,-50%);width:75%";

  overlay.style.cssText = style =
    "position: fixed ; top:0; left:0;width: 100% ;height: 100%;background-color: rgba(0, 0, 0, .7);z-index=10000";
  show.append(pop);

  pop.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("removed");
    it.remove();
    show.remove();
    overlay.remove();
    pop.remove();
  });
  show.append(it);
  overlay.append(show);
  document.body.append(overlay);
}
