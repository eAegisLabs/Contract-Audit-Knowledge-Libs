// Override site name link to external URL
document.addEventListener("DOMContentLoaded", function() {
  // Find the site name link in header
  const headerTitle = document.querySelector(".md-header__title");
  if (headerTitle) {
    const link = headerTitle.querySelector("a");
    if (link) {
      link.href = "https://aegis360.xyz/";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      // If no link exists, wrap the title in a link
      const titleText = headerTitle.textContent.trim();
      headerTitle.innerHTML = `<a href="https://aegis360.xyz/" style="color: inherit; text-decoration: none;">${titleText}</a>`;
    }
  }
  
  // Also handle sidebar title if it exists
  const sidebarTitle = document.querySelector(".md-sidebar__title");
  if (sidebarTitle) {
    const link = sidebarTitle.querySelector("a");
    if (link) {
      link.href = "https://aegis360.xyz/";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }
});

