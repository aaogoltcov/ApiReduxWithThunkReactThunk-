export default function deleteTransaction(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let response =
                await fetch(`${process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_POST}/${id}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json;charset=utf-8'},
                }
            )
            if (response.ok) {
                resolve({
                    status: true,
                    message: ("Success: " + response.status),
                    response: await response,
                });
            } else {
                console.log("Ошибка Response: " + response.status);
                // setTimeout(() => resolve(deleteTransaction(id)), 3000);
                reject();
            }
        } catch (e) {
            console.log("Ошибка HTTP: " + e);
            // setTimeout(() => resolve(deleteTransaction(id)), 3000);
            reject(e);
        }
    })
}