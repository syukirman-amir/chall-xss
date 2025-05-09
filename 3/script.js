function handleSubmit(event) {
    event.preventDefault();
    
    const urlInput = document.getElementById('urlInput').value.trim();
    const outputDiv = document.getElementById('output');

    // Validasi URL dengan regex: protokol apa pun, diikuti ://, lalu domain
    const urlPattern = /^[a-zA-Z0-9+.-]+:\/\/(?!.*(%0a|%0d)).+$/i;
    if (!urlPattern.test(urlInput)) {
        outputDiv.innerHTML = '<p style="color: red;">Error: Please enter a valid URL with protocol (e.g., http://example.com).</p>';
        return;
    }
    // Jika validasi lolos, buat link yang dapat diklik
    outputDiv.innerHTML = `<p>Success! Your URL: <a href="${urlInput}" target="#">Click here</a></p>`;
}
