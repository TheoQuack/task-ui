const updateUser = async ({ name, birthdate, role }, token, id) => {

    const API_URL = import.meta.env.VITE_API_URL;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "name": name,
    "birthDate": birthdate,
    "role": role
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`${API_URL}/api/users/${id}`, requestOptions)
    .then(response => response.text())
    .catch(error => console.log('error', error));


}


export default updateUser;