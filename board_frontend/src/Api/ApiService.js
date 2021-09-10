import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080";

class ApiService{
    // 홈화면으로 이동
    fetchHome = ()=>{
        return axios.get(USER_API_BASE_URL+"/home");
    }
    
    // 회원가입
    addMember = (member)=>{
        return axios.post(USER_API_BASE_URL+'/member',member);
    }
    // 아이디 중복 체크
    checkDuplicateID = (member)=>{
        return axios.post(USER_API_BASE_URL+"/member/checkID",member);
    }
    // 이메일 중복 체크
    checkDuplicateEmail = (member)=>{
        return axios.post(USER_API_BASE_URL+"/member/checkEmail",member);
    }
    // 연락처 중복 체크
    checkDuplicatePhone = (member)=>{
        return axios.post(USER_API_BASE_URL+"/member/checkPhone",member);
    }


    // 로그인
    login = (member)=>{
        return axios.post(USER_API_BASE_URL+'/member/login',member);
    }
    
    // 비밀번호 초기화
    resetPassword = (email)=>{
        return axios.post(USER_API_BASE_URL+'/resetPassword',email);
    }

    // 게시글 단위 요청
    changePostingUnits = (postingUnits)=>{
        return axios.get(USER_API_BASE_URL+'/board/'+postingUnits);
    }

    // 게시글 검색
    searchingPosting = (findInput)=>{
        return axios.post(USER_API_BASE_URL+'/board',findInput);
    }

    // 게시글 등록
    insertPosting = (posting) =>{
        return axios.post(USER_API_BASE_URL+"/boardInsert",posting);
    }

    // 게시글 수정
    editPosting = (posting)=>{
        return axios.post(USER_API_BASE_URL+"/boardEdit",posting);
    }

    // 게시글 삭제
    deletePosting = (regnum)=>{
        return axios.post(USER_API_BASE_URL+"/boardDelete",regnum);
    }
}

export default new ApiService();