function handleSubmit(event) {
    event.preventDefault();
    
    const urlInput = document.getElementById('urlInput').value.trim();
    const outputDiv = document.getElementById('output');

    // Validasi URL dengan regex: protokol apa pun, diikuti ://, lalu domain
    const urlPattern = /^[a-zA-Z0-9+.-]+:\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(urlInput)) {
        outputDiv.innerHTML = '<p style="color: red;">Error: Please enter a valid URL with protocol (e.g., http://example.com).</p>';
        return;
    }
      // Validasi: Blokir kata '%0a' (case-sensitive) dalam input
    if (urlInput.toLowerCase().includes('%0a')) {
        outputDiv.innerHTML = '<p style="color: red;">Error: The word "%0a" is not allowed in the URL.</p>';
        return;
    }
        // Validasi: Blokir kata '%0d' (case-sensitive) dalam input
    if (urlInput.toLowerCase().includes('%0d')) {
        outputDiv.innerHTML = '<p style="color: red;">Error: The word "%0d" is not allowed in the URL.</p>';
        return;
    }

    // Jika validasi lolos, buat link yang dapat diklik
    outputDiv.innerHTML = `<p>Success! Your URL: <a href="${urlInput}" target="#">Click here</a></p>`;
}
