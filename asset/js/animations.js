// Animation utilities and effects

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Initialize scroll animations
function initScrollAnimations() {
  const animateElements = document.querySelectorAll("[data-animate]")
  animateElements.forEach((el) => {
    observer.observe(el)
  })
}

// Parallax effect
function initParallax() {
  const parallaxElements = document.querySelectorAll("[data-parallax]")

  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrolled = window.pageYOffset

      parallaxElements.forEach((element) => {
        const rate = scrolled * -0.5
        element.style.transform = `translateY(${rate}px)`
      })
    }, 16),
  )
}

// Smooth reveal animation
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal")

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active")
    }
  })
}

// Text animation effects
function animateText(element, text, speed = 50) {
  element.textContent = ""
  let i = 0

  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
    } else {
      clearInterval(timer)
    }
  }, speed)
}

// Counter animation
function animateCounter(element, start, end, duration = 2000) {
  const startTime = performance.now()

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const current = Math.floor(start + (end - start) * easeOutQuart(progress))
    element.textContent = current

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    }
  }

  requestAnimationFrame(updateCounter)
}

// Easing functions
function easeOutQuart(t) {
  return 1 - --t * t * t * t
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

// Stagger animation
function staggerAnimation(elements, delay = 100) {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("animate-in")
    }, index * delay)
  })
}

// Particle effect
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.particles = []
    this.resize()

    window.addEventListener("resize", () => this.resize())
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  createParticle(x, y) {
    return {
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1,
      decay: Math.random() * 0.02 + 0.005,
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i]

      particle.x += particle.vx
      particle.y += particle.vy
      particle.life -= particle.decay

      if (particle.life <= 0) {
        this.particles.splice(i, 1)
        continue
      }

      this.ctx.save()
      this.ctx.globalAlpha = particle.life
      this.ctx.fillStyle = "#facc15"
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.restore()
    }

    requestAnimationFrame(() => this.update())
  }

  addParticles(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(x, y))
    }
  }
}

// Mouse trail effect
function initMouseTrail() {
  const canvas = document.createElement("canvas")
  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.pointerEvents = "none"
  canvas.style.zIndex = "1"
  document.body.appendChild(canvas)

  const particles = new ParticleSystem(canvas)
  particles.update()

  document.addEventListener("mousemove", (e) => {
    if (Math.random() < 0.1) {
      particles.addParticles(e.clientX, e.clientY, 1)
    }
  })
}

// Loading animation
function showLoadingAnimation(element) {
  element.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `
}

function hideLoadingAnimation(element, content) {
  setTimeout(() => {
    element.innerHTML = content
  }, 500)
}

// Throttling function
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Export functions for use in other files
window.AnimationUtils = {
  initScrollAnimations,
  initParallax,
  revealOnScroll,
  animateText,
  animateCounter,
  staggerAnimation,
  initMouseTrail,
  showLoadingAnimation,
  hideLoadingAnimation,
}
