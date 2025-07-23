
const createUser = async ({name, birthDate, role, email, password}, token) => {

    const API_URL = import.meta.env.VITE_API_URL;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "name": name,
    "birthDate": birthDate,
    "role": role,
    "email": email,
    "password": password
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`${API_URL}/api/users`, requestOptions)
    .then(response => response.text())
    .catch(error => console.log('error', error));


}


export default createUser;