const deleteTask = async (id, token) => {

const API_URL = import.meta.env.VITE_API_URL

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

for (let i = 0; i < id.length; i++) {
   await fetch(`${API_URL}/api/tasks/${id[i]}`, requestOptions)
  .catch(error => console.log('error', error));
}


}

export default deleteTask;