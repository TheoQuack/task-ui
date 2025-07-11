


const createTask = async ({title, dueDate}) => {

console.log(dueDate, title)
    
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("TOKEN")}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "title": title,
  "status": "pending",
  "dueDate": dueDate
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/api/tasks", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

}

export default createTask;