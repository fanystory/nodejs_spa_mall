//------------------------------------------------------------
//  ๐ง๐ปโ๐ป ์ํ ์์ญ
//------------------------------------------------------------

const express = require('express'); //express ํจํค์ง ๋ถ๋ฌ์ค๊ธฐ
const app = express(); //ํจ์์ฒ๋ผ ์คํ app์ express์ ์๋ฒ ๊ฐ์ฒด
const port = 3000;

const connect = require('./schemas/');
connect();

const goodsRouter = require('./routes/goods');

//------------------------------------------------------------
//  ๐ง๐ปโ๐ป ๋ฏธ๋ค์จ์ด
//------------------------------------------------------------

const requestMiddleware = (req, res, next) => {
    const nowDate = new Date();
    console.log(`๐ CLIENT: ${req.originalUrl} - ${nowDate.getFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDay()+1} ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`);
    next();
    //res.send("์ด๊ฑด ๋ฏธ๋ค์จ์ด์ ์๋ต์๋๋ค.")
    //next๋์  ์ด๊ฑธ ์ฐ๋ฉด ์ธํฐ์ํธ ํ  ์ ์์
};

app.use(express.static('static'));
app.use(express.urlencoded());
app.use(express.json());
app.use(requestMiddleware);

app.use('/api', [goodsRouter]);

//------------------------------------------------------------
//  ๐ง๐ปโ๐ป ๋ผ์ฐํฐ
//------------------------------------------------------------

app.get('/', (req, res) => {
    res.send("HELLO WORLD");
});

//------------------------------------------------------------
//  ๐ง๐ปโ๐ป ์๋น์ค ์คํ ์์ญ
//------------------------------------------------------------

app.listen(port, ()=>{
    console.log(`๐ขSERVER: ${port}๋ก ์๋ฒ ์คํ`);
});