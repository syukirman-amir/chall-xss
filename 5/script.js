function handleSubmit(event) {
    event.preventDefault();

    // Ambil input HTML dari textarea
    const htmlInput = document.getElementById('htmlInput').value;
    const outputDiv = document.getElementById('output');

    // Filter yang rentan: hanya memeriksa keberadaan 'link' dalam data-type
    const decodedInput = decodeURIComponent(htmlInput);
    if (!decodedInput.includes('data-type="link')) {
        outputDiv.innerHTML = '<p style="color:red;">Error: Only links with data-type containing \'link\' are allowed!</p>';
        return;
    }

    // Masukkan input HTML ke dalam output (rentan)
    outputDiv.innerHTML = htmlInput;

    // Proses semua elemen <a> dengan data-type yang mengandung "link"
    // Hanya proses jika data-type bukan "link" secara eksak
    const links = document.querySelectorAll('a[data-type*="link"]');
    links.forEach(link => {
        const dataType = link.getAttribute('data-type');
        if (dataType !== 'link') { // Hanya proses jika data-type bukan "link" secara eksak
            const url = link.getAttribute('data-value');
            if (url) {
                link.setAttribute('href', url); // Rentan: menetapkan data-value ke href tanpa sanitasi
            }
        }
    });
}
