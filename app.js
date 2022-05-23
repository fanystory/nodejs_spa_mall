//------------------------------------------------------------
//  🧑🏻‍💻 셋팅 영역
//------------------------------------------------------------

const express = require('express'); //express 패키지 불러오기
const app = express(); //함수처럼 실행 app은 express의 서버 객체
const port = 3000;

const connect = require('./schemas/');
connect();

const goodsRouter = require('./routes/goods');
const cartsRouter = require('./routes/carts');

//------------------------------------------------------------
//  🧑🏻‍💻 미들웨어
//------------------------------------------------------------

const requestMiddleware = (req, res, next) => {
    const nowDate = new Date();
    console.log(`🟠CLIENT: ${req.originalUrl} - ${nowDate.getFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDay()+1} ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`);
    next();
    //res.send("이건 미들웨어의 응답입니다.")
    //next대신 이걸 쓰면 인터셉트 할 수 있음
};

app.use(express.urlencoded());
app.use(express.json());
app.use(requestMiddleware);

app.use('/api', [goodsRouter, cartsRouter]);

//------------------------------------------------------------
//  🧑🏻‍💻 라우터
//------------------------------------------------------------

app.get('/', (req, res) => {
    res.send("HELLO WORLD");
});

//------------------------------------------------------------
//  🧑🏻‍💻 서비스 실행 영역
//------------------------------------------------------------

app.listen(port, ()=>{
    console.log(`🟢SERVER: ${port}로 서버 실행`);
})