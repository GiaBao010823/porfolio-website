// Main JavaScript file
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functions
  initApp()
})

// Initialize application
async function initApp() {
  try {
    // Show preloader
    showPreloader()
    
    // Initialize core functions
    initTypingAnimation()
    initScrollEffects()
    initBackToTop()
    initSmoothScrolling()
    initContactForm()
    
    // Load data and initialize components
    await loadSkills()
    await loadProjects()
    
    // Initialize animations
    initStatsCounter()
    initSkillFilters()
    initAnimationsOnScroll()
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          once: true,
          offset: 100
        })
      }
    }
    
    // Hide preloader
    hidePreloader()
    
  } catch (error) {
    console.error('Error initializing app:', error)
    hidePreloader()
  }
}

// Preloader functions
function showPreloader() {
  const preloader = document.createElement('div')
  preloader.className = 'preloader'
  preloader.innerHTML = '<div class="spinner"></div>'
  document.body.appendChild(preloader)
}

function hidePreloader() {
  setTimeout(() => {
    const preloader = document.querySelector('.preloader')
    if (preloader) {
      preloader.classList.add('fade-out')
      setTimeout(() => preloader.remove(), 500)
    }
  }, 1000)
}

// Typing Animation
function initTypingAnimation() {
  const typedTextElement = document.getElementById("typed-text")
  if (!typedTextElement) return
  
  const texts = [".NET Developer", "Backend Developer", "C# Developer", "Full Stack Developer", "Software Engineer"]
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function type() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typingSpeed = 500
    }

    setTimeout(type, typingSpeed)
  }

  type()
}

// Scroll Effects
function initScrollEffects() {
  const navbar = document.querySelector(".custom-navbar")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const sections = document.querySelectorAll("section[id]")

  if (!navbar) return

  window.addEventListener("scroll", throttle(() => {
    // Navbar scroll effect
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Active nav link highlighting
    let currentSection = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      const href = link.getAttribute("href")?.substring(1)
      if (href === currentSection) {
        link.classList.add("active")
      }
    })
  }, 100))
}

// Load Skills Data
async function loadSkills() {
  try {
    const response = await fetch('data/skills.json')
    const skills = await response.json()
    renderSkills(skills)
  } catch (error) {
    console.error('Error loading skills:', error)
    // Fallback to default skills
    renderDefaultSkills()
  }
}

// Render Skills
function renderSkills(skills) {
  const container = document.getElementById('skills-container')
  if (!container) return

  container.innerHTML = skills.map(skill => `
    <div class="col-lg-4 col-md-6 skill-item" data-category="${skill.category}" data-aos="fade-up">
      <div class="skill-card h-100">
        <div class="skill-header d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center">
            <div class="skill-icon me-3">
              <i class="${skill.icon}"></i>
            </div>
            <h5 class="text-white mb-0">${skill.name}</h5>
          </div>
          <span class="badge bg-warning text-dark">${skill.level}%</span>
        </div>
        <p class="text-light-emphasis mb-3">${skill.description}</p>
        <div class="progress skill-progress">
          <div class="progress-bar bg-warning" style="width: ${skill.level}%"></div>
        </div>
      </div>
    </div>
  `).join('')
}

// Default Skills (fallback)
function renderDefaultSkills() {
  const defaultSkills = [
    {
      name: "C# & .NET",
      icon: "fab fa-microsoft text-primary",
      level: 95,
      category: "backend",
      description: "Object-oriented programming, LINQ, Entity Framework, và .NET ecosystem."
    },
    {
      name: "ASP.NET Core",
      icon: "fas fa-globe text-success",
      level: 90,
      category: "backend",
      description: "Web API, MVC, Razor Pages, middleware, và dependency injection."
    },
    {
      name: "WPF",
      icon: "fas fa-desktop text-info",
      level: 85,
      category: "frontend",
      description: "XAML, MVVM pattern, data binding, và custom controls."
    },
    {
      name: "SQL Server",
      icon: "fas fa-database text-primary",
      level: 88,
      category: "database",
      description: "T-SQL, stored procedures, indexing, và database optimization."
    },
    {
      name: "MySQL",
      icon: "fas fa-database text-warning",
      level: 80,
      category: "database",
      description: "Database design, queries optimization, và performance tuning."
    },
    {
      name: "Supabase",
      icon: "fas fa-cloud text-success",
      level: 75,
      category: "database",
      description: "PostgreSQL, real-time subscriptions, authentication, và storage."
    }
  ]
  
  renderSkills(defaultSkills)
}

// Load Projects Data
async function loadProjects() {
  try {
    const response = await fetch('data/projects.json')
    const projects = await response.json()
    renderProjects(projects)
  } catch (error) {
    console.error('Error loading projects:', error)
    // Fallback to default projects
    renderDefaultProjects()
  }
}

