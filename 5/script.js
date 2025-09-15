function handleSubmit(event) {
    event.preventDefault();

    // Ambil input HTML dari textarea
    const htmlInput = document.getElementById('htmlInput').value;
    const outputDiv = document.getElementById('output');

   
    // Hanya memeriksa apakah input mengandung 'data-type="link"' 
    if (!htmlInput.includes('data-type="link"')) {
        // Jika tidak ada data-type="link"
        const decodedInput = decodeURIComponent(htmlInput);
        if (!decodedInput.includes('data-type="link"')) {
            outputDiv.innerHTML = '<p style="color:red;">Error: Only links with data-type="link" are allowed!</p>';
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
            link.setAttribute('href', url); 
        }
    });
}
