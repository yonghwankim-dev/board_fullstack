
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

    const [title, setTitle] = useInput(posting.title);
    const [author, setAuthor] = useInput(posting.author);
    const [regdate, setRegdate] = useInput(posting.regdate);
    const [hit, setHit] = useInput(posting.hit);
    const [recommand, setRecommand] = useInput(posting.recommand);
    const [content, setContent] = useInput(posting.content);
    const [message, setMessage] = useInput('');

    const getToday = useCallback(()=>{
        const now = new Date();
        return now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate();
    },[]);
    
    const onEditPosting = useCallback((e)=>{
        e.preventDefault();
        
        let posting = {
            "regnum" : regnum,
            "title" : title,
            "author" : author,
            "regdate" : regdate,
            "hit" : hit,
            "recommand" : recommand,
            "content" : content,
        }

        ApiService.editPosting(posting)
            .then(res =>{
                setMessage("게시글 수정이 완료되었습니다.");
                console.log(message);
                history.push('/boardDetail/'+regnum);
            })
            .catch(err =>{
                console.log('editPosting Error',err);
            });
    },[message, setMessage, history, regnum, title, author, regdate, hit, recommand, content]);


    
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
                                            <input type="text" className="form-control rounded" id="title" placeholder="제목" value={title} onChange={setTitle}/>
                                            <label htmlFor="title">제목</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <input type="text" className="form-control rounded" id="author" placeholder="글쓴이" value={author} onChange={setAuthor} readOnly/>
                                            <label htmlFor="author">글쓴이</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <input type="text" className="form-control rounded" id="regdate" placeholder="작성일" value={getToday()} onChange={setRegdate} readOnly/>
                                            <label htmlFor="regdate">작성일</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <input type="text" className="form-control rounded" id="hit" placeholder="조회" value={hit} onChange={setHit} readOnly/>
                                            <label htmlFor="hit">조회</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <input type="text" className="form-control rounded" id="recommand" placeholder="추천" value={recommand} onChange={setRecommand} readOnly/>
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
                                            <textarea className="form-control rounded" placeholder="내용" id="content" style={{height : '100px'}} value={content} onChange={setContent}/>
                                            <label htmlFor="content">내용</label>
                                        </div>
                                    </div>

                                    <button onClick={onEditPosting} className="btn btn-primary btn-user btn-block">
                                        수정
                                    </button>
                                    <button onClick={()=>history.push("/boardDetail/"+regnum)} className="btn btn-danger btn-user btn-block">
                                        취소
                                    </button>
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