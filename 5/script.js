function handleSubmit(event) {
    event.preventDefault();

    // Ambil nilai input URL dari formulir
    const urlInput = document.getElementById('urlInput').value;
    const outputDiv = document.getElementById('output');

    // Filter sederhana yang rentan
    // Hanya memeriksa apakah data-type mengandung "link" (rentan terhadap %0a)
    const dataType = urlInput.includes('javascript:') ? 'invalid' : 'link'; // Filter dasar untuk mencegah javascript:

    // Buat elemen <a> dengan input pengguna
    const linkElement = document.createElement('a');
    linkElement.setAttribute('data-type', dataType);
    linkElement.setAttribute('data-value', urlInput);
    linkElement.textContent = 'example.com';
    
    // Tambahkan elemen ke output
    outputDiv.innerHTML = ''; // Bersihkan output sebelumnya
    outputDiv.appendChild(linkElement);

    // Proses data-value untuk menetapkan href (rentan)
    const links = document.querySelectorAll('a[data-type*="link"]'); // Rentan karena menggunakan *= (contains)
    links.forEach(link => {
        const url = link.getAttribute('data-value');
        if (url) {
            link.setAttribute('href', url); // Tidak memeriksa protokol javascript:
        }
    });
}
