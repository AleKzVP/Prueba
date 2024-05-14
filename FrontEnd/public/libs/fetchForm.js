export default function fetchForm({formID="", endPoint=""}) {
    return new Promise((resolve, reject) => {
        const form = document.getElementById(formID);
        const formData = new FormData(form);
        fetch(endPoint, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}