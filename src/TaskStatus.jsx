export default function TaskStatus({isDone, name}){

  return (
    <div>
        {name}
      {isDone ? <p> Task Complete!</p> : <p>Task Pending!</p>}
    </div>
  )

}