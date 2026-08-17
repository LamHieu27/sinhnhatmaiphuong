# 🎈 Website Chúc Mừng Sinh Nhật Bảo Mật & Đẹp Mắt

Website chúc mừng sinh nhật cá nhân hóa, giao diện sang trọng, hiện đại (Glassmorphism), tương tác sinh động, được tối ưu sẵn cho điện thoại và máy tính, tích hợp bảo mật mật khẩu trước khi xem nội dung.

---

## 🛠️ 1. Công Nghệ Sử Dụng

- **Frontend:** HTML5, CSS3 (Vanilla CSS - Glassmorphism, animations, responsive grid), JavaScript (ES6+).
- **Backend / Security:** Vercel Serverless API (`/api/verify.js`) giúp bảo mật mật khẩu ở phía server (không sợ bị soi mật khẩu thật trong source code).
- **Thư viện bổ trợ:** Font Awesome 6 (Icon), Google Fonts (Plus Jakarta Sans & Dancing Script), Canvas Confetti (Hiệu ứng bắn pháo hoa).

---

## 🔒 2. Giải Thích Về Bảo Mật Mật Khẩu (Rất Quan Trọng)

- **Nếu chỉ dùng Frontend (Ví dụ GitHub Pages / Host tĩnh):** Nếu lưu mật khẩu trực tiếp dưới dạng chữ thường trong JS (`if (pass === "123456")`), ai mở F12 / Inspect code cũng sẽ thấy được mật khẩu. 
- **Giải pháp trong project này:**
  1. **Vercel Serverless API (Bảo mật tuyệt đối & Miễn phí):** Khi deploy lên Vercel, mật khẩu được xử lý hoàn toàn ở phễu server (`/api/verify.js`). Người dùng bên ngoài chỉ nhìn thấy API call và **KHÔNG BAO GIỜ** soi được mật khẩu thật trong Javascript client! Bạn cũng có thể đặt mật khẩu qua biến môi trường `BIRTHDAY_PASSWORD` trên trang quản trị Vercel.
  2. **Fallback Client Hashing (Dành cho host tĩnh):** Nếu bạn đưa lên GitHub Pages hoặc mở trực tiếp file HTML, hệ thống tự động chuyển sang kiểm tra mật khẩu qua biến cấu hình `CONFIG.FALLBACK_PASSWORD` trong `script.js`.

---

## 💻 3. Cấu Trúc Thư Mục Project

```text
SN/
├── api/
│   └── verify.js             # Vercel Serverless API kiểm tra mật khẩu server-side
├── assets/
│   ├── audio/                # Chứa file nhạc sinh nhật (.mp3)
│   ├── images/               # Chứa ảnh kỷ niệm (.jpg, .png)
│   └── videos/               # Chứa video kỷ niệm (.mp4)
├── index.html                # Giao diện chính (Màn hình khóa & Nội dung)
├── style.css                 # Toàn bộ hiệu ứng, màu sắc & Responsive CSS
├── script.js                 # Xử lý đăng nhập, hiệu ứng pháo hoa, thả tim, nhạc, lightbox
├── vercel.json               # Cấu hình Deploy Vercel
├── package.json              # Khai báo node project
└── README.md                 # Hướng dẫn chi tiết sử dụng & deploy
```

---

## 🎯 4. HƯỚNG DẪN CHỈNH SỬA CHI TIẾT (EXACT FILE GUIDE)

Dưới đây là vị trí chính xác của từng file và dòng bạn cần sửa để thay đổi nội dung theo ý muốn:

### 🔑 A. Thay Đổi Mật Khẩu
1. **Nếu Deploy Vercel (Khuyên dùng):**
   - Mở file `api/verify.js` ➔ Dòng 5:
     ```javascript
     const DEFAULT_PASSWORD = process.env.BIRTHDAY_PASSWORD || "2006";
     ```
     Thay `"2006"` thành mật khẩu bạn muốn (Ví dụ: `"01012000"`).
   - *Cách tốt hơn nữa:* Trên trang quản trị Vercel ➔ Settings ➔ Environment Variables ➔ Thêm tên `BIRTHDAY_PASSWORD` với giá trị là mật khẩu mới.
2. **Nếu Chạy Static / Local / GitHub Pages:**
   - Mở file `script.js` ➔ Dòng 10:
     ```javascript
     FALLBACK_PASSWORD: "2006",
     ```
     Thay `"2006"` thành mật khẩu bạn muốn.

---

### ✏️ B. Thay Đổi Tiêu Đề & Lời Nhắn
- Mở file **`index.html`**:
  - **Tên người nhận sinh nhật:** Dòng 68 ➔ Thay `Ngọc Anh` thành tên bạn bè/người thân.
  - **Màn hình khóa:** Dòng 35 ➔ Sửa tiêu đề `Trang Web Bí Mật ✨`.
  - **Lời nhắn bức thư:** 
    - Dòng 104 ➔ Sửa `Gửi người bạn thân yêu! ❤️`.
    - Dòng 105 - 116 ➔ Sửa các đoạn văn lời chúc theo ý thích.
    - Dòng 119 ➔ Sửa tên chữ ký người gửi `[Tên Của Bạn / Bạn Thân]`.

