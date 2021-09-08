import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from '../Pages/Home';
import SignUp from '../Pages/SingUp';
import Login from '../Pages/Login';
import ForgotPassword from '../Pages/ForgotPassword';
import Board from '../Pages/Board';
import BoardDetail from '../Pages/BoardDetail';
import BoardInsert from '../Pages/BoardInsert';
import BoardEdit from '../Pages/BoardEdit';
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