import {useCallback, useState } from "react";
import useInput from '../customhook/CustomHook'
import ApiService from '../../Api/ApiService';
import { useHistory } from "react-router";

function ForgotPasswordComponent(){
    const history = useHistory();

    const [email,setEmail] = useInput('');
    const [emailError, setEmailError] = useState(false);
    const [message, setMessage] = useInput('');

    // 이메일 정규식 검사
    const checkEmail = useCallback((e)=>{
        const regex = /^[a-z0-9.-_]+@([a-z0-9-]+.)+[a-z]{2,6}$/;    // user1@gmail.com
        if(regex.test(e.target.value)){
            setEmailError(false);
            setEmail(e);
        }
        else{
            setEmailError(true);
            e.target.value = '';
            setEmail(e);
        }
    },[setEmail,setEmailError]);

    const onSubmit = useCallback((e)=>{
        e.preventDefault();

        // 서버에 해당 이메일의 계정 비밀번호 리셋 요청
        ApiService.resetPassword(email)
            .then(res =>{
                setMessage(email+'이메일 계정의 비밀번호가 성공적으로 초기화되었습니다.');
                console.log(message);
                history.push('/home');
            })
            .catch(err =>{
                console.log('resetPassword() Error',err);
            });
    },[email,history,message,setMessage]);

    
    return (
        <div className="container">
            {/* Outer Row*/}
            <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                            <p className="mb-4">We get it, stuff happens. Just enter your email address below
                                                and we'll send you a link to reset your password!</p>
                                        </div>
                                        <form onSubmit={onSubmit} className="user">
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." value={email} onChange={setEmail} onBlur={checkEmail}/>
                                                {emailError && <div style={{color:'red'}}>이메일 형식이 일치하지 않습니다. (user1@gmail.com)</div>}
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-user btn-block">
                                                Reset Password
                                            </button>
                                            <button className="btn btn-danger btn-user btn-block" onClick={()=>history.push('/home')}>Cancel</button>
                                        </form>
                                        <hr/>
                                        <div className="text-center">
                                            <a className="small" href="/signUp">Create an Account!</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small" href="/login">Already have an account? Login!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default ForgotPasswordComponent;