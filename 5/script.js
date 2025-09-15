// Kirim URL jendela saat ini ke parent window
parent.postMessage(window.location.toString(), "*");

// Override window.alert
var originalAlert = window.alert;
window.alert = function(s) {
    parent.postMessage("success", "*");
    setTimeout(function() { 
        originalAlert("Congratulations, you executed an alert:\n\n" 
            + s + "\n\nYou can now advance to the next level.");
    }, 50);
};

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

    // Masukkan input HTML ke dalam output 
    outputDiv.innerHTML = htmlInput;

    // Proses semua elemen <a> 
  
    const links = document.querySelectorAll('a[data-type*="link"]');
    links.forEach(link => {
        const dataType = link.getAttribute('data-type');
        if (dataType !== 'link') { 
            const url = link.getAttribute('data-value');
            if (url) {
                link.setAttribute('href', url); // hasil output
            }
        }
    });
}
