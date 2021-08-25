import BoardEditComponent from '../Components/board/BoardEditComponent';

function BoardEdit(props){
    const regnum = props.match.params.regnum;
    return (
        <>
        <BoardEditComponent regnum={regnum}/>
        </>
    )
}

export default BoardEdit;