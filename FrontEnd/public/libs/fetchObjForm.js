export default function fetchObjForm({ObjectSend, endPoint}) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        for (const key in ObjectSend) {
            formData.append(key, ObjectSend[key]);
        }
        fetch(endPoint, {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}