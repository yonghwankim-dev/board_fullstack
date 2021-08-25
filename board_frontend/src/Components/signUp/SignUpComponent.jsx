import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ApiService from "../../Api/ApiService";
import useInput from "../customhook/CustomHook";

function SignUpComponent(){
    
    // 회원 필드
    const [name, setName] = useInput('');
    const [id, setID] = useInput('');
    const [password, setPassword] = useInput('');
    const [confirmPassword, setConfirmPassword] = useInput('');
    const [email, setEmail] = useInput('');
    const [phone, setPhone] = useState('');
    const [birth, setBirth] = useInput('');
    const [gender, setGender] = useInput('');

    // 회원 필드 Error
    const [nameError, setNameError] = useState(false);
    const [idError, setIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordEqualError, setPasswordEqualError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [birthError, setBirthError] = useState(false);
    const [message, setMessage] = useInput('');
    const history = useHistory();

    // 회원 필드 유효성 검사
    const checkName = useCallback((e)=>{
        const regex = /^[a-zA-Z가-힣\s]{2,40}$/;    // 한글,영어,공백으로 2~40자
        if(regex.test(e.target.value)){
            setNameError(false);
            setName(e);
        }
        else{
            setNameError(true);
            e.target.value = '';
            setName(e);
        }
    },[setName, setNameError]);

    const checkID = useCallback((e)=>{
        const regex = /^[a-zA-Z0-9]{2,40}$/;    // 영어, 숫자로 2~40자
        if(regex.test(e.target.value)){
            setIdError(false);
            setID(e);
        }else{
            setIdError(true);
            e.target.value = '';
            setID(e);
        }
    },[setID, setIdError]);

    const checkPassword = useCallback((e)=>{
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8자, 최소 하나의 문자 및 하나의 숫자
        if(regex.test(e.target.value)){
            setPasswordError(false);
            setPassword(e);
        }else{
            setPasswordError(true);
            e.target.value = '';
            setPassword(e);
        }
    },[setPassword, setPasswordError]);

    const checkConfirmPassword = useCallback((e)=>{
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8자, 최소 하나의 문자 및 하나의 숫자
        if(regex.test(e.target.value)){
            setConfirmPasswordError(false);
            setConfirmPassword(e);
        }else{
            setConfirmPasswordError(true);
            e.target.value = '';
            setConfirmPassword(e);
        }
    },[setConfirmPassword, setConfirmPasswordError]);

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
    },[setEmail, setEmailError]);

    const onChangePhone = useCallback((e) =>{
        const regex = /^[0-9\b -]{0,13}$/;  // 010-0000-0000 형식
        if(regex.test(e.target.value)){
            setPhone(e.target.value);
        }
    },[setPhone]);

    const checkBirth = useCallback((e)=>{
        const in_birth = new Date(e.target.value);
        const today = new Date();

        // 만약 입력받은 생년월일이 당일보다 큰경우, 에러발생
        if(in_birth<today){
            setBirthError(false);
            setBirth(e);
        }else{
            setBirthError(true);
            e.target.value='';
            setBirth(e);
        }

    },[setBirth, setBirthError]);

    useEffect(()=>{
        if(phone.length===11){
            setPhone(phone.replace(/(\d{3})(\d{4})(\d{4})/,'$1-$2-$3'));
        }
        if(phone.length===13){
            setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/,'$1-$2-$3'));
        }
    },[phone]);

    

    // 회원가입 정보 추가
    const onSubmit = useCallback((e)=>{
        e.preventDefault();

        // 비밀번호 일치 검사
        if(password!==confirmPassword)
        {
            return setPasswordEqualError(true);
        }else{
            setPasswordEqualError(false);
        }
        

        let member = {
            "name" : name,
            "id" : id,
            "password" : password,
            "email" : email,
            "phone" : phone,
            "birth" : birth,
            "gender" : gender,
        }

        // 서버에 회원 가입 요청
        ApiService.addMember(member)
            .then(res =>{
                setMessage(member.name+'님이 성공적으로 등록되었습니다.');
                console.log(message);
                history.push('/home');
            })
            .catch(err =>{
                console.log('addMember() Error',err);
            });


    },[name,id,password,confirmPassword,email,phone,birth,gender,message, history, setMessage]);

    

    return (
        <>
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user" onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-user" name="name"placeholder="name" value={name} onChange={setName} onBlur={checkName} required/>
                                        {nameError && <div style={{color:'red'}}>이름 형식이 일치하지 않습니다. (한글,영어,공백포함 2~40자)</div>}
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-user" name="id" placeholder="id" value={id} onChange={setID} onBlur={checkID} required/>
                                        {idError && <div style={{color:'red'}}>아이디 형식이 일치하지 않습니다. (영어,숫자 2~40자)</div>}
                                    </div>

                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-user" name="password" placeholder="password" value={password} onChange={setPassword} onBlur={checkPassword} required/>
                                        {passwordError && <div style={{color:'red'}}>비밀번호 형식이 일치하지 않습니다. (최소 8자, 최소 하나의 문자 및 하나의 숫자)</div>}
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-user" name="confirmPassword" placeholder="confirm password" value={confirmPassword} onChange={setConfirmPassword} onBlur={checkConfirmPassword} required/>
                                        {confirmPasswordError && <div style={{color:'red'}}>비밀번호 형식이 일치하지 않습니다. (최소 8자, 최소 하나의 문자 및 하나의 숫자)</div>}
                                        {passwordEqualError && <div style={{color:'red'}}>비밀번호가 일치하지 않습니다.</div>}
                                    </div>
                                    
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-user" name="email" placeholder="email" value={email} onChange={setEmail} onBlur={checkEmail} required/>
                                        {emailError && <div style={{color:'red'}}>이메일 형식이 일치하지 않습니다. (user1@gmail.com)</div>}
                                    </div>
                    
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-user" name="phone" placeholder="010-0000-0000"  value={phone} onChange={onChangePhone} required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-user" name="birth" value={birth} onChange={setBirth} onBlur={checkBirth} required/>
                                        {birthError && <div style={{color:'red'}}>선택한 날짜는 당일보다 큽니다.</div>}
                                    </div>
                                    <div className="form-group">
                                            <div className="form-control form-control-user px-3 py-1">
                                                <div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" onClick={setGender} required/>
                                                        <label className="form-check-label" htmlFor="male">남</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" id="female" value="female" onClick={setGender}/>
                                                        <label className="form-check-label" htmlFor="female">여</label>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-user btn-block">
                                        Register User
                                    </button>
                                    <a href="/home" className="btn btn-danger btn-user btn-block">
                                        Cancel
                                    </a>
                                </form>
                                <hr />
                                <div className="text-center">
                                    <a className="small" href="/forgotPassword">Forgot Password?</a>
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
        </>
    );
}

export default SignUpComponent;