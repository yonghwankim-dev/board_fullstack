import BoardDetailComponent from "../Components/board/BoardDetailComponent";
import NavComponent from "../Components/NavComponent";

function BoardDetail(props){
    const regnum = props.match.params.regnum;

    return (
        <>
        <NavComponent/>
        <BoardDetailComponent regnum={regnum}/>
        </>
    );
}

export default BoardDetail;