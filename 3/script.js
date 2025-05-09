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
    //if (urlInput.toLowerCase().includes('%0a') || urlInput.toLowerCase().includes('%250a'))  {
       // outputDiv.innerHTML = '<p style="color: red;">Error: URL contains invalid characters (newline or carriage return).</p>';
       // return;
    //}
        // Validasi: Blokir kata '%0d' (case-sensitive) dalam input
    if (urlInput.toLowerCase().includes('%0d') || urlInput.toLowerCase().includes('%250d'))  {
        outputDiv.innerHTML = '<p style="color: red;">Error: URL contains invalid characters (newline or carriage return).</p>';
        return;
    }

    // Jika validasi lolos, buat link yang dapat diklik
    outputDiv.innerHTML = `<p>Success! Your URL: <a href="${urlInput}" target="#">Click here</a></p>`;
}