// Render Projects
function renderProjects(projects) {
  const container = document.getElementById('projects-container')
  if (!container) return

  container.innerHTML = projects.map(project => `
    <div class="col-lg-4 col-md-6" data-aos="fade-up">
      <div class="project-card h-100">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" class="img-fluid">
          <div class="project-overlay">
            <div class="project-links">
              <a href="${project.github}" class="btn btn-outline-light btn-sm" target="_blank" rel="noopener">
                <i class="fab fa-github"></i>
              </a>
              <a href="${project.demo}" class="btn btn-warning btn-sm" target="_blank" rel="noopener">
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="project-content">
          <h5 class="text-white mb-2">${project.title}</h5>
          <p class="text-light-emphasis mb-3">${project.description}</p>
          <div class="project-tech">
            ${project.technologies.map(tech => `<span class="badge bg-${tech.color} me-1">${tech.name}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('')
}

// Default Projects (fallback)
function renderDefaultProjects() {
  const defaultProjects = [
    {
      title: "Hệ thống ERP",
      description: "Hệ thống quản lý tài nguyên doanh nghiệp hoàn chỉnh với ASP.NET Core và SQL Server.",
      image: "assets/images/projects/project-1.jpg",
      github: "#",
      demo: "#",
      technologies: [
        { name: "ASP.NET Core", color: "primary" },
        { name: "SQL Server", color: "info" },
        { name: "Bootstrap", color: "success" }
      ]
    },
    {
      title: "Ứng dụng Quản lý Kho",
      description: "Ứng dụng desktop WPF để quản lý kho hàng với báo cáo và thống kê chi tiết.",
      image: "assets/images/projects/project-2.jpg",
      github: "#",
      demo: "#",
      technologies: [
        { name: "WPF", color: "info" },
        { name: "C#", color: "primary" },
        { name: "MySQL", color: "warning" }
      ]
    },
    {
      title: "Microservices API",
      description: "Kiến trúc microservices với .NET Core, Docker và Supabase cho backend scalable.",
      image: "assets/images/projects/project-3.jpg",
      github: "#",
      demo: "#",
      technologies: [
        { name: ".NET Core", color: "success" },
        { name: "Docker", color: "primary" },
        { name: "Supabase", color: "info" }
      ]
    }
  ]
  
  renderProjects(defaultProjects)
}

// Skill Filters
function initSkillFilters() {
  const filterButtons = document.querySelectorAll(".skill-filter")
  const skillItems = document.querySelectorAll(".skill-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")

      skillItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block"
          item.style.animation = "fadeInUp 0.6s ease forwards"
        } else {
          item.style.display = "none"
        }
      })
    })
  })
}

// Stats Counter Animation
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number")
  let animated = false

  function animateStats() {
    if (animated) return

    const statsSection = document.getElementById("about")
    if (!statsSection) return
    
    const rect = statsSection.getBoundingClientRect()

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animated = true

      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-count"))
        let current = 0
        const increment = target / 100
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          stat.textContent = Math.floor(current)
        }, 20)
      })
    }
  }

  window.addEventListener("scroll", throttle(animateStats, 100))
  animateStats() // Check on load
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const message = formData.get("message")

      // Basic validation
      if (!name || !email || !subject || !message) {
        showNotification("Vui lòng điền đầy đủ thông tin!", "error")
        return
      }

      if (!isValidEmail(email)) {
        showNotification("Email không hợp lệ!", "error")
        return
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang gửi...'
      submitBtn.disabled = true

      setTimeout(() => {
        showNotification("Tin nhắn đã được gửi thành công!", "success")
        this.reset()
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop")

  if (backToTopBtn) {
    window.addEventListener("scroll", throttle(() => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show")
      } else {
        backToTopBtn.classList.remove("show")
      }
    }, 100))

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse)
          bsCollapse.hide()
        }
      }
    })
  })
}

// Animations on Scroll
function initAnimationsOnScroll() {
  const animatedElements = document.querySelectorAll(".skill-card, .project-card, .stat-card")

  function checkAnimation() {
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("loaded")
      }
    })
  }

  window.addEventListener("scroll", throttle(checkAnimation, 100))
  checkAnimation() // Check on load
}

// Utility Functions
function throttle(func, limit) {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

function debounce(func, wait, immediate) {
  let timeout
  return function() {
    const context = this, args = arguments
    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification alert alert-${type === "error" ? "danger" : type === "success" ? "success" : "info"}`
  notification.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="fas fa-${type === "error" ? "exclamation-circle" : type === "success" ? "check-circle" : "info-circle"} me-2"></i>
      ${message}
      <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
    </div>
  `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', e.error)
})

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled Promise Rejection:', e.reason)
})
