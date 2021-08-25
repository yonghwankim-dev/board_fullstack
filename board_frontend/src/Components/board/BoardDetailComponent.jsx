import { useHistory } from 'react-router';
import sampleData from './BoardSampleData';
import useInput from '../customhook/CustomHook';
import ApiService from '../../Api/ApiService';
import { useCallback } from 'react';
function BoardDetailComponent(props)
{
    const history = useHistory();
    const regnum = parseInt(props.regnum);
    const data =sampleData.data;

    const posting = data.find((posting)=>{
        return posting.regnum === regnum;
    });

    const [message, setMessage] = useInput('');

    const onEditPosting = useCallback((e)=>{
        history.push("/boardEdit/"+regnum);
    },[history, regnum]);

    const onDeletePosting = useCallback((e)=>{
        e.preventDefault();
        
        ApiService.deletePosting(regnum)
        .then(res =>{
            setMessage("게시글 삭제가 완료되었습니다.");
            console.log(message);
            history.push('/board');
        })
        .catch(err =>{
            console.log('deletePosting Error',err);
        });
    },[history, message, setMessage, regnum]);
    
    return (
        <>
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {
                        // Nested Row within Card Body
                    }
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">게시글 내용</h1>
                                </div>
                                <form className="user">
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <input type="text" className="form-control rounded" id="title" placeholder="제목" value={posting.title} readOnly/>
                                            <label htmlFor="title">제목</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <input type="text" className="form-control rounded" id="author" placeholder="글쓴이" value={posting.author} readOnly/>
                                            <label htmlFor="author">글쓴이</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <input type="text" className="form-control rounded" id="regdate" placeholder="작성일" value={posting.regdate} readOnly/>
                                            <label htmlFor="regdate">작성일</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <input type="text" className="form-control rounded" id="hit" placeholder="조회" value={posting.hit} readOnly/>
                                            <label htmlFor="hit">조회</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <input type="text" className="form-control rounded" id="recommand" placeholder="추천" value={posting.recommand} readOnly/>
                                            <label htmlFor="recommand">추천</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <input type="text" className="form-control rounded" id="comment" placeholder="댓글" value="0" readOnly/>
                                            <label htmlFor="comment">댓글</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <textarea className="form-control rounded" placeholder="내용" id="content" style={{height : '100px'}} value={posting.content} readOnly/>
                                            <label htmlFor="content">내용</label>
                                        </div>
                                    </div>

                                    <button onClick={onEditPosting} className="btn btn-primary btn-user btn-block">
                                        수정
                                    </button>
                                    <button onClick={onDeletePosting} className="btn btn-warning btn-user btn-block">
                                        삭제
                                    </button>
                                    <a href="/board" className="btn btn-danger btn-user btn-block">
                                        뒤로가기
                                    </a>
                                </form>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default BoardDetailComponent;