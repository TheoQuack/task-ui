


const createTask = async ({title, dueDate, status}) => {

    
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("TOKEN")}`);
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

fetch("http://localhost:3000/api/tasks", requestOptions)
  .catch(error => console.log('error', error));

}

export default createTask;