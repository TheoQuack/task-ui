


const createTask = async ({title, dueDate, status}, token) => {
const API_URL = import.meta.env.VITE_API_URL
    
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

fetch(`${API_URL}/api/tasks`, requestOptions)
  .catch(error => console.log('error', error));

}

export default createTask;