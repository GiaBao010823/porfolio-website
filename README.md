# Portfolio Website - Diệp Gia Bảo

Portfolio cá nhân của **Diệp Gia Bảo** - .NET Developer chuyên nghiệp với kinh nghiệm phát triển ứng dụng web và desktop.

## 🚀 Tính năng

- **Responsive Design** - Tối ưu cho mọi thiết bị
- **Modern UI/UX** - Thiết kế hiện đại với dark theme
- **Typing Animation** - Hiệu ứng gõ chữ động
- **Skill Filtering** - Lọc kỹ năng theo danh mục
- **Project Showcase** - Trưng bày dự án với modal chi tiết
- **Contact Form** - Form liên hệ với validation
- **SEO Optimized** - Tối ưu cho công cụ tìm kiếm
- **PWA Ready** - Hỗ trợ Progressive Web App

## 🛠️ Công nghệ sử dụng

- **HTML5** - Semantic markup
- **CSS3** - Modern styling với CSS Grid & Flexbox
- **JavaScript ES6+** - Vanilla JavaScript
- **Bootstrap 5** - Responsive framework
- **Font Awesome** - Icons
- **AOS** - Animate On Scroll
- **Google Fonts** - Typography

## 📁 Cấu trúc dự án

\`\`\`
portfolio-website/
├── index.html                 # Trang chính
├── assets/                    # Tài nguyên
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript files
│   ├── images/               # Hình ảnh
│   └── documents/            # Tài liệu (CV, etc.)
├── data/                     # Dữ liệu JSON
├── components/               # HTML components
├── pages/                    # Trang phụ (tùy chọn)
└── vendor/                   # Thư viện bên thứ 3
\`\`\`

## 🚀 Cách chạy dự án

### 1. Clone repository
\`\`\`bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
\`\`\`

### 2. Chạy với Live Server (VS Code)
- Cài đặt extension "Live Server" trong VS Code
- Click chuột phải vào `index.html`
- Chọn "Open with Live Server"

### 3. Hoặc chạy với Python
\`\`\`bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
\`\`\`

### 4. Hoặc chạy với Node.js
\`\`\`bash
npx http-server
\`\`\`

Truy cập: `http://localhost:8000`

## ⚙️ Tùy chỉnh

### 1. Thông tin cá nhân
Chỉnh sửa file `index.html`:
- Tên, email, số điện thoại
- Mô tả và giới thiệu
- Links mạng xã hội

### 2. Kỹ năng
Chỉnh sửa file `data/skills.json`:
\`\`\`json
{
  "name": "Tên kỹ năng",
  "icon": "fas fa-icon",
  "level": 90,
  "category": "backend",
  "description": "Mô tả kỹ năng"
}
\`\`\`

### 3. Dự án
Chỉnh sửa file `data/projects.json`:
\`\`\`json
{
  "title": "Tên dự án",
  "description": "Mô tả dự án",
  "image": "đường/dẫn/ảnh.jpg",
  "technologies": [...]
}
\`\`\`

### 4. Màu sắc
Chỉnh sửa CSS variables trong `assets/css/style.css`:
\`\`\`css
:root {
  --primary-color: #facc15;
  --secondary-color: #f97316;
  --dark-bg: #0f172a;
}
\`\`\`

## 📱 Responsive Breakpoints

- **XS**: < 576px (Mobile)
- **SM**: ≥ 576px (Mobile landscape)
- **MD**: ≥ 768px (Tablet)
- **LG**: ≥ 992px (Desktop)
- **XL**: ≥ 1200px (Large desktop)
- **XXL**: ≥ 1400px (Extra large)

## 🔧 Development

### Prerequisites
- Modern web browser
- Code editor (VS Code recommended)
- Live Server extension

### Recommended VS Code Extensions
- Live Server
- Auto Rename Tag
- Prettier
- HTML CSS Support
- JavaScript (ES6) code snippets

## 📈 Performance

- **Lighthouse Score**: 95+
- **Page Load Time**: < 2s
- **Image Optimization**: WebP format
- **CSS/JS Minification**: For production
- **Caching**: Browser caching enabled

## 🔒 Security

- Content Security Policy (CSP)
- XSS Protection
- Clickjacking protection
- HTTPS enforcement (production)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Diệp Gia Bảo**
- Email: giabao.sd1999@gmail.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/
