// Open all social links in a new tab
document.querySelectorAll(".md-social__link").forEach((link) => {
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener");
});
var consent = __md_get("__consent")
if (consent && consent.custom) {
  /* The user accepted the cookie */
} else {
  /* The user rejected the cookie */
}
