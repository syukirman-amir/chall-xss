function handleSubmit(event) {
    event.preventDefault();
    
    let urlInput = document.getElementById('urlInput').value;
    const outputDiv = document.getElementById('output');


    // Validasi: URL harus mengandung protokol yang sah (mengandung '//')
    if (!urlInput.includes('//')) {
        outputDiv.innerHTML = '<p style="color: red;">Error: URL must contain a valid protocol (e.g., http:// or https://).</p>';
        return;
    }

    // Validasi: Blokir kata 'javascript' (case-sensitive) dalam input
    if (urlInput.toLowerCase().includes('javascript')) {
        outputDiv.innerHTML = '<p style="color: red;">Error: The word "javascript" is not allowed in the URL.</p>';
        return;
    }

    // Validasi: Blokir kata 'java' (case-sensitive) dalam input
    if (urlInput.toLowerCase().includes('java')) {
        outputDiv.innerHTML = '<p style="color: red;">Error: The word "java" is not allowed in the URL.</p>';
        return;
    }

    // Cek apakah URL mengandung kata 'script' (case-insensitive)
    if (urlInput.toLowerCase().includes('script')) {
        // Ganti kata 'script' dengan 'scrazy' hanya jika ditemukan
        urlInput = urlInput.replace(/script/gi, 'scrazy');
    }

    // Jika validasi lolos, buat link yang dapat diklik
    outputDiv.innerHTML = `<p>Success! Your URL: <a href="${urlInput}" target="#">Click here</a></p>`;
}