---

### 🖼️ C. Thay Đổi Hình Ảnh (Gallery)
- Bạn có thể copy ảnh của mình vào thư mục `assets/images/` (ví dụ `anh1.jpg`, `anh2.jpg`).
- Mở file **`index.html`**:
  - **Thẻ ảnh 1:** Dòng 134 ➔ Thay đường dẫn ảnh `data-src` & `src` trong thẻ `<img>` thành `"assets/images/anh1.jpg"`.
  - **Thẻ ảnh 2:** Dòng 147 ➔ Thay thành `"assets/images/anh2.jpg"`.
  - **Thẻ ảnh 3:** Dòng 160 ➔ Thay thành `"assets/images/anh3.jpg"`.
  - **Thẻ ảnh 4:** Dòng 173 ➔ Thay thành `"assets/images/anh4.jpg"`.

---


### 🎵 E. Thay Đổi Nhạc Nền (Background Music)
- Copy file nhạc `.mp3` của bạn vào `assets/audio/happy-birthday.mp3`.
- Mở file **`index.html`** ➔ Dòng 57 ➔ Thay thẻ `<source src="..." type="audio/mpeg">` thành:
  ```html
  <source src="assets/audio/happy-birthday.mp3" type="audio/mpeg">
  ```

---

### 🎨 F. Thay Đổi Màu Sắc & Giao Diện
- Mở file **`style.css`**:
  - Dòng 5 - 12: Chứa toàn bộ tông màu chủ đạo (`--primary-color`, `--secondary-color`, `--bg-gradient`).
  - Bạn có thể chỉnh lại tông màu nền gradient theo ý thích tại dải màu `--bg-gradient`.

---

## 🚀 5. HƯỚNG DẪN CHẠY LOCAL (TRÊN MÁY TÍNH)

1. **Cách đơn giản nhất:** 
   - Nhấp đôi vào file `index.html` để mở trực tiếp trên trình duyệt Web (Chrome, Edge, Safari).
2. **Dùng VS Code Live Server / NPM:**
   - Mở terminal tại thư mục project:
     ```bash
     npm start
     ```
   - Trình duyệt sẽ mở địa chỉ `http://localhost:3000` hoặc tương đương.

---

## 📤 6. HƯỚNG DẪN ĐƯA PROJECT LÊN GITHUB

1. **Bước 1:** Đăng nhập vào [GitHub.com](https://github.com) ➔ Bấm nút **New Repository** (Tạo repo mới).
2. **Bước 2:** Đặt tên repository (Ví dụ: `hpbd-web`) ➔ Để chế độ **Public** hoặc **Private** ➔ Bấm **Create repository**.
3. **Bước 3:** Mở Terminal / PowerShell tại thư mục `SN` trên máy tính và chạy lần lượt các lệnh:
   ```bash
   git init
   git add .
   git commit -m "Initial birthday website project"
   git branch -M main
   git remote add origin https://github.com/TÊN_USERNAME_CỦA_BẠN/hpbd-web.git
   git push -u origin main
   ```

---

## ☁️ 7. HƯỚNG DẪN DEPLOY LÊN VERCEL TỪNG BƯỚC (FREE 100%)

Vercel là nền tảng miễn phí tuyệt vời nhất cho project này vì hỗ trợ cả Static Website lẫn Serverless API bảo mật.

1. **Bước 1:** Truy cập [Vercel.com](https://vercel.com) và Đăng nhập bằng tài khoản GitHub của bạn.
2. **Bước 2:** Tại giao diện Vercel Dashboard, chọn **Add New...** ➔ **Project**.
3. **Bước 3:** Chọn Repository `hpbd-web` vừa đưa lên GitHub và bấm **Import**.
4. **Bước 4 (Tùy chọn Mật khẩu an toàn):** 
   - Tại mục **Environment Variables**:
     - Key: `BIRTHDAY_PASSWORD`
     - Value: `Mật khẩu bạn muốn đặt` (VD: `123456`)
     - Bấm **Add**.
5. **Bước 5:** Bấm **Deploy**.
6. **Hoàn tất:** Vercel sẽ cung cấp cho bạn một đường link dạng `https://hpbd-web.vercel.app`. Bạn chỉ cần copy đường link này gửi cho bạn bè để chúc mừng sinh nhật! 🎉

---

## 🌐 8. CÁC NỀN TẢNG MIỄN PHÍ THAY THẾ (NẾU KHÔNG DÙNG VERCEL)

Nếu bạn không muốn dùng Vercel, website này hoạt động hoàn hảo trên các nền tảng miễn phí khác:
1. **GitHub Pages:** Vào Repo GitHub ➔ Settings ➔ Pages ➔ Select branch `main` ➔ Save.
2. **Netlify:** Kéo thả trực tiếp thư mục project vào trang [app.netlify.com/drop](https://app.netlify.com/drop).
3. **Cloudflare Pages:** Kết nối repo GitHub với Cloudflare Pages và chọn deploy tĩnh.

---

Chúc bạn có một món quà sinh nhật thật ý nghĩa và bất ngờ cho bạn bè! 🎂🥳✨
