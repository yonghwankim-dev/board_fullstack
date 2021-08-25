import { useCallback } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ApiService from "../../Api/ApiService";
import useInput from '../customhook/CustomHook';

function LoginComponent(){
    const history = useHistory();

    const [id, setId] = useInput('');
    const [password, setPassword] = useInput('');
    const [remember, setRmember] = useState(false);
    const [message, setMessage] = useInput('');

    // Remember 체크박스의 값을 반전시킨다.
    const onToggleRemember = useCallback((e)=>{
        setRmember(!remember);
    },[remember,setRmember]);

    const onSubmit = useCallback((e)=>{
        e.preventDefault();

        let member = {
            "id" : id,
            "password" : password,
            "remember" : remember,
        }

        // 서버에 로그인 요청
        ApiService.login(member)
            .then(res =>{
                setMessage(member.id+'님이 성공적으로 등록되었습니다.');
                console.log(message);
                history.push('/home');
            })
            .catch(err =>{
                console.log('login Error',err);
            });
    },[id,password,remember,message,setMessage,history]);

    
    return (
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <form onSubmit={onSubmit} className="user">
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-user" name="id" aria-describedby="idHelp" placeholder="ID" value={id} onChange={setId}/>
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user" name="password" placeholder="Password" value={password} onChange={setPassword}/>
                                            </div>
                                            <div className="form-group">                                        
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck_remem" checked={remember} onChange={onToggleRemember}/>
                                                    <label className="custom-control-label" htmlFor="customCheck_remem">RememberMe</label>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-user btn-block">Login</button>
                                            <button className="btn btn-danger btn-user btn-block" onClick={()=>history.push('/home')}>Cancel</button>
                                        </form>
                                        <hr/>
                                        <div className="text-center">
                                            <a className="small" href="/forgotPassword">Forgot Password?</a>
                                        </div>
                                        <div className="text-center">
                                            <a href='/signUp' className="small">Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default LoginComponent;