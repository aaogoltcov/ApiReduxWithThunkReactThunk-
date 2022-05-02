export default function getTransactions() {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_POST)
            if (response.ok) {
                resolve({
                    status: true,
                    message: ("Success: " + response.status),
                    response: await response.json(),
                });
            } else {
                console.log("Ошибка RESPONSE: " + response.status);
                reject();
            }
        } catch (e) {
            console.log("Ошибка HTTP: " + e);
            reject(e);
        }
    })
}