import "./style.css";
import data from "./menu.json";

const menuItems = document.querySelector(".menu-items");
const buttons = document.querySelector(".buttons");

window.addEventListener("DOMContentLoaded", function() {
  diplayMenuItems(data.menu);
  displayCategories();
});

const menuItemTemplate = menuItem => {
  return `<div class="col">
    <div class="card mb-3" style="max-width: 540px; card-border-radius: 0px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${menuItem.img}" alt="${menuItem.title}" class="card-img-top photo">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                    <h6 class="card-title">${menuItem.title}</h6>
                    <h6>$${menuItem.price}</h6>
                    </div>
                    <hr/>
                    <p class="card-text">${menuItem.description}</p>
                </div>
            </div>
        </div>
    </div>
    </div>`;
};

const diplayMenuItems = menu => {
  const menuItemsHtml = menu.map(currentMenuItem => {
    return menuItemTemplate(currentMenuItem);
  });

  menuItems.innerHTML = menuItemsHtml.join("");
};

const displayCategories = () => {
  let categories = data.menu.map(menuItem => {
    return menuItem.category;
  });

  let uniqCategories = ["all", ...new Set(categories)];

  let categoriesHtml = uniqCategories.map(category => {
    return `<button type="button" class="btn btn-outline-warning" id="${category}">${category.toUpperCase()}</button>`;
  });

  buttons.innerHTML = categoriesHtml.join(" ");
};

buttons.addEventListener("click", e => {
  const category = e.target.id;

  if (category == "all") {
    diplayMenuItems(data.menu);
  } else {
    const filterdMenu = data.menu.reduce((filterdMenu, menuItems) => {
      if (menuItems.category === category) {
        filterdMenu.push(menuItems);
      }
      return filterdMenu;
    }, []);

    diplayMenuItems(filterdMenu);
  }
});
