import { Card, CardContent, Typography, Button } from '@mui/material';

export default function TaskCard({task, toggle}){

    return (
        <Card sx={{mb: 2}}>
            <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography sx={{ mb:1 }} color={task.done ? 'green': 'red'}>
                    {task.done ? 'complete':'pending'}
                </Typography>

                <Button 
                    onClick={()=> toggle(task.id)}
                    color = {task.done ? 'error' : 'success'}
                    variant = "outlined"
                    >
                    {task.done ? 'Mark Incomplete' : 'Mark Done'}
                </Button>
            </CardContent>
        </Card>
    );

}