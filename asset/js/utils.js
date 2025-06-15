// Utility functions

// DOM utilities
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Create element with attributes
function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag)
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value
    } else if (key === 'innerHTML') {
      element.innerHTML = value
    } else {
      element.setAttribute(key, value)
    }
  })
  
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(child)
    }
  })
  
  return element
}

// Local storage utilities
const Storage = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('Error saving to localStorage:', e)
    }
  },
  
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (e) {
      console.error('Error reading from localStorage:', e)
      return defaultValue
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error('Error removing from localStorage:', e)
    }
  },
  
  clear() {
    try {
      localStorage.clear()
    } catch (e) {
      console.error('Error clearing localStorage:', e)
    }
  }
}

// URL utilities
const UrlUtils = {
  getParams() {
    return new URLSearchParams(window.location.search)
  },
  
  getParam(name) {
    return this.getParams().get(name)
  },
  
  setParam(name, value) {
    const url = new URL(window.location)
    url.searchParams.set(name, value)
    window.history.pushState({}, '', url)
  },
  
  removeParam(name) {
    const url = new URL(window.location)
    url.searchParams.delete(name)
    window.history.pushState({}, '', url)
  }
}

// Date utilities
const DateUtils = {
  formatDate(date, format = 'DD/MM/YYYY') {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    
    return format
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', year)
  },
  
  timeAgo(date) {
    const now = new Date()
    const past = new Date(date)
    const diffInSeconds = Math.floor((now - past) / 1000)
    
    const intervals = [
      { label: 'năm', seconds: 31536000 },
      { label: 'tháng', seconds: 2592000 },
      { label: 'tuần', seconds: 604800 },
      { label: 'ngày', seconds: 86400 },
      { label: 'giờ', seconds: 3600 },
      { label: 'phút', seconds: 60 }
    ]
    
    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds)
      if (count > 0) {
        return `${count} ${interval.label} trước`
      }
    }
    
    return 'Vừa xong'
  }
}

// String utilities
const StringUtils = {
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },
  
  slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  },
  
  truncate(str, length, suffix = '...') {
    if (str.length <= length) return str
    return str.substring(0, length) + suffix
  },
  
  removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }
}

// Number utilities
const NumberUtils = {
  formatNumber(num, locale = 'vi-VN') {
    return new Intl.NumberFormat(locale).format(num)
  },
  
  formatCurrency(amount, currency = 'VND', locale = 'vi-VN') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount)
  },
  
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
  }
}

// Array utilities
const ArrayUtils = {
  shuffle(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  },
  
  unique(array) {
    return [...new Set(array)]
  },
  
  groupBy(array, key) {
    return array.reduce((groups, item) => {
      const group = item[key]
      groups[group] = groups[group] || []
      groups[group].push(item)
      return groups
    }, {})
  },
  
  chunk(array, size) {
    const chunks = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }
}

// Device detection
const DeviceUtils = {
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  },
  
  isTablet() {
    return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent)
  },
  
  isDesktop() {
    return !this.isMobile() && !this.isTablet()
  },
  
  getScreenSize() {
    const width = window.innerWidth
    if (width < 576) return 'xs'
    if (width < 768) return 'sm'
    if (width < 992) return 'md'
    if (width < 1200) return 'lg'
    return 'xl'
  }
}

// Performance utilities
const PerformanceUtils = {
  debounce(func, wait, immediate) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        timeout = null
        if (!immediate) func(...args)
      }
      const callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func(...args)
    }
  },
  
  throttle(func, limit) {
    let inThrottle
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  },
  
  measurePerformance(name, fn) {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
    return result
  }
}

// Validation utilities
const ValidationUtils = {
  isEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },
  
  isPhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/
    return re.test(phone.replace(/\s/g, ''))
  },
  
  isUrl(url) {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },
  
  isEmpty(value) {
    return value === null || value === undefined || value === '' || 
           (Array.isArray(value) && value.length === 0) ||
           (typeof value === 'object' && Object.keys(value).length === 0)
  }
}

// Export utilities
window.Utils = {
  $,
  $$,
  createElement,
  Storage,
  UrlUtils,
  DateUtils,
  StringUtils,
  NumberUtils,
  ArrayUtils,
  DeviceUtils,
  PerformanceUtils,
  ValidationUtils
}
