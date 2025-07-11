const deleteTask = async (id) => {


var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("TOKEN")}`);

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

for (let i = 0; i < id.length; i++) {
    fetch(`http://localhost:3000/api/tasks/${id[i]}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}


}

export default deleteTask;