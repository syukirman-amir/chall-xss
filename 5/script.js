// Kirim URL jendela saat ini ke parent window
parent.postMessage(window.location.toString(), "*");

// Override window.alert
var originalAlert = window.alert;
window.alert = function(s) {
    parent.postMessage("success", "*");
    setTimeout(function() { 
        originalAlert("Congratulations, you executed an alert:\n\n" 
            + s + "\n\nClick OK to proceed.");
    }, 50);
};

// Override window.confirm
var originalConfirm = window.confirm;
window.confirm = function(s) {
    parent.postMessage("confirm", "*");
    setTimeout(function() { 
        return originalConfirm("Congratulations, you executed an confirm dialog:\n\n" 
            + s + "\n\nClick OK to proceed.");
    }, 50);
};

// Override window.prompt
var originalPrompt = window.prompt;
window.prompt = function(s, defaultValue = "") {
    parent.postMessage("prompt", "*");
    setTimeout(function() { 
        return originalPrompt("Congratulations, you executed an prompt dialog:\n\n" 
            + s + "\n\nClick OK to proceed.", defaultValue);
    }, 50);
};

function isValidURL(url) {
    // Regex untuk memeriksa URL valid (http, https, ftp, dll.)
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
}

function containsHTMLTags(value) {
    // Gunakan DOMParser untuk memeriksa 
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, 'text/html');
    const elements = doc.body.childNodes;
    let hasTags = false;

    // Periksa setiap node di data-value
    elements.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            hasTags = true; // Terdeteksi tag HTML
        }
    });

    return hasTags;
}

function handleSubmit(event) {
    event.preventDefault();

    // Ambil input HTML dari textarea
    const htmlInput = document.getElementById('htmlInput').value;
    const outputDiv = document.getElementById('output');

    // Dekode input untuk memeriksa konten
    const decodedInput = decodeURIComponent(htmlInput);

    // Validasi: Hanya izinkan tag <a>
    const parser = new DOMParser();
    const doc = parser.parseFromString(decodedInput, 'text/html');
    const elements = doc.body.childNodes;
    let isValid = true;

    // Periksa setiap node di input
    elements.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== 'a') {
            isValid = false; // Tolak jika ada tag selain <a>
        }
    });

    if (!isValid) {
        outputDiv.innerHTML = '<p style="color:red;">Error: Only &lt;a&gt; tags are allowed!</p>';
        return;
    }

    // Filter yang rentan: hanya memeriksa keberadaan 'link' dalam data-type
    if (!decodedInput.includes('data-type="link')) {
        outputDiv.innerHTML = '<p style="color:red;">Error: Only links with data-type containing \'link\' are allowed!</p>';
        return;
    }

    // Masukkan input HTML ke dalam output
    outputDiv.innerHTML = htmlInput;

    // Proses semua elemen <a> dengan data-type yang mengandung "link"
    const links = document.querySelectorAll('a[data-type*="link"]');
    links.forEach(link => {
        const dataType = link.getAttribute('data-type');
        const url = link.getAttribute('data-value');

        // Validasi: Periksa apakah data-value mengandung tag HTML menggunakan DOMParser
        if (url && containsHTMLTags(url)) {
            link.removeAttribute('href'); // Nonaktifkan link
            link.style.pointerEvents = 'none';
            link.style.color = '#999';
            link.style.cursor = 'not-allowed';
            return; // Lewati pemrosesan lebih lanjut untuk link ini
        }

        // Hanya proses jika data-type bukan "link" secara eksak atau jika URL valid
        if (dataType !== 'link') {
            if (url) {
                link.setAttribute('href', url); // Aktifkan link tanpa validasi ketat
                link.style.pointerEvents = 'auto';
                link.style.cursor = 'pointer';
            }
        } else if (dataType === 'link' && url && isValidURL(url)) {
            link.setAttribute('href', url); // Aktifkan link untuk URL valid
            link.style.pointerEvents = 'auto';
            link.style.cursor = 'pointer';
        } else {
            link.removeAttribute('href'); // Nonaktifkan link untuk payload XSS
            link.style.pointerEvents = 'none';
            link.style.color = '#999';
            link.style.cursor = 'not-allowed';
        }
    });
}
