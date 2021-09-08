import ApiService from "../../Api/ApiService";

const isDuplicatedInfo = (member)=>{
    return new Promise((resolve,reject)=>{
        resolve(member);
    });
}

// 유효성 검사 : 아이디
const checkDuplicateID = (member)=>{
    return new Promise((resolve, reject)=>{
        ApiService.checkDuplicateID(member)
        .then(res => {
            if(res.data>=1)
            {
                reject(new Error(member.id+"가 중복되었습니다."));
            }
            resolve(member);
        })
        .catch(err =>{console.log("아이디 중복체크 함수 오류",err);});
    });
}

// 유효성 검사 : 이메일
const checkDuplicateEmail = (member)=>{
    return new Promise((resolve,reject)=>{
        ApiService.checkDuplicateEmail(member)
        .then(res => {
            if(res.data>=1)
            {
                reject(new Error(member.email+"가 중복되었습니다."));
            }
            resolve(member);
        })
        .catch(err =>{console.log("이메일 중복체크 함수 오류",err);});
    });
}

// 유효성 검사 : 연락처
const checkDuplicatePhone = (member)=>{
    return new Promise((resolve, reject)=>{
        ApiService.checkDuplicatePhone(member)
        .then(res => {
            if(res.data>=1)
            {
                reject(new Error(member.email+"가 중복되었습니다."));
            }
            resolve(member);
        })
        .catch(err =>{
            console.log("연락처 중복체크 함수 오류",err);
        });
    });
}

export {isDuplicatedInfo, checkDuplicateID, checkDuplicateEmail, checkDuplicatePhone};

