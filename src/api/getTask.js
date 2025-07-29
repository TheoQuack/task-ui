const getTask = async (token, id) => {

    const API_URL = import.meta.env.VITE_API_URL;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`${API_URL}/api/users/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


}


export default getTask;