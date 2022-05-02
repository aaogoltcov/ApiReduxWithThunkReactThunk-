export default function getTransaction(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_POST}/${id}`);
            if (response.ok) {
                resolve({
                    status: true,
                    message: ("Success: " + response.status),
                    response: await response.json(),
                });
            } else {
                console.log("Ошибка HTTP: " + response.status);
                setTimeout(() => resolve(getTransaction(id)), 1000);
                // reject();
            }
        } catch (e) {
            console.log("Ошибка HTTP: " + e);
            setTimeout(() => resolve(getTransaction(id)), 1000);
            // reject(e);
        }
    })
}