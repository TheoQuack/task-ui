

const getAllTasks = async () => {


    try{ 

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("TOKEN")}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    const response = await fetch("http://localhost:3000/api/tasks", requestOptions)
    .then((response) => response.json())
    .catch(error => {throw error});

    return response

    } catch (err){
        console.log("getAllTasks",err);
    }
   

} 

export default getAllTasks;
