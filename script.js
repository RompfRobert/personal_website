const toggleBtn = document.getElementById("theme-toggle")
const currentTheme =
  localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

// 1. Apply stored/system theme on load
document.documentElement.setAttribute("data-theme", currentTheme)
toggleBtn.textContent = currentTheme === "dark" ? "☀️" : "🌙"

// 2. Toggle on click
toggleBtn.addEventListener("click", () => {
  const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"
  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙"
})

// Hamburger menu functionality
const hamburgerToggle = document.getElementById("hamburger-toggle")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

// Toggle hamburger menu
hamburgerToggle.addEventListener("click", () => {
  hamburgerToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
  document.body.classList.toggle("menu-open")
})

// Close menu when clicking on nav links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburgerToggle.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.classList.remove("menu-open")
  })
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburgerToggle.contains(e.target) && !navMenu.contains(e.target)) {
    hamburgerToggle.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.classList.remove("menu-open")
  }
})

// Close menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hamburgerToggle.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.classList.remove("menu-open")
  }
})

// Timeline expand/collapse functionality with smooth animations (mobile only)
function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches
}

function setupTimelineExpanders() {
  const timelineContents = document.querySelectorAll(".timeline-content")

  timelineContents.forEach((tc) => {
    const instruction = tc.querySelector(".expand-instruction")
    const skills = tc.querySelector(".skills")
    const closeBtn = tc.querySelector(".timeline-close-btn")

    if (!instruction || !skills || !closeBtn) return

    // Reset state
    tc.classList.remove("expanded")

    // Remove any existing event listeners by cloning the element
    const newTc = tc.cloneNode(true)
    tc.parentNode.replaceChild(newTc, tc)

    // Get references to elements in the new cloned element
    const newInstruction = newTc.querySelector(".expand-instruction")
    const newSkills = newTc.querySelector(".skills")
    const newCloseBtn = newTc.querySelector(".timeline-close-btn")

    // Only add mobile functionality if we're on mobile
    if (isMobile()) {
      // Function to expand timeline
      const expandTimeline = () => {
        newTc.classList.add("expanded")
        setTimeout(() => {
          newTc.style.cursor = "default"
        }, 400)
      }

      // Function to collapse timeline
      const collapseTimeline = () => {
        newTc.classList.remove("expanded")
        newTc.style.cursor = "pointer"
      }

      // Add click handler for expansion (clicking on the main content area)
      newTc.addEventListener("click", (e) => {
        // Prevent expansion if clicking on links, spans, or the close button
        if (e.target.closest("a") || e.target.closest("span") || e.target.closest(".timeline-close-btn")) {
          return
        }

        const isExpanded = newTc.classList.contains("expanded")

        if (!isExpanded) {
          expandTimeline()
        }
      })

      // Add dedicated close button handler
      newCloseBtn.addEventListener("click", (e) => {
        e.stopPropagation() // Prevent event bubbling
        collapseTimeline()
      })
    } else {
      // Desktop: ensure content is always visible and remove cursor pointer
      newTc.style.cursor = "default"
      newTc.classList.remove("expanded") // Remove any expanded class
    }
  })
}

// Initialize on DOM load and window resize
window.addEventListener("DOMContentLoaded", setupTimelineExpanders)
window.addEventListener("resize", debounce(setupTimelineExpanders, 250))

// Debounce function to prevent excessive resize event handling
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
