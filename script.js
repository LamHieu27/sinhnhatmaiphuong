/**
 * ====================================================================
 * WEBSITE CHÚC MỪNG SINH NHẬT BẢO MẬT & TƯƠNG TÁC
 * ====================================================================
 */

// CẤU HÌNH HỆ THỐNG
const CONFIG = {
  // Mật khẩu tĩnh khi chạy Static (GitHub Pages, v.v.). Mặc định là: "2006"
  // SHA-256 hash của "2006" là: "15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225"
  // Hoặc bạn có thể dùng chuỗi dạng văn bản thường bên dưới nếu muốn chỉnh sửa đơn giản:
  FALLBACK_PASSWORD: "1808",

  // Tự động phát nhạc khi mở khóa (true / false)
  AUTO_PLAY_MUSIC: true
};

document.addEventListener('DOMContentLoaded', () => {
  // Khai báo các phần tử DOM
  const lockScreen = document.getElementById('lock-screen');
  const mainContent = document.getElementById('main-content');
  const loginForm = document.getElementById('login-form');
  const passwordInput = document.getElementById('password-input');
  const togglePasswordBtn = document.getElementById('toggle-password-btn');
  const eyeIcon = document.getElementById('eye-icon');
  const unlockBtn = document.getElementById('unlock-btn');
  const errorMsg = document.getElementById('error-msg');
  const hintToggleBtn = document.getElementById('hint-toggle-btn');
  const hintText = document.getElementById('hint-text');

  // Music & Interactive elements
  const bgMusic = document.getElementById('bg-music');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicIcon = musicToggleBtn ? musicToggleBtn.querySelector('.music-icon') : null;
  const celebrateBtn = document.getElementById('celebrate-btn');
  const birthdayCake = document.getElementById('birthday-cake');
  const flame = document.getElementById('flame');
  const heartBtn = document.getElementById('heart-btn');
  const heartCount = document.getElementById('heart-count');

  // Lightbox elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  let heartsCount = 0;
  let isPlayingMusic = false;

  // --------------------------------------------------
  // 1. TẢI VÀ KHỞI TẠO NỀN HẠT LẤP LÁNH (BG CANVAS)
  // --------------------------------------------------
  initBackgroundParticles();

  // --------------------------------------------------
  // 2. ẨN/HIỆN MẬT KHẨU
  // --------------------------------------------------
  if (togglePasswordBtn && passwordInput && eyeIcon) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      eyeIcon.className = type === 'password' ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
    });
  }

  // Gợi ý mật khẩu
  if (hintToggleBtn && hintText) {
    hintToggleBtn.addEventListener('click', () => {
      hintText.classList.toggle('hidden');
    });
  }

  // --------------------------------------------------
  // 3. XỬ LÝ ĐĂNG NHẬP / MỞ KHÓA
  // --------------------------------------------------
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleUnlock();
    });
  }

  async function handleUnlock() {
    const password = passwordInput.value.trim();
    if (!password) return;

    // Đổi trạng thái button sang Loading
    unlockBtn.disabled = true;
    unlockBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang kiểm tra...';
    errorMsg.classList.add('hidden');

    try {
      let isSuccess = false;

      // Bước 1: Thử gọi API Serverless Vercel `/api/verify`
      try {
        const response = await fetch('/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) isSuccess = true;
        } else if (response.status === 401) {
          isSuccess = false;
        } else {
          // Nếu API trả về 404 (do chạy Static không có Node server) -> Dùng Fallback client-side
          isSuccess = checkFallbackPassword(password);
        }
      } catch (err) {
        // Lỗi mạng hoặc host tĩnh -> Dùng Fallback client-side
        isSuccess = checkFallbackPassword(password);
      }

      if (isSuccess) {
        // Đăng nhập thành công!
        unlockSuccess();
      } else {
        // Đăng nhập thất bại
        showError('Mật khẩu không đúng. Vui lòng thử lại!');
      }
    } catch (error) {
      showError('Có lỗi xảy ra, vui lòng thử lại sau!');
    } finally {
      unlockBtn.disabled = false;
      unlockBtn.innerHTML = '<i class="fa-solid fa-key"></i> Mở Khóa ✨';
    }
  }

  function checkFallbackPassword(inputPassword) {
    // Kiểm tra mật khẩu fallback đơn giản
    return inputPassword === CONFIG.FALLBACK_PASSWORD;
  }

  function showError(message) {
    if (errorMsg) {
      errorMsg.querySelector('span').innerText = message;
      errorMsg.classList.remove('hidden');
    }
  }

  function unlockSuccess() {
    // Chuyển cảnh mượt mà
    lockScreen.classList.add('fade-out');

    setTimeout(() => {
      lockScreen.classList.add('hidden');
      mainContent.classList.remove('hidden');

      // Bắn pháo hoa chào mừng!
      triggerConfetti();

      // Tự động bật nhạc nếu được cấu hình
      if (CONFIG.AUTO_PLAY_MUSIC && bgMusic) {
        playMusic();
      }
    }, 600);
  }

  // --------------------------------------------------
  // 4. QUẢN LÝ NÚT PHÁT NHẠC
  // --------------------------------------------------
  if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener('click', () => {
      if (isPlayingMusic) {
        pauseMusic();
      } else {
        playMusic();
      }
    });
  }

  function playMusic() {
    if (!bgMusic) return;
    bgMusic.play().then(() => {
      isPlayingMusic = true;
      if (musicIcon) musicIcon.classList.add('spinning');
    }).catch(err => {
      console.log('Tự động phát nhạc bị chặn bởi trình duyệt, người dùng cần tương tác:', err);
    });
  }

  function pauseMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    isPlayingMusic = false;
    if (musicIcon) musicIcon.classList.remove('spinning');
  }

  // --------------------------------------------------
  // 5. TƯƠNG TÁC BÁNH SINH NHẬT & NÚT PHÁO HOA
  // --------------------------------------------------
  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      triggerConfetti();
    });
  }

  if (birthdayCake) {
    birthdayCake.addEventListener('click', () => {
      if (flame) flame.classList.toggle('blown-out');
      triggerConfetti();
    });
  }

  function triggerConfetti() {
    if (typeof confetti === 'function') {
      // Pháo hoa góc trái
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6, x: 0.2 }
      });
      // Pháo hoa góc phải
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6, x: 0.8 }
      });
    }
  }

  // --------------------------------------------------
  // 6. THẢ TIM TƯƠNG TÁC
  // --------------------------------------------------
  if (heartBtn && heartCount) {
    heartBtn.addEventListener('click', (e) => {
      heartsCount++;
      heartCount.innerText = heartsCount;
      createFloatingHeart(e.clientX, e.clientY);
    });
  }

  function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = `${x - 12}px`;
    heart.style.top = `${y - 12}px`;
    heart.style.fontSize = `${Math.random() * 20 + 20}px`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.transition = 'all 1.2s ease-out';
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = `translate(${(Math.random() - 0.5) * 100}px, -150px) scale(1.5)`;
      heart.style.opacity = '0';
    }, 20);

    setTimeout(() => {
      heart.remove();
    }, 1250);
  }

  // --------------------------------------------------
  // 7. GALLERY LIGHTBOX MODAL
  // --------------------------------------------------
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src') || item.querySelector('img').src;
      const captionText = item.querySelector('.gallery-caption h4')?.innerText || '';

      if (lightboxImg && lightboxModal) {
        lightboxImg.src = src;
        if (lightboxCaption) lightboxCaption.innerText = captionText;
        lightboxModal.classList.remove('hidden');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (lightboxModal) lightboxModal.classList.add('hidden');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.add('hidden');
      }
    });
  }

  // --------------------------------------------------
  // 8. KHỞI TẠO CANVAS PARTICLES (HẠT SAO NỀN)
  // --------------------------------------------------
  function initBackgroundParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        alpha: Math.random(),
        speed: Math.random() * 0.5 + 0.2
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#f472b6';
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();
  }
});
