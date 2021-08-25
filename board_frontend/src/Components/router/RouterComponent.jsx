import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "../../Pages/Home";
import Board from "../../Pages/Board";
import Login from "../../Pages/Login";
import SignUp from "../../Pages/SingUp";
import ForgotPassword from "../../Pages/ForgotPassword";
import BoardInsert from "../../Pages/BoardInsert";
import BoardDetail from "../../Pages/BoardDetail";
import BoardEdit from '../../Pages/BoardEdit';
const AppRouter = () =>{
    return (
       <div>
           <BrowserRouter>
           <div>
                <Switch>
                   <Route exact path="/" component={Home}/>
                   <Route path="/home" component={Home}/>
                   <Route path="/signUp" component={SignUp}/>
                   <Route path="/login" component={Login}/>
                   <Route path="/forgotPassword" component={ForgotPassword}/>
                   <Route path="/boardInsert" component={BoardInsert}/>
                   <Route path="/boardDetail/:regnum" component={BoardDetail}/>
                   <Route path="/boardEdit/:regnum" component={BoardEdit}/>
                   <Route path="/board" component={Board}/>
                </Switch>
           </div>
           </BrowserRouter>
       </div> 
    );
}

export default AppRouter;