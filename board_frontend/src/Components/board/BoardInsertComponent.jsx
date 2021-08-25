import useInput from '../customhook/CustomHook';
import ApiService from '../../Api/ApiService';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

function BoardInsertComponent()
{
    const history = useHistory();
    const [title, setTitle] = useInput('');
    const [content, setContent] = useInput('');
    const [message, setMessage] = useInput('');

    // 게시글 작성
    const onSubmit = useCallback((e)=>{
        e.preventDefault();

        let posting = {
            "title" : title,
            "content" : content,
        }

        ApiService.insertPosting(posting)
            .then(res =>{
                setMessage("게시글 등록이 완료되었습니다.");
                console.log(message);
                history.push('/board');
            })
            .catch(err =>{
                console.log('insertPosting Error',err);
            });
    },[message, setMessage, title, content, history]);

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
                                    <h1 className="h4 text-gray-900 mb-4">게시글 작성</h1>
                                </div>
                                <form className="user" onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <input type="text" className="form-control rounded" id="title" placeholder="제목" value={title} onChange={setTitle} />
                                            <label htmlFor="title">제목</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-floating">
                                            <textarea className="form-control rounded" placeholder="내용" id="content" style={{height : '100px'}} value={content} onChange={setContent}></textarea>
                                            <label htmlFor="content">내용</label>
                                        </div>
                                    </div>

                                    <button type='submit' className="btn btn-primary btn-user btn-block">
                                        작성
                                    </button>
                                    <a href="/board" className="btn btn-danger btn-user btn-block">
                                        취소
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

export default BoardInsertComponent;