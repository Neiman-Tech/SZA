
document.addEventListener("DOMContentLoaded", function () {

  const menuItems = document.querySelectorAll(".sidebar nav ul li a");
  menuItems.forEach(item => {
    item.addEventListener("click", function () {
      menuItems.forEach(link => link.classList.remove("active"));
      item.classList.add("active");
    });
  });

  const exploreButtons = document.querySelectorAll(".btn");
  exploreButtons.forEach(button => {
    button.addEventListener("click", function () {
      alert("Exploring...");
    });
  });
});
