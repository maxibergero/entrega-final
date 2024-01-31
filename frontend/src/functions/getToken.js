export const getToken = async (email, password) => {
    try {
        const response = await fetch('http://localhost:4000/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })

        const data = await response.json()

        return data.token
    } catch (error) {
        throw new Error(error)
    }
}