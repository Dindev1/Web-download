async function downloadVideo() {
    const urlInput = document.getElementById("url");
    const url = urlInput.value.trim();
    const btn = document.getElementById("downloadBtn");
    const btnText = btn.querySelector(".btn-text");
    const loader = btn.querySelector(".loader");
    
    if (!url) {
        alert("Masukkan URL terlebih dahulu!");
        return;
    }

    // Mengubah tampilan tombol menjadi Loading
    btnText.style.display = "none";
    loader.style.display = "block";
    btn.disabled = true;

    try {
        let data = {};

        // Validasi jika URL berasal dari TikTok
        if (url.includes("tiktok.com")) {
            // Menggunakan API Gratis Tikwm
            const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
            const resData = await response.json();

            if (resData.code === 0 && resData.data) {
                data = {
                    title: resData.data.title || "TikTok Video",
                    thumbnail: resData.data.cover,
                    video: resData.data.play, // Video tanpa watermark
                    audio: resData.data.music // Audio MP3
                };
            } else {
                throw new Error(resData.msg || "Gagal memproses video TikTok");
            }
        } else {
            // Sediakan API YouTube Anda di sini atau gunakan Mock Data sementara
            data = {
                title: "Sample Video (Non-TikTok)",
                thumbnail: "https://placehold.co/600x350/1b1429/FFF?text=VOID+ZUL+GALAXY",
                video: url,
                audio: "#"
            };
        }

        // Memasukkan data ke elemen HTML
        document.getElementById("thumb").src = data.thumbnail;
        document.getElementById("title").innerText = data.title;
        document.getElementById("videoBtn").href = data.video;
        document.getElementById("audioBtn").href = data.audio;

        // Menampilkan container hasil mendownload
        document.getElementById("result").style.display = "block";

    } catch (err) {
        alert("Gagal mengambil data: " + err.message);
        document.getElementById("result").style.display = "none";
    } finally {
        // Mengembalikan tampilan tombol ke semula
        btnText.style.display = "block";
        loader.style.display = "none";
        btn.disabled = false;
    }
}