export const getMyUser = async () => {
    //Obtener datos de mi usuario actualizado en todo momentos
    try {
        const response = await fetch('http://localhost:4000/api/users/myUser', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error)
    }
}