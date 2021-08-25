import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import useInput from '../customhook/CustomHook'
import ApiService from '../../Api/ApiService';
import { useState } from 'react';
import sampleData from './BoardSampleData';
function BoardComponent(){
    let data =sampleData.data;
    
    const [postingUnits,setPostingUnits] = useInput(10);    // 게시글 단위
    const [findInput, setFindInput] = useInput('');         // 검색창
    const [message, setMessage] = useInput('');             // 메시지
    const [curPage, setCurPage] = useState(1);              // 현재 페이지
    const size  = data.length;          // 게시글 데이터 갯수
    const history = useHistory();

    // 서버에 게시글 단위 요청
    const onPostingUnitsSubmit = useCallback((e)=>{
        e.preventDefault();

        setPostingUnits(e);

        ApiService.changePostingUnits(postingUnits)
            .then(res =>{
                setMessage("게시글 단위 " + postingUnits + "로 변경 완료");
                console.log(message);
                history.push('/board');
            })
            .catch(err =>{
                console.log('changePostingUnits Error',err);
            });
    },[postingUnits,setPostingUnits, message, setMessage, history]);

    // 서버에 검색 요청
    const onSearchSubmit = useCallback((e)=>{
        e.preventDefault();

        ApiService.searchingPosting(findInput)
            .then(res =>{
                setMessage(findInput + "내용의 게시글 검색을 성공하였습니다.");
                console.log(message);
                history.push('/board');
            })
            .catch(err =>{
                console.log('searchingPosting Error',err);
            });
    },[findInput, message, setMessage, history]);

    //////////////////////////////////////////////////////////////////////////////////////

    // 페이지 변경
    const onChangePage = (num)=>{
        setCurPage(num);
    }

    // 각각의 페이지 버튼 생성
    const page = (pageNum, active)=>{
        const names = "paginate_button page-item " + active;
        
        return (
            // className="active" 적용시 페이지 활성화 스타일
            <li className={names} key={pageNum}>
                <button onClick={()=>{onChangePage(pageNum)}} aria-controls="dataTable" data-dt-idx={pageNum} tabIndex="0" className="page-link">{pageNum}</button>
            </li>
        );
    }

    // 페이지 그룹 생성
    const pageList = [];
    const lastPage = (size%10===0 ? parseInt(size/10) : (parseInt(size/10)+1));

    for(let i=1;i<=lastPage;i++)
    {
        if(i===curPage)  // 현재 페이지의 className에 active 클래스 추가
        {
            pageList.push(page(i,'active'));
        }
        else
        {
            pageList.push(page(i,''));
        }
        
    }

    //////////////////////////////////////////////////////////////////////////////////////

    // 게시글 목록 프레임
    const PostingFactory = (posting)=>{
        // const order = (posting.regnum%2 === 0 ? 'even' : 'odd');
        // const sorting = 'sorting_'+posting.regnum;
        const pageUrl= '/boardDetail/'+posting.regnum;
        return (
            <tr key={posting.regnum}>
                <td>{posting.regnum}</td>
                <td><a href={pageUrl} className="text-decoration-none text-dark">{posting.title}</a></td>
                <td>{posting.author}</td>
                <td>{posting.regdate}</td>
                <td>{posting.hit}</td>
                <td>{posting.recommand}</td>
            </tr>
        );
    }
    
    // 페이지네이션 알고리즘
    const postingList = [];
    const start = (curPage-1)*postingUnits;     // 현재 페이지에 따른 시작 인덱스
    const end = curPage*postingUnits-1;         // 현재 페이지에 따른 종료 인덱스


    // start~end 번까지의 데이터 참조하여 리스트로 구성
    for(let i=start ; i<=end ; i++)
    {
        if(i<data.length)
        {
            postingList.push(PostingFactory(data[i]));
        }
        else
        {
            break;
        }
    }

    // Next 버튼 기능
    const onClickNext = ()=>{
        let nextPage = curPage+5;
        if(nextPage>lastPage)
        {
            nextPage = lastPage;
        }
        onChangePage(nextPage);
    }

    // Prev 버튼 기능
    const onClickPrev = ()=>{
        let nextPage = curPage-5;
        if(nextPage<1)
        {
            nextPage = 1;
        }
        onChangePage(nextPage);
    }

    // 현재 페이지에 따른 Previous, Next 버튼 비활성화, 활성화 수행
    useEffect(()=>{
        const previous = document.querySelector("#dataTable_previous");
        const next = document.querySelector("#dataTable_next");
        if(curPage===1)
        {
            previous.classList.add("disabled");
        }else
        {
            previous.classList.remove("disabled");
        }

        if(curPage===lastPage)
        {
            next.classList.add("disabled");
        }else
        {
            next.classList.remove("disabled");
        }

    },[curPage,lastPage]);

    return (        
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Board</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="dataTables_length" id="dataTable_length">
                                        <label> 게시글 단위
                                            <select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm" onChange={onPostingUnitsSubmit}>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                            </select>
                                        </label>
                                        
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <div id="dataTable_filter" className="dataTables_filter">
                                        <form onSubmit={onSearchSubmit}>
                                            <label>검색:
                                                <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="dataTable" value={findInput} onChange={setFindInput}/>
                                            </label>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info" style={{width:'100%'}}>
                                <thead>
                                    <tr role="row">
                                        <th className="sorting sorting_asc" tabIndex="0" aria-controls="dataTable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="번호 : 게시글의 등록번호, 최신순일수록 상위에 위치한다." style={{width: '57px'}}>번호</th>
                                        <th className="sorting" tabIndex="0" aria-controls="dataTable" rowSpan="1" colSpan="1" aria-label="제목 : 게시글의 제목" style={{width: '61px'}}>제목</th>
                                        <th className="sorting" tabIndex="0" aria-controls="dataTable" rowSpan="1" colSpan="1" aria-label="글쓴이 : 게시글의 작성자" style={{width: '49px'}}>글쓴이</th>
                                        <th className="sorting" tabIndex="0" aria-controls="dataTable" rowSpan="1" colSpan="1" aria-label="작성일 : 게시글 작성일자" style={{width: '31px'}}>작성일</th>
                                        <th className="sorting" tabIndex="0" aria-controls="dataTable" rowSpan="1" colSpan="1" aria-label="조회 : 게시글의 조회수" style={{width: '68px'}}>조회</th>
                                        <th className="sorting" tabIndex="0" aria-controls="dataTable" rowSpan="1" colSpan="1" aria-label="추천 : 게시글의 추천수" style={{width: '67px'}}>추천</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {postingList}
                                </tbody>
                            </table>
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-7">
                                    <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                        <ul className="pagination justify-content-end">
                                            <li className="paginate_button page-item previous disabled" id="dataTable_previous">
                                                <button onClick={onClickPrev} aria-controls="dataTable" data-dt-idx="0" tabIndex="0" className="page-link">Previous</button>
                                            </li>
                                            {pageList}
                                            <li className="paginate_button page-item next" id="dataTable_next">
                                                <button onClick={onClickNext} aria-controls="dataTable" data-dt-idx="7" tabIndex="0" className="page-link">Next</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-5">
                                    <div className="d-flex justify-content-end">
                                        <a href="/boardInsert" className="btn btn-primary">
                                            <span className="text">글쓰기</span>
                                        </a>
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

export default BoardComponent;

