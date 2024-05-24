export default async function captura(element = document.getElementById('faturacionContainer')) {
    return new Promise((resolve, reject) => {
        html2canvas(element).then(function(canvas) {
            var imgData = canvas.toDataURL('image/png');
            var link = document.createElement('a');
            link.style.display = 'none';
            link.href = imgData;
            link.download = 'captura.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            resolve(imgData);
        });
    }); // No se implementa
}