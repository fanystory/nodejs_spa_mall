const express = require('express');
const Goods = require('../schemas/goods.js');
const Cart = require('../schemas/cart.js')
const router = express.Router();

//------------------------------------------------------------
//  🧑🏻‍💻 라우터
//------------------------------------------------------------

router.get('/', (req, res) => {
    res.send("this os api page");
});

router.get('/goods', async (req, res) => {
    const { category } = req.query;
    const goods = await Goods.find({ category });
    res.json({goods})
});

router.get('/goods/:goodId', async (req, res) => {
    const goodsId = req.params.goodId;

    const [detail] = await Goods.find({goodsId : Number(goodsId)})

    res.json({
        detail,
    });
});

router.post('/goods/:goodsId/cart', async (req,res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existCarts = await Cart.find({ goodsId: Number(goodsId) });
    if (existCarts.length){
        return res.status(400).json({ success:false, errorMessage: "이미 장바구니에 들어있는 상품입니다."});
    }

    await Cart.create({ goodsId: Number(goodsId), quantity });
    res.json({ success:true })
});

router.delete('/goods/:goodsId/cart', async (req, res) => {
    const { goodsId } = req.params;

    const existCarts = await Cart.find({ goodsId: Number(goodsId) });
    if (existCarts.length){
        await Cart.deleteOne({ goodsId: Number(goodsId) });
    }

    res.json({success:true});
});

router.put('/goods/:goodsId/cart', async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existCarts = await Cart.find({ goodsId: Number(goodsId) });
    if (!existCarts.length){
        return res.status(400).json({ success:false, errorMessage: "장바구니에 해당 상품이 없습니다."});
    }

    if (quantity <= 0){
        return res.status(400).json({ success:false, errorMessage: "0개 이하로 담을 수 없습니다."});
    }

    await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity }})

    res.json({success:true});
});

router.post('/goods', async (req, res) => {
    const {goodsId, name, thumbnailUrl, category, price} = req.body;

    const goods = await Goods.find({ goodsId });

    if(goods.length){
        return res.status(400).json({ success: false, errorMassage: '이미 있는 데이터입니다.' });
    }
    

    const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price })

    res.json({ goods: createdGoods });
});

//------------------------------------------------------------
//  🧑🏻‍💻 모듈 내보내기
//------------------------------------------------------------

module.exports = router;