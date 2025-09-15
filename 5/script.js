function handleSubmit(event) {
    event.preventDefault();

    // Ambil input HTML dari textarea
    const htmlInput = document.getElementById('htmlInput').value;
    const outputDiv = document.getElementById('output');

    // Filter sederhana yang rentan
    // Hanya memeriksa apakah input mengandung 'data-type="link"' (rentan terhadap %0a)
    if (!htmlInput.includes('data-type="link"')) {
        // Jika tidak ada data-type="link", coba decode %0a untuk memeriksa bypass
        const decodedInput = decodeURIComponent(htmlInput);
        if (!decodedInput.includes('data-type="link"')) {
            outputDiv.innerHTML = '<p style="color:red;">Error: 500</p>';
            return;
        }
    }

    // Masukkan input HTML ke dalam output (rentan)
    outputDiv.innerHTML = htmlInput;

    // Proses semua elemen <a> dengan data-type yang mengandung "link"
    const links = document.querySelectorAll('a[data-type*="link"]');
    links.forEach(link => {
        const url = link.getAttribute('data-value');
        if (url) {
            link.setAttribute('href', url); // Rentan: menetapkan data-value ke href tanpa sanitasi
        }
    });
}
