
import { Navigate, Route, } from "react-router-dom";

export default function Logout(){
 localStorage.setItem("TOKEN", "")
 
 console.log("hello")
 

 return "<AuthChecker/>"

}