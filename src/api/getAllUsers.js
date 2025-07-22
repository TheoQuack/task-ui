
const getAllUsers = async (token) => {
    const API_URL = import.meta.env.VITE_API_URL;

    try{
        var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    const response = await fetch(`${API_URL}/api/users`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error))

    return response

    } catch (err) {
        console.log("error", err)
    }
    
}


export default getAllUsers