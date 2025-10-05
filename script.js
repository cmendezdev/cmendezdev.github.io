(function () {
  "use strict";

  var navLinks = document.querySelectorAll(".nav-links a");
  var sections = [];
  var observer;

  /* Collect all sections that have an id matching a nav link href */
  navLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href && href.startsWith("#") && href.length > 1) {
      var section = document.getElementById(href.slice(1));
      if (section) {
        sections.push({ link: link, section: section });
      }
    }
  });

  /* Bail if there are no sections to observe */
  if (sections.length === 0) return;

  /* Use IntersectionObserver to highlight the active nav link */
  observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            var href = link.getAttribute("href");
            if (href === "#" + id) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    }
  );

  sections.forEach(function (item) {
    observer.observe(item.section);
  });
})();
