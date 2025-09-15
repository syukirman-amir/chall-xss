// Kirim URL jendela saat ini ke parent window
parent.postMessage(window.location.toString(), "*");

// Override window.alert
var originalAlert = window.alert;
window.alert = function(s) {
    parent.postMessage("success", "*");
    setTimeout(function() { 
        originalAlert("Congratulations, you executed an alert:\n\n" 
            + s + "\n\nClick OK.");
    }, 50);
};

// Override window.confirm
var originalConfirm = window.confirm;
window.confirm = function(s) {
    parent.postMessage("confirm", "*");
    setTimeout(function() { 
        return originalConfirm("Congratulations, you executed an confirm:\n\n" 
            + s + "\n\nClick OK.");
    }, 50);
};

// Override window.prompt
var originalPrompt = window.prompt;
window.prompt = function(s, defaultValue = "") {
    parent.postMessage("prompt", "*");
    setTimeout(function() { 
        return originalPrompt("Congratulations, you executed an prompt:\n\n" 
            + s + "\n\nClick OK..", defaultValue);
    }, 50);
};

function isValidURL(url) {
    // Regex untuk memeriksa URL valid (hanya http, https, ftp) dengan struktur ketat
    const urlPattern = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+)(:[0-9]+)?([/a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]*)?$/i;
    const decodedUrl = decodeURIComponent(url || '');
    // Hanya izinkan URL yang sesuai dengan pola, tidak kosong, dan tidak mengandung <, >, atau "
    return decodedUrl && urlPattern.test(decodedUrl) && !/[<>"]/.test(decodedUrl);
}

function handleSubmit(event) {
    event.preventDefault();

    // Ambil input HTML dari textarea
    const htmlInput = document.getElementById('htmlInput').value;
    const outputDiv = document.getElementById('output');

    // Dekode input untuk memeriksa konten
    const decodedInput = decodeURIComponent(htmlInput);

    // Validasi data-type dan data-value terlebih dahulu untuk efisiensi
    const parser = new DOMParser();
    const tempDoc = parser.parseFromString(decodedInput, 'text/html');
    const links = tempDoc.querySelectorAll('a[data-type]');
    for (let link of links) {
        const dataType = link.getAttribute('data-type');
        const decodedDataType = decodeURIComponent(dataType || '');
        // Hanya izinkan data-type="link" atau data-type="link%0a"
        if (decodedDataType !== 'link' && decodedDataType !== 'link\n') {
            outputDiv.innerHTML = '<p style="color:red;">Error: Only links with data-type containing \'link\' are allowed!</p>';
            return;
        }
        const url = link.getAttribute('data-value');
        // Jika data-value ada, harus merupakan URL valid
        if (url && !isValidURL(url)) {
            outputDiv.innerHTML = '<p style="color:red;">Error: url invalid!</p>';
            return; // Hentikan pemrosesan jika data-value bukan URL valid
        }
        // Jika data-type="link" tapi data-value kosong, tolak
        if (decodedDataType === 'link' && !url) {
            outputDiv.innerHTML = '<p style="color:red;">Error: url invalid!</p>';
            return; // Hentikan pemrosesan jika data-value kosong untuk data-type="link"
        }
    }

    // Validasi struktur HTML: Hanya izinkan tag <a> tanpa tag HTML di dalamnya
    const doc = parser.parseFromString(decodedInput, 'text/html');
    const elements = doc.body.childNodes;
    let isValid = true;

    // Periksa setiap node di input
    elements.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName.toLowerCase() !== 'a') {
                isValid = false; // Tolak jika ada tag selain <a>
            } else {
                // Periksa child nodes di dalam tag <a> secara rekursif
                const checkChildNodes = (nodes) => {
                    nodes.forEach(child => {
                        if (child.nodeType === Node.ELEMENT_NODE) {
                            isValid = false; // Tolak jika ada tag HTML apa pun di dalam <a>
                        }
                        // Periksa child nodes lebih dalam (rekursif)
                        if (child.childNodes) {
                            checkChildNodes(child.childNodes);
                        }
                    });
                };
                checkChildNodes(node.childNodes);
            }
        }
    });

    if (!isValid) {
        outputDiv.innerHTML = '<p style="color:red;">Error: Only &lt;a&gt; tags are allowed!</p>';
        return;
    }

    // Masukkan input HTML ke dalam output
    outputDiv.innerHTML = htmlInput;

    // Proses semua elemen <a> dengan data-type yang mengandung "link"
    const outputLinks = document.querySelectorAll('a[data-type]');
    outputLinks.forEach(link => {
        const dataType = decodeURIComponent(link.getAttribute('data-type') || '');
        const url = link.getAttribute('data-value');

        // Hanya proses jika data-type bukan "link" secara eksak atau jika URL valid
        if (dataType !== 'link') {
            if (url) {
                link.setAttribute('href', url); // 
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
