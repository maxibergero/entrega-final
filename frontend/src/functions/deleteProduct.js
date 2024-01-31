export const deleteProduct = async(idCart, idProduct) => {
    try {
        const response = await fetch(`http://localhost:4000/api/carts/${idCart}/products/${idProduct}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}