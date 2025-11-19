const ringtone = document.getElementById('ringtone');
let vibrationInterval = null;

// Bắt đầu rung liên tục
function startVibration() {
    if (navigator.vibrate) {
        vibrationInterval = setInterval(() => {
            navigator.vibrate([200, 200]);
        }, 500);
    }
}

// Dừng rung
function stopVibration() {
    if (navigator.vibrate) {
        navigator.vibrate(0);
        clearInterval(vibrationInterval);
    }
}

// Hàm tạo slider riêng biệt
function makeSlider(sliderContainerId, onComplete) {
    const container = document.getElementById(sliderContainerId);
    const slider = container.querySelector('.slider');
    let isDragging = false;
    let startX = 0;

    const activateThreshold = container.offsetWidth * 0.7; // 70% chiều rộng

    // --- Desktop ---
    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        ringtone.play().catch(() => { });
        startVibration();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        let dx = e.clientX - startX;
        dx = Math.max(0, Math.min(dx, container.offsetWidth - slider.offsetWidth));
        slider.style.left = dx + "px";

        if (navigator.vibrate) navigator.vibrate(50);
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;

        const sliderLeft = parseInt(slider.style.left) || 0;
        if (sliderLeft >= activateThreshold) {
            onComplete();
        }

        slider.style.left = "0px";
        stopVibration();
        ringtone.pause();
        ringtone.currentTime = 0;
    });

    // --- Mobile ---
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        ringtone.play().catch(() => { });
        startVibration();
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        let dx = e.touches[0].clientX - startX;
        dx = Math.max(0, Math.min(dx, container.offsetWidth - slider.offsetWidth));
        slider.style.left = dx + "px";

        if (navigator.vibrate) navigator.vibrate(50);
    });

    slider.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;

        const sliderLeft = parseInt(slider.style.left) || 0;
        if (sliderLeft >= activateThreshold) {
            onComplete();
        }

        slider.style.left = "0px";
        stopVibration();
        ringtone.pause();
        ringtone.currentTime = 0;
    });
}

function showToast(message) {
    let toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Hiển thị
    setTimeout(() => toast.classList.add('show'), 50);

    // Ẩn sau 2 giây
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
}

// --- Khởi tạo 2 slider ---
makeSlider('acceptSlider', () => {
    stopVibration();
    ringtone.pause();
    ringtone.currentTime = 0;

    let hash = window.location.hash.substring(1);
    // Mở trang web mới
    window.location.href = "invi.html#" + hash; // Thay link bạn muốn
});
makeSlider('declineSlider', () => showToast("❌ Không được từ chối đâu, phải nghe cơ"));

