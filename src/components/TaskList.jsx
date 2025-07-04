import { useEffect, useState } from "react";
import  TaskCard  from "./TaskCard";
import { sampleTasks } from "../data/sampleTasks";
import getAllTasks from "../api/getAllTasks";


export default function TaskList() {

    const [tasks, setTasks] = useState(sampleTasks);

    const allTheTasks = async () => {
        const allTasks = await getAllTasks();
        setTasks(allTasks);
        console.log(allTasks);
    };

    useEffect(()=>{
        allTheTasks();
    }, [])

    const toggleTasks = (id) => {
    const updated = tasks.map((task) => task.id === id ? {...task, done: !task.done}: task);
    setTasks(updated);
    };

    









    





    // const [tasks, setTasks] = useState([]);

    // const tasksAll = async () => {
    //     const AllTasks = await getAllTasks();
    //     setTasks(AllTasks);
    // }

    // useEffect(()=>{
    //     tasksAll();
    // })

    return (

        <div>
            {tasks && tasks.length && tasks.map( task => (
                <TaskCard key={task.id} task={task} toggle={toggleTasks} ></TaskCard>
            ))}
        </div>

    );

}