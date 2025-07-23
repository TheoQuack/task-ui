const deleteUser = async (id,token) => {
    const API_URL = import.meta.env.VITE_API_URL;
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`${API_URL}/api/users/${id}`, requestOptions)
    .then(response => response.text())
    .catch(error => console.log('error', error));

}


export default deleteUser;