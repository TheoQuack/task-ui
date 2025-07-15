
const updateTask = async ({title, status, dueDate, id}) => {
// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "title": title,
//   "status": status,
//   "dueDate": dueDate
// });

// var requestOptions = {
//   method: 'PUT',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch(`http://localhost:3000/api/tasks/${id}`, requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("TOKEN")}`);
myHeaders.append("Content-Type", "application/json");


var raw = JSON.stringify({
  "title": title,
  "status": status,
  "dueDate": dueDate
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`http://localhost:3000/api/tasks/${id}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

}

export default updateTask;