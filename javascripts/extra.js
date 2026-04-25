// Open all social links in a new tab
document.querySelectorAll(".md-social__link").forEach((link) => {
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener");
});
// Force the 'Back to Top' button to stay visible once scrolled
window.addEventListener("scroll", function() {
  var topButton = document.querySelector(".md-top");
  if (topButton) {
    if (window.scrollY > 200) { // Shows after 200px of scrolling
      topButton.setAttribute("data-md-state", "active");
      topButton.style.hidden = false;
      topButton.style.opacity = "1";
    } else {
      topButton.setAttribute("data-md-state", "");
      topButton.style.opacity = "0";
    }
  }
});
