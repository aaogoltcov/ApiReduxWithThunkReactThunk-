export default function sendTransaction(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_POST, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
            if (response.ok) {
                resolve({
                    status: true,
                    message: ("Success: " + response.status),
                });
            } else {
                console.log("Ошибка HTTP: " + response.status);
                // setTimeout(() => resolve(sendTransaction(data)), 3000);
                reject();
            }
        } catch (e) {
            console.log("Ошибка HTTP: " + e);
            // setTimeout(() => resolve(sendTransaction(data)), 3000);
            reject(e);
        }
    })

}