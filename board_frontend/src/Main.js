import axios from 'axios';

function f1(callback){    
    axios.get('http://localhost:3000/').then((result)=>{
        console.log("function1 main : " + result.status);
        callback();
    });
}

function f2(callback){
    
    axios.get('http://localhost:3000/').then((result)=>{
        console.log("function2 main : " + result.status);
        callback();
    });
}

function f3(callback){
    
    axios.get('http://localhost:3000/').then((result)=>{
        console.log("function3 main : " + result.status);
        callback();
    });
}

/////////////////////////////////////////////////////////////////

function func1(parent_func){
    return new Promise((resolve, reject)=>{
        axios.get('http://localhost:3000/').then((result)=>{
            console.log("function1 routine******");
            console.log(parent_func);
            resolve('function1에서 왔씁니다.');
        });
    });
}

function func2(parent_func){
    return new Promise((resolve, reject)=>{
        axios.get('http://localhost:3000/').then((result)=>{
            console.log("function2 routine******");
            console.log(parent_func);
            resolve('function2에서 왔씁니다.');
        });
    });
}

var start_str = 'main에서 왔습니다.';


function Main(){

    // var globalNum = 10;

    // f1(()=>{
    //     console.log('function1 callback');
    //     f2(()=>{
    //         console.log('function2 callback');

    //         f3(()=>{
    //             console.log('function3 callback');
    //         });
    //     });
    // });
    
    // console.log('main : ' + globalNum);
    
    console.log('main routine***********');
    func1(start_str).then((parent_func)=>{
        console.log('function1 callback*******');
        console.log(parent_func);
        return parent_func
    }).then(func2);

    console.log('main 종료');

    

    return (
        <h1>Hello Main</h1>
    );
}




export default Main;