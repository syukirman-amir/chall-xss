function handleSubmit(event) {
    event.preventDefault();
    
    const urlInput = document.getElementById('urlInput').value.trim();
    const outputDiv = document.getElementById('output');

    // Validasi URL dengan regex: protokol apa pun, diikuti ://, lalu domain
    const urlPattern = /^[a-zA-Z0-9+.-]+:\/\/[^\s%0A%0D/$.?#][^\s%0A%0D]*$/i;
    if (!urlPattern.test(urlInput)) {
        outputDiv.innerHTML = '<p style="color: red;">Error: Please enter a valid URL with protocol (e.g., http://example.com).</p>';
        return;
    }

    // Jika validasi lolos, buat link yang dapat diklik
    outputDiv.innerHTML = `<p>Success! Your URL: <a href="${urlInput}" target="#">Click here</a></p>`;
}
