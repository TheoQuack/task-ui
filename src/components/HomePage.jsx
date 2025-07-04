import { Container } from "@mui/material";
import { Link }from "react-router-dom";

export default function Home() {

    return (
        <Container>
            <h1>Home</h1>
            <p><Link to="/tasks">Go to My Tasks</Link></p>
        </Container>
        
    )

}