
function BoardSampleData(){
    // 게시글 샘플 데이터
    let data = [
        {regnum : 1, title : 'title1', author : 'user1', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user1', content:"게시글 내용"},
        {regnum : 2, title : 'title1', author : 'user2', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user2', content:"게시글 내용"},
        {regnum : 3, title : 'title3', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 4, title : 'title4', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 5, title : 'title5', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 6, title : 'title6', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 7, title : 'title7', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 8, title : 'title8', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 9, title : 'title9', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 10, title : 'title10', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 11, title : 'title11', author : 'user1', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user1', content:"게시글 내용"},
        {regnum : 12, title : 'title12', author : 'user2', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user2', content:"게시글 내용"},
        {regnum : 13, title : 'title13', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 14, title : 'title14', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 15, title : 'title15', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 16, title : 'title16', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 17, title : 'title17', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 18, title : 'title18', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 19, title : 'title19', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 20, title : 'title20', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"},
        {regnum : 21, title : 'title21', author : 'user3', regdate : '2021-08-20', hit : 0, recommand : 0, id : 'user3', content:"게시글 내용"}
    ];
    // 내림차순 정렬
    data = data.sort(function(a,b){
        return b.regnum - a.regnum;
    });

    return {data}
}

export default BoardSampleData();