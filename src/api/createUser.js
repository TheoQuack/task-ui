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

    try {
        const response = await fetch(`${API_URL}/api/users`, requestOptions);
        const data = await response.json(); // Always attempt to parse JSON for errors too

        if (!response.ok) {
            // If the response is not OK (e.g., 4xx or 5xx status)
            // Throw an error that includes the backend's message/errors
            const error = new Error(data.message || 'An error occurred');
            error.response = { data: data }; // Attach the full backend response data
            throw error;
        }

        return data; // Return the successful response data

    } catch (error) {
        // This catch block handles network errors or errors thrown above
        console.error('Error in createUser API call:', error);
        throw error; // Re-throw the error so the calling component can catch it
    }
}

export default createUser;