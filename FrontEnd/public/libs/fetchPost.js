export default function fetchPost({data, endPoint}){
    return new Promise((resolve, reject) => {
        fetch(endPoint.replaceAll(" ", ""), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}