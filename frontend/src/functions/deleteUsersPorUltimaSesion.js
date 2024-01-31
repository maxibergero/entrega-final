export const deleteUsersPorUltimaSesion = async () => {

    try {
        const response = await fetch('http://localhost:4000/api/users', {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        if (response.status === 200) {
            
            return data
        } else {
            throw new Error(data.mensaje)
        }
    } catch (error) {
        throw new Error(error)
    }

}
