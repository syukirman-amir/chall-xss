function handleSubmit(event) {
    event.preventDefault();
    
    const urlInput = document.getElementById('urlInput').value.trim();
    const outputDiv = document.getElementById('output');

    // Validasi URL menggunakan regex
    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(urlInput)) {
        outputDiv.innerHTML = '<p style="color: red;">Error: Please enter a valid URL (e.g., https://example.com).</p>';
        return;
    }

    // Validasi tambahan menggunakan objek URL
    try {
        new URL(urlInput);
    } catch (error) {
        outputDiv.innerHTML = '<p style="color: red;">Error: Invalid URL format.</p>';
        return;
    }

    // Blokir kata 'javascript' (case-insensitive)
    if (urlInput.toLowerCase().includes('javascript')) {
        outputDiv.innerHTML = '<p style="color: red;">Error: The word "javascript" is not allowed in the URL.</p>';
        return;
    }

    // Ganti kata 'script' dengan 'scrazy' (case-insensitive)
    let modifiedUrl = urlInput.replace(/script/gi, 'scrazy');

    // Jika validasi lolos, buat link yang dapat diklik
    outputDiv.innerHTML = `<p>Success! Your URL: <a href="${modifiedUrl}" target="_blank">Click here</a></p>`;
}
