const createTask = async ({ title, dueDate, status }, token) => {
  const API_URL = import.meta.env.VITE_API_URL;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "title": title,
    "status": status,
    "dueDate": dueDate
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    const response = await fetch(`${API_URL}/api/tasks`, requestOptions);

    if (!response.ok) {
      // If the response is not OK (e.g., 400, 500 status), parse the error
      // message from the response body and throw a new Error.
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`);
    }

    // If the response is OK, parse the JSON and return it.
    const result = await response.json();
    return result;

  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error creating task:', error);
    // Re-throw the error so it can be caught by the calling function (handleAdd in addTaskModal.jsx)
    throw error;
  }
};

export default createTask;