// Open all social links in a new tab
document.querySelectorAll(".md-social__link").forEach((link) => {
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener");
});
