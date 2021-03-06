const Koa = require("koa");
const app = new Koa();
const router = require('koa-router')();
const static = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const Shop = require("./Shop"); //导入Person类,new 一下  save一下搞定


// 第一步:   创建Schema;
// 第二步：  定义mongoose.model
// 第三步：  获取connection实例,使用Connetion监听连接状态,new下导入的Shop类
// 第四步：  调用save方法将数据存入数据库，再次使用不需要要在保存
// 网 文：   mongoose常用api文档   https://www.jianshu.com/p/fc11fd1c26f9
/* 
    mongod 创造数据;
    1.mongod 文件夹里面运行 .\mongod.exe --db path 生成数据位置;
    
    const mongoose=require('mongoose');
    mongoose.connect("mongodb://localhost:27017")
    var db = mongoose.connection;//获取connection实例
    2.连接成功后开搞schema和Model
    var Animal=mongoose.model("Animal",animalSchema);//第一个是名字第二个是模(.Schema)

    .\mongod.exe --dbpath C:\Users\lizijie\Desktop\Courseware\MyCourseware\2019-02-28\db --port=27017
*/
mongoose.connect("mongodb://localhost:27017")

//解决跨域问题；
app.use(async(ctx, next) => {
        
    //指定服务器端允许进行跨域资源访问的来源域。可以用通配符*表示允许任何域的JavaScript访问资源，但是在响应一个携带身份信息(Credential)的HTTP请求时，必需指定具体的域，不能用通配符
    ctx.set("Access-Control-Allow-Origin", "*");

    //可选。它的值是一个布尔值，表示是否允许客户端跨域请求时携带身份信息(Cookie或者HTTP认证信息)。默认情况下，Cookie不包括在CORS请求之中。当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";如果没有设置这个值，浏览器会忽略此次响应。
    ctx.set("Access-Control-Allow-Credentials", true);
    
    //指定服务器允许进行跨域资源访问的请求方法列表，一般用在响应预检请求上
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    
    //必需。指定服务器允许进行跨域资源访问的请求头列表，一般用在响应预检请求上
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    // ctx.set("X-Powered-By", ' 3.2.1');
    
    //告诉客户端返回数据的MIME的类型，这只是一个标识信息,并不是真正的数据文件的一部分
    ctx.set("Content-Type", "application/json;charset=utf-8");
    
    //如果不设置mode，直接设置content-type为application/json，则fetch会默认这是跨域模式（mode:'cors'），在跨域POST之前，客户端会先发一条OPTIONS请求来”探探路”，如果服务器允许，再继续POST数据。对于这种OPTIONS请求，需要在服务器配置允许接受OPTIONS请求，这样写就是直接允许了所有的OPTIONS请求，也可以按照需求来判断OPTIONS请求中更详细的信息
    if (ctx.request.method == "OPTIONS") {
        ctx.response.status = 200
    }
    await next();
});
/* 
接口文档 ：
    /data?act=search&[class|id]  这个是查询详情页的信息
    /data?act=all  这个是查询所有数据库的信息；
    /data?act=banner 轮播图目录，滑过的时候获取的数据；
    /data?act=banner
*/
var db = mongoose.connection; //获取connection实例
//使用Connetion监听连接状态
db.on('connected', function (err) {
    if (err) {
        console.log('连接数据库失败：' + err);
    } else {
        console.log('连接数据库成功！');
        const ShopData = new Shop( //new 一下导入的Shop类
            {   
                "id":2,
                "resultcode": "200", //返回码
                "reason": "查询成功", //返回说明
                "result":[
                    {
                    "name":"无忧小馆",//店名
                    "city":"北京",
                    "area":"市中心",
                    "address":"东城区景山前街4号故宫博物馆",
                    "phone":"010-56294969",
                    "photos":"http://i3.s2.dpfile.com/2010-12-20/6201691_b.jpg(249x249)/thumb.jpg",//图片URL
                    "tags":"农家乐,北京",
                    "all_remarks":"4",//总点评数,
                    "very_good_remarks":"3",//非常好
                    "good_remarks":"1",//好评
                    "common_remarks":"1",//普通
                    "bad_remarks":"0",//差
                    "very_bad_remarks":"0",//非常差
                    "product_rating":"",//产品评分
                    "environment_rating":"",//环境评分
                    "service_rating":"",//	服务评分
                    "recommended_products":"",//推荐产品
                    "recommended_dishes":"",//推荐菜色
                    "data": {
                        "outOfRange": 0,
                        "mtWmPoiId": "1004349214165273",
                        "dpShopId": 0,
                        "shopStatus": 0,
                        "shopPage": false,
                        "shopInfo": {
                            "shopName": "金手勺东北菜（星空音乐美食城店）",
                            "shopPic": "http://p1.meituan.net/waimaipoi/6c3ba8fb8cbe2ffa70a57a5b42d3d43438818.jpg",
                            "deliveryFee": 3,
                            "deliveryType": 0,
                            "deliveryTime": 37,
                            "deliveryMsg": "由美团快送提供配送服务",
                            "minFee": 20,
                            "activityList": [
                                {
                                    "actDesc": "满30减10;满58减15;满88减18",
                                    "actType": 0,
                                    "iconUrl": "http://p0.meituan.net/xianfu/f8bc8dffdbc805878aa3801a33f563cd1001.png"
                                },
                                {
                                    "actDesc": "折扣商品6.8折起",
                                    "actType": 0,
                                    "iconUrl": "http://p1.meituan.net/xianfu/9c997ecce6150671b8459738a26f8bd9767.png"
                                }
                            ],
                            "onlinePay": 1,
                            "bulletin": "开票金额150起，各位亲注意一下",
                            "discountRestrict": -1,
                            "distance": "1.3km",
                            "bizCode": 0,
                            "shipping_time": "09:56-21:50"
                        },
                        "pageCategoryList": [],
                        "categoryList": [
                            {
                                "tag": "100",
                                "activityTag": "",
                                "iconUrl": "http://p1.meituan.net/aichequan/87f966955f693102d67daf2ec44b58411361.png",
                                "categoryName": "热销",
                                "categoryType": 1,
                                "spuList": [
                                    {
                                        "spuName": "压锅大丰收",
                                        "unit": "",
                                        "spuId": 1201373859,
                                        "tag": "85604794",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/270cac2aacb4489546bd8f21f785b26c197877.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/270cac2aacb4489546bd8f21f785b26c197877.jpg",
                                        "saleVolume": 123,
                                        "originPrice": 39.99,
                                        "currentPrice": 39.99,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336012483,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,//畅销商品
                                                "minPurchaseNum": -1,//最小购买数量
                                                "restrict": -1,
                                                "originPrice": 39.99,
                                                "currentPrice": 39.99,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "家常凉菜",
                                        "unit": "份",
                                        "spuId": 1201539915,
                                        "tag": "85608019",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/373411a433ab004daeb7a6d6bb25916c190103.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/373411a433ab004daeb7a6d6bb25916c190103.jpg",
                                        "saleVolume": 117,
                                        "originPrice": 19.9,
                                        "currentPrice": 19.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336096497,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 19.9,
                                                "currentPrice": 19.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "蛋炒饭",
                                        "unit": "份",
                                        "spuId": 1201516738,
                                        "tag": "85607453",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/01cc9b3d286abc414e2af93450944216153819.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/01cc9b3d286abc414e2af93450944216153819.jpg",
                                        "saleVolume": 84,
                                        "originPrice": 12.9,
                                        "currentPrice": 12.9,
                                        "spuDesc": "",
                                        "praiseNum": 2,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336023148,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 12.9,
                                                "currentPrice": 12.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "酸辣土豆丝",
                                        "unit": "",
                                        "spuId": 1201320340,
                                        "tag": "85599452",
                                        "activityTag": "discount",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/550e570756cea1c9043f4fe707decb49199665.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/550e570756cea1c9043f4fe707decb49199665.jpg",
                                        "saleVolume": 73,
                                        "originPrice": 16.9,
                                        "currentPrice": 11.49,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 1,
                                        "skuList": [
                                            {
                                                "skuId": 1335848750,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": -1,
                                                "minPurchaseNum": -1,
                                                "restrict": 1,
                                                "originPrice": 16.9,
                                                "currentPrice": 11.49,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "6.8折 限1份",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "6.8折 限1份",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "酸菜炒粉条",
                                        "unit": "",
                                        "spuId": 1201187155,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/wmproductdwm/85db8eae92659f24ecd23a1960aee0fd156701.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/wmproductdwm/85db8eae92659f24ecd23a1960aee0fd156701.jpg",
                                        "saleVolume": 67,
                                        "originPrice": 23.99,
                                        "currentPrice": 23.99,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335713168,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 23.99,
                                                "currentPrice": 23.99,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "溜肉段",
                                        "unit": "",
                                        "spuId": 1201097923,
                                        "tag": "85593957",
                                        "activityTag": "discount",
                                        "littleImageUrl": "http://p1.meituan.net/wmproductdwm/bd53393d5033809e237e180fc11ad6b4128910.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/wmproductdwm/bd53393d5033809e237e180fc11ad6b4128910.jpg",
                                        "saleVolume": 60,
                                        "originPrice": 36.9,
                                        "currentPrice": 29.52,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 1,
                                        "skuList": [
                                            {
                                                "skuId": 1335690548,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": -1,
                                                "minPurchaseNum": -1,
                                                "restrict": 1,
                                                "originPrice": 36.9,
                                                "currentPrice": 29.52,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "8折 限1份",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "8折 限1份",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "白菜豆腐汤",
                                        "unit": "",
                                        "spuId": 1201414434,
                                        "tag": "85605274",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/07631766ff89ddec8d620e64d69af124200753.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/07631766ff89ddec8d620e64d69af124200753.jpg",
                                        "saleVolume": 55,
                                        "originPrice": 14.9,
                                        "currentPrice": 14.9,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335998730,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 14.9,
                                                "currentPrice": 14.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "木须肉盖饭",
                                        "unit": "",
                                        "spuId": 1212446664,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/8ea350de85a737a7637ddce6f0232659187915.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/8ea350de85a737a7637ddce6f0232659187915.jpg",
                                        "saleVolume": 52,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348697240,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "小炒肉盖饭",
                                        "unit": "",
                                        "spuId": 1212389729,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/268539ddcf6921e1f69332fe6826b73b201893.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/268539ddcf6921e1f69332fe6826b73b201893.jpg",
                                        "saleVolume": 51,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348637209,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "蒜苔炒肉盖饭",
                                        "unit": "",
                                        "spuId": 1212274261,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/40f12b11e654c53642b17442d359f3d6170754.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/40f12b11e654c53642b17442d359f3d6170754.jpg",
                                        "saleVolume": 46,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348695782,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    }
                                ],
                                "end": true,
                                "nextPageIndex": 0
                            },
                            {
                                "tag": "act17",
                                "activityTag": "discount",
                                "iconUrl": "http://p0.meituan.net/aichequan/45662b4d1968fd75bff38de23f6d62641421.png",
                                "categoryName": "折扣",
                                "categoryType": 2,
                                "spuList": [
                                    {
                                        "spuName": "外婆菜炒鸡蛋",
                                        "unit": "",
                                        "spuId": 1201455991,
                                        "tag": "85599452",
                                        "activityTag": "discount",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/b0df144b815cf2c5647e3bc3ae0740cc185757.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/b0df144b815cf2c5647e3bc3ae0740cc185757.jpg",
                                        "saleVolume": 34,
                                        "originPrice": 23,
                                        "currentPrice": 17.94,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 1,
                                        "skuList": [
                                            {
                                                "skuId": 1335839141,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": -1,
                                                "minPurchaseNum": -1,
                                                "restrict": 1,
                                                "originPrice": 23,
                                                "currentPrice": 17.94,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "7.8折 限1份",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "7.8折 限1份",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "溜肉段",
                                        "unit": "",
                                        "spuId": 1201097923,
                                        "tag": "85593957",
                                        "activityTag": "discount",
                                        "littleImageUrl": "http://p1.meituan.net/wmproductdwm/bd53393d5033809e237e180fc11ad6b4128910.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/wmproductdwm/bd53393d5033809e237e180fc11ad6b4128910.jpg",
                                        "saleVolume": 60,
                                        "originPrice": 36.9,
                                        "currentPrice": 29.52,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 1,
                                        "skuList": [
                                            {
                                                "skuId": 1335690548,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": -1,
                                                "minPurchaseNum": -1,
                                                "restrict": 1,
                                                "originPrice": 36.9,
                                                "currentPrice": 29.52,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "8折 限1份",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "8折 限1份",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "酸辣土豆丝",
                                        "unit": "",
                                        "spuId": 1201320340,
                                        "tag": "85599452",
                                        "activityTag": "discount",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/550e570756cea1c9043f4fe707decb49199665.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/550e570756cea1c9043f4fe707decb49199665.jpg",
                                        "saleVolume": 73,
                                        "originPrice": 16.9,
                                        "currentPrice": 11.49,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 1,
                                        "skuList": [
                                            {
                                                "skuId": 1335848750,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": -1,
                                                "minPurchaseNum": -1,
                                                "restrict": 1,
                                                "originPrice": 16.9,
                                                "currentPrice": 11.49,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "6.8折 限1份",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "6.8折 限1份",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    }
                                ],
                                "end": true,
                                "nextPageIndex": 0
                            },
                            {
                                "tag": "85599452",
                                "activityTag": "",
                                "iconUrl": "",
                                "categoryName": "金手勺炒菜",
                                "categoryType": 0,
                                "spuList": [
                                    {
                                        "spuName": "蒜蓉西兰花",
                                        "unit": "",
                                        "spuId": 1393437680,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/deb8059d870bc5d0add0ff72f926f52b208294.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/deb8059d870bc5d0add0ff72f926f52b208294.jpg",
                                        "saleVolume": 1,
                                        "originPrice": 25.9,
                                        "currentPrice": 25.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1571474669,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 25.9,
                                                "currentPrice": 25.9,
                                                "boxFee": 0,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": "",
                                        "productLabelPictureList": [
                                            {
                                                "pictureUrl": "http://p0.meituan.net/aichequan/a6118176c9bf22b6066fe4eba95c75d41341.png",
                                                "width": "60",
                                                "height": "30"
                                            }
                                        ]
                                    },
                                    {
                                        "spuName": "菠菜炒鸡蛋",
                                        "unit": "",
                                        "spuId": 1276791764,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/759bc14b7405bdaed1b9f954be7d1d5e135538.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/759bc14b7405bdaed1b9f954be7d1d5e135538.jpg",
                                        "saleVolume": 25,
                                        "originPrice": 23.9,
                                        "currentPrice": 23.9,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1424504809,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 23.9,
                                                "currentPrice": 23.9,
                                                "boxFee": 0,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "芹菜炒肉片",
                                        "unit": "",
                                        "spuId": 1276791717,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/e8bb7aa07146e72965aa8d5c12ae9230171128.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/e8bb7aa07146e72965aa8d5c12ae9230171128.jpg",
                                        "saleVolume": 21,
                                        "originPrice": 22.9,
                                        "currentPrice": 22.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1424545868,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 22.9,
                                                "currentPrice": 22.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "松仁玉米",
                                        "unit": "",
                                        "spuId": 1276838657,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/f3f93a07e1b6fe4e20eeddbc51be1d45126785.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/f3f93a07e1b6fe4e20eeddbc51be1d45126785.jpg",
                                        "saleVolume": 6,
                                        "originPrice": 26,
                                        "currentPrice": 26,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1424651361,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 26,
                                                "currentPrice": 26,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "老厨白菜",
                                        "unit": "",
                                        "spuId": 1276871187,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/105069d84fe32ea336a139ee54f8ec32172047.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/105069d84fe32ea336a139ee54f8ec32172047.jpg",
                                        "saleVolume": 15,
                                        "originPrice": 24.9,
                                        "currentPrice": 24.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1424464923,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 24.9,
                                                "currentPrice": 24.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "尖椒炒鸡蛋",
                                        "unit": "",
                                        "spuId": 1276838064,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/a8a3d1f717f6319af42a931bfd24fa33196576.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/a8a3d1f717f6319af42a931bfd24fa33196576.jpg",
                                        "saleVolume": 25,
                                        "originPrice": 22.9,
                                        "currentPrice": 22.9,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1424545109,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 22.9,
                                                "currentPrice": 22.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "平菇炒肉",
                                        "unit": "",
                                        "spuId": 1276870526,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/bbbeac6b16ba7b4013ac91e84bd84ff3236185.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/bbbeac6b16ba7b4013ac91e84bd84ff3236185.jpg",
                                        "saleVolume": 24,
                                        "originPrice": 28,
                                        "currentPrice": 28,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1424650617,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 28,
                                                "currentPrice": 28,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "醋溜白菜",
                                        "unit": "",
                                        "spuId": 1276755101,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/7ebee4dbe428fa65129ddbc8b7a77098147639.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/7ebee4dbe428fa65129ddbc8b7a77098147639.jpg",
                                        "saleVolume": 27,
                                        "originPrice": 21.9,
                                        "currentPrice": 21.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1424688681,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 21.9,
                                                "currentPrice": 21.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "麻婆豆腐",
                                        "unit": "",
                                        "spuId": 1253249990,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/1aab28121b589493053350a5b071a4df181548.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/1aab28121b589493053350a5b071a4df181548.jpg",
                                        "saleVolume": 21,
                                        "originPrice": 23,
                                        "currentPrice": 23,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1397012941,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 23,
                                                "currentPrice": 23,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "小炒美容皮",
                                        "unit": "",
                                        "spuId": 1249960402,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/65c7fb0f468ecb4251d191120d62885e139036.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/65c7fb0f468ecb4251d191120d62885e139036.jpg",
                                        "saleVolume": 0,
                                        "originPrice": 26.9,
                                        "currentPrice": 26.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1392344625,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 26.9,
                                                "currentPrice": 26.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "小炒黑木耳",
                                        "unit": "",
                                        "spuId": 1231856202,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfu/9ff8e341361e3a92c3502cfe944347d7304985.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfu/9ff8e341361e3a92c3502cfe944347d7304985.jpg",
                                        "saleVolume": 6,
                                        "originPrice": 22.9,
                                        "currentPrice": 22.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1371930370,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 22.9,
                                                "currentPrice": 22.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "肉末酱扒茄子",
                                        "unit": "",
                                        "spuId": 1201362675,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/c46be4305f20077ca7a443adb8697e59200649.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/c46be4305f20077ca7a443adb8697e59200649.jpg",
                                        "saleVolume": 42,
                                        "originPrice": 26.9,
                                        "currentPrice": 26.9,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335857768,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 26.9,
                                                "currentPrice": 26.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "炝炒圆白菜",
                                        "unit": "",
                                        "spuId": 1201442399,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/fa7f61516b394ebe5c3cbfda580f5418200850.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/fa7f61516b394ebe5c3cbfda580f5418200850.jpg",
                                        "saleVolume": 19,
                                        "originPrice": 23,
                                        "currentPrice": 23,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335896913,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 23,
                                                "currentPrice": 23,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "葱花摊鸡蛋",
                                        "unit": "",
                                        "spuId": 1201520267,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/wmproductdwm/444a3ac9e41e056973a16d00c2cc248b122454.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/wmproductdwm/444a3ac9e41e056973a16d00c2cc248b122454.jpg",
                                        "saleVolume": 30,
                                        "originPrice": 28.9,
                                        "currentPrice": 28.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335915859,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 28.9,
                                                "currentPrice": 28.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "圆白菜炒粉条",
                                        "unit": "",
                                        "spuId": 1201405167,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfu/8594f2b458b0a7bb2a6eab8045254399223206.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfu/8594f2b458b0a7bb2a6eab8045254399223206.jpg",
                                        "saleVolume": 28,
                                        "originPrice": 21.9,
                                        "currentPrice": 21.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335932721,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 21.9,
                                                "currentPrice": 21.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "绿豆芽炒韭菜",
                                        "unit": "",
                                        "spuId": 1201403527,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/808814dcfc29632fb12e519b2ef0c3d3160155.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/808814dcfc29632fb12e519b2ef0c3d3160155.jpg",
                                        "saleVolume": 10,
                                        "originPrice": 19.9,
                                        "currentPrice": 19.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335984130,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 19.9,
                                                "currentPrice": 19.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "锅仔金针肥牛",
                                        "unit": "",
                                        "spuId": 1201497152,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/wmproductdwm/b3daf0d39ce91f2d80562fd14a1730f9164084.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/wmproductdwm/b3daf0d39ce91f2d80562fd14a1730f9164084.jpg",
                                        "saleVolume": 18,
                                        "originPrice": 34.9,
                                        "currentPrice": 34.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335915348,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 34.9,
                                                "currentPrice": 34.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "小炒肥肠",
                                        "unit": "",
                                        "spuId": 1201496014,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/baabfcc0ced4c9324256c020230dd028155036.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/baabfcc0ced4c9324256c020230dd028155036.jpg",
                                        "saleVolume": 3,
                                        "originPrice": 39.99,
                                        "currentPrice": 39.99,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335931430,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 39.99,
                                                "currentPrice": 39.99,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "葱爆羊肉",
                                        "unit": "",
                                        "spuId": 1201457559,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/d749ce9dc0e513056f9f9a7386442f59180059.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/d749ce9dc0e513056f9f9a7386442f59180059.jpg",
                                        "saleVolume": 3,
                                        "originPrice": 39,
                                        "currentPrice": 39,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335983687,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 39,
                                                "currentPrice": 39,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "溜肝尖",
                                        "unit": "",
                                        "spuId": 1201317246,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfu/add90905bc38b0a65ffea7d8ac718a05223009.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfu/add90905bc38b0a65ffea7d8ac718a05223009.jpg",
                                        "saleVolume": 15,
                                        "originPrice": 28.9,
                                        "currentPrice": 28.9,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335784148,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 28.9,
                                                "currentPrice": 28.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "小炒猪肝",
                                        "unit": "",
                                        "spuId": 1201317012,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/e21aaabc2da125bea98d875c796f9ffe173539.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/e21aaabc2da125bea98d875c796f9ffe173539.jpg",
                                        "saleVolume": 22,
                                        "originPrice": 28.9,
                                        "currentPrice": 28.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335912490,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 28.9,
                                                "currentPrice": 28.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "溜肥肠",
                                        "unit": "",
                                        "spuId": 1201456547,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/9889007736428938973bf7a786127e56181766.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/9889007736428938973bf7a786127e56181766.jpg",
                                        "saleVolume": 15,
                                        "originPrice": 39.9,
                                        "currentPrice": 39.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335982626,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 39.9,
                                                "currentPrice": 39.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "小炒有机菜花",
                                        "unit": "",
                                        "spuId": 1201193937,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/a859e4ac2ee9fea8f036960b064c0a8a162258.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/a859e4ac2ee9fea8f036960b064c0a8a162258.jpg",
                                        "saleVolume": 19,
                                        "originPrice": 25.9,
                                        "currentPrice": 25.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335920631,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 25.9,
                                                "currentPrice": 25.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "酸菜炒粉条",
                                        "unit": "",
                                        "spuId": 1201187155,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/wmproductdwm/85db8eae92659f24ecd23a1960aee0fd156701.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/wmproductdwm/85db8eae92659f24ecd23a1960aee0fd156701.jpg",
                                        "saleVolume": 67,
                                        "originPrice": 23.99,
                                        "currentPrice": 23.99,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335713168,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 23.99,
                                                "currentPrice": 23.99,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "外婆杂粮包",
                                        "unit": "",
                                        "spuId": 1201401348,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/wmproductdwm/944ad86ce07c37cce59b881fccd47946130000.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/wmproductdwm/944ad86ce07c37cce59b881fccd47946130000.jpg",
                                        "saleVolume": 6,
                                        "originPrice": 28.9,
                                        "currentPrice": 28.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335911081,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 28.9,
                                                "currentPrice": 28.9,
                                                "boxFee": 2,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "孜然肉片",
                                        "unit": "",
                                        "spuId": 1201455228,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/3fbbee59694e0a0a513de52a4f9323df218689.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/3fbbee59694e0a0a513de52a4f9323df218689.jpg",
                                        "saleVolume": 10,
                                        "originPrice": 32,
                                        "currentPrice": 32,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335980676,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 32,
                                                "currentPrice": 32,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "孜然鸡丁",
                                        "unit": "",
                                        "spuId": 1201314575,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/c3e723abd8c154d37453547b826861da137428.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/c3e723abd8c154d37453547b826861da137428.jpg",
                                        "saleVolume": 4,
                                        "originPrice": 32,
                                        "currentPrice": 32,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335909496,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 32,
                                                "currentPrice": 32,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "红肠韭菜炒鸡蛋",
                                        "unit": "",
                                        "spuId": 1201454330,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/fc1c590812a7a3935915f49014e424a7186200.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/fc1c590812a7a3935915f49014e424a7186200.jpg",
                                        "saleVolume": 33,
                                        "originPrice": 24.99,
                                        "currentPrice": 24.99,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335909354,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 24.99,
                                                "currentPrice": 24.99,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "酸豆角炒鸡胗",
                                        "unit": "",
                                        "spuId": 1201491702,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfu/4b5352b69f8fa4727ff8afbcc903392881754.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfu/4b5352b69f8fa4727ff8afbcc903392881754.jpg",
                                        "saleVolume": 12,
                                        "originPrice": 28,
                                        "currentPrice": 28,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335836707,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 28,
                                                "currentPrice": 28,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "肉末酸豆角",
                                        "unit": "",
                                        "spuId": 1201453902,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/074d02927acf320bbc50bcafed797683146917.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/074d02927acf320bbc50bcafed797683146917.jpg",
                                        "saleVolume": 10,
                                        "originPrice": 23.9,
                                        "currentPrice": 23.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335979271,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 23.9,
                                                "currentPrice": 23.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "红肠木耳炒鸡蛋",
                                        "unit": "",
                                        "spuId": 1201361709,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfu/e0bb766df7c5726bddb4dfe0356842d4220702.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfu/e0bb766df7c5726bddb4dfe0356842d4220702.jpg",
                                        "saleVolume": 16,
                                        "originPrice": 26,
                                        "currentPrice": 26,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335780417,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 26,
                                                "currentPrice": 26,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "肉酱豆腐",
                                        "unit": "",
                                        "spuId": 1201313248,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/5f02f2e500c0e58adbdaa913b9e3b716167901.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/5f02f2e500c0e58adbdaa913b9e3b716167901.jpg",
                                        "saleVolume": 7,
                                        "originPrice": 25,
                                        "currentPrice": 25,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335908145,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 25,
                                                "currentPrice": 25,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "火爆鸡胗",
                                        "unit": "",
                                        "spuId": 1201327472,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/7816e1e8f793606818685a18b4339c1a227920.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/7816e1e8f793606818685a18b4339c1a227920.jpg",
                                        "saleVolume": 1,
                                        "originPrice": 32,
                                        "currentPrice": 32,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335779838,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 32,
                                                "currentPrice": 32,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "小炒鸡胗",
                                        "unit": "",
                                        "spuId": 1201452281,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/56250ab9994f21541b5c204439bcd74e191230.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/56250ab9994f21541b5c204439bcd74e191230.jpg",
                                        "saleVolume": 7,
                                        "originPrice": 32,
                                        "currentPrice": 32,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335907271,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 32,
                                                "currentPrice": 32,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "木须肉",
                                        "unit": "",
                                        "spuId": 1201198216,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfu/e81438054e4102cd9a6c4943d4cc48b6309686.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfu/e81438054e4102cd9a6c4943d4cc48b6309686.jpg",
                                        "saleVolume": 30,
                                        "originPrice": 25.9,
                                        "currentPrice": 25.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335925097,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 25.9,
                                                "currentPrice": 25.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "香菇肉片",
                                        "unit": "",
                                        "spuId": 1201197871,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/c640bb780575590811157e5a285a3c31151342.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/c640bb780575590811157e5a285a3c31151342.jpg",
                                        "saleVolume": 7,
                                        "originPrice": 25.9,
                                        "currentPrice": 25.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335976207,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 25.9,
                                                "currentPrice": 25.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "大酱炒鸡蛋",
                                        "unit": "",
                                        "spuId": 1201159755,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/09de543e7b8d05ff3700cc79a9052757200049.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/09de543e7b8d05ff3700cc79a9052757200049.jpg",
                                        "saleVolume": 15,
                                        "originPrice": 25,
                                        "currentPrice": 25,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335778406,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 25,
                                                "currentPrice": 25,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "尖椒豆皮",
                                        "unit": "",
                                        "spuId": 1201487284,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/f9dd14934b1bc5ace10fe46a34cd7755122477.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/f9dd14934b1bc5ace10fe46a34cd7755122477.jpg",
                                        "saleVolume": 33,
                                        "originPrice": 21.9,
                                        "currentPrice": 21.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335975113,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 21.9,
                                                "currentPrice": 21.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "肉段烧茄子",
                                        "unit": "",
                                        "spuId": 1201196953,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/78dc7497e745643557bcef533ce26350214547.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/78dc7497e745643557bcef533ce26350214547.jpg",
                                        "saleVolume": 21,
                                        "originPrice": 36,
                                        "currentPrice": 36,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335904029,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 36,
                                                "currentPrice": 36,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "炒合菜",
                                        "unit": "",
                                        "spuId": 1201324948,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/6ac812632628558eb59f21dd1786a2c5174318.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/6ac812632628558eb59f21dd1786a2c5174318.jpg",
                                        "saleVolume": 16,
                                        "originPrice": 23,
                                        "currentPrice": 23,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335973334,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 23,
                                                "currentPrice": 23,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "木耳炒白菜",
                                        "unit": "",
                                        "spuId": 1201307458,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfu/306e70bc50257c415b8b2183d76e050e192159.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfu/306e70bc50257c415b8b2183d76e050e192159.jpg",
                                        "saleVolume": 3,
                                        "originPrice": 19.9,
                                        "currentPrice": 19.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335972609,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 19.9,
                                                "currentPrice": 19.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "回锅肉",
                                        "unit": "",
                                        "spuId": 1201446834,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/7bb0dde11b267303c9d656d2ef3a96e5204745.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/7bb0dde11b267303c9d656d2ef3a96e5204745.jpg",
                                        "saleVolume": 3,
                                        "originPrice": 25.9,
                                        "currentPrice": 25.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335829017,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 25.9,
                                                "currentPrice": 25.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "小炒肉",
                                        "unit": "",
                                        "spuId": 1201483583,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/c17ed0bce355e92c8ba1a44160e57b18193485.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/c17ed0bce355e92c8ba1a44160e57b18193485.jpg",
                                        "saleVolume": 22,
                                        "originPrice": 27.9,
                                        "currentPrice": 27.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335828170,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 27.9,
                                                "currentPrice": 27.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "韭菜炒鸡蛋",
                                        "unit": "",
                                        "spuId": 1201445326,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/1616786062918aafab0adb0287cd3821212685.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/1616786062918aafab0adb0287cd3821212685.jpg",
                                        "saleVolume": 7,
                                        "originPrice": 22.9,
                                        "currentPrice": 22.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335899894,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 22.9,
                                                "currentPrice": 22.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "剁椒鸡蛋",
                                        "unit": "",
                                        "spuId": 1201481988,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/c94da755d1a3d396c83f55d359ce8faa177960.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/c94da755d1a3d396c83f55d359ce8faa177960.jpg",
                                        "saleVolume": 16,
                                        "originPrice": 22.9,
                                        "currentPrice": 22.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335898994,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 22.9,
                                                "currentPrice": 22.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "木耳炒鸡蛋",
                                        "unit": "",
                                        "spuId": 1201322742,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/7752f596c4d75bbddecf246e3fa1858f166183.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/7752f596c4d75bbddecf246e3fa1858f166183.jpg",
                                        "saleVolume": 6,
                                        "originPrice": 23,
                                        "currentPrice": 23,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335969043,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 23,
                                                "currentPrice": 23,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "地三鲜",
                                        "unit": "",
                                        "spuId": 1201144780,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/45da9fb5090dda92475380fa0dc7f4f8214418.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/45da9fb5090dda92475380fa0dc7f4f8214418.jpg",
                                        "saleVolume": 39,
                                        "originPrice": 24.99,
                                        "currentPrice": 24.99,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335761890,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 24.99,
                                                "currentPrice": 24.99,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "宫保鸡丁",
                                        "unit": "",
                                        "spuId": 1201144203,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/5f39889d41417c7f9c07828a604f7128196229.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/5f39889d41417c7f9c07828a604f7128196229.jpg",
                                        "saleVolume": 33,
                                        "originPrice": 28,
                                        "currentPrice": 28,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335707078,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 28,
                                                "currentPrice": 28,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "蒜苔炒肉",
                                        "unit": "",
                                        "spuId": 1201480955,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/cde10f80ac758035f9de7fba9a2dd027164754.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/cde10f80ac758035f9de7fba9a2dd027164754.jpg",
                                        "saleVolume": 15,
                                        "originPrice": 25.9,
                                        "currentPrice": 25.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335825386,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 25.9,
                                                "currentPrice": 25.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "西红柿炒鸡蛋",
                                        "unit": "",
                                        "spuId": 1201155722,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/6d5ed7ab49f30458fe1b5d010af6918b204322.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/6d5ed7ab49f30458fe1b5d010af6918b204322.jpg",
                                        "saleVolume": 10,
                                        "originPrice": 22.9,
                                        "currentPrice": 22.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335897354,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 22.9,
                                                "currentPrice": 22.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "肉沫四季豆",
                                        "unit": "",
                                        "spuId": 1201441531,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/2a9c64315def740b9c283efe5d6fd585152828.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/2a9c64315def740b9c283efe5d6fd585152828.jpg",
                                        "saleVolume": 9,
                                        "originPrice": 25.9,
                                        "currentPrice": 25.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335823445,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 25.9,
                                                "currentPrice": 25.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "鱼香肉丝",
                                        "unit": "",
                                        "spuId": 1201153712,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/40f538ca709ecfa26ac507270674a7c1158229.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/40f538ca709ecfa26ac507270674a7c1158229.jpg",
                                        "saleVolume": 34,
                                        "originPrice": 28,
                                        "currentPrice": 28,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335964560,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 28,
                                                "currentPrice": 28,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "干煸豆角",
                                        "unit": "",
                                        "spuId": 1201119629,
                                        "tag": "85599452",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/2c01e2bec225dc37f45de9fec73466fd255189.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/2c01e2bec225dc37f45de9fec73466fd255189.jpg",
                                        "saleVolume": 21,
                                        "originPrice": 24.9,
                                        "currentPrice": 24.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335963721,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 24.9,
                                                "currentPrice": 24.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    }
                                ],
                                "end": true,
                                "nextPageIndex": 0
                            },
                            {
                                "tag": "85593957",
                                "activityTag": "",
                                "iconUrl": "",
                                "categoryName": "金手勺特色菜",
                                "categoryType": 0,
                                "spuList": [
                                    {
                                        "spuName": "毛氏红烧肉",
                                        "unit": "",
                                        "spuId": 1276717465,
                                        "tag": "85593957",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/b75c145554ff05cdc79952bb810a0022231065.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/b75c145554ff05cdc79952bb810a0022231065.jpg",
                                        "saleVolume": 3,
                                        "originPrice": 49,
                                        "currentPrice": 49,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1424465619,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 49,
                                                "currentPrice": 49,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "干炸带鱼",
                                        "unit": "",
                                        "spuId": 1228131261,
                                        "tag": "85593957",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/e4185c17953cc7a586ad5233b85c49cb170183.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/e4185c17953cc7a586ad5233b85c49cb170183.jpg",
                                        "saleVolume": 0,
                                        "originPrice": 32.9,
                                        "currentPrice": 32.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1367446073,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 32.9,
                                                "currentPrice": 32.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "红烧带鱼",
                                        "unit": "",
                                        "spuId": 1227820922,
                                        "tag": "85593957",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/a2078c8fa814a669b53360033fa9fdd1155750.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/a2078c8fa814a669b53360033fa9fdd1155750.jpg",
                                        "saleVolume": 16,
                                        "originPrice": 32.9,
                                        "currentPrice": 32.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1367266728,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 32.9,
                                                "currentPrice": 32.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "锅包肉段",
                                        "unit": "",
                                        "spuId": 1224166814,
                                        "tag": "85593957",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/80e9ef3ce28d2b650362d7ecf0dbb0fa147532.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/80e9ef3ce28d2b650362d7ecf0dbb0fa147532.jpg",
                                        "saleVolume": 34,
                                        "originPrice": 39.8,
                                        "currentPrice": 39.8,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1362495895,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 39.8,
                                                "currentPrice": 39.8,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "排骨炖酸菜",
                                        "unit": "份",
                                        "spuId": 1201245290,
                                        "tag": "85593957",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/973ae8ada602795a16f3cf74e34d3dfc142913.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/973ae8ada602795a16f3cf74e34d3dfc142913.jpg",
                                        "saleVolume": 16,
                                        "originPrice": 42.9,
                                        "currentPrice": 42.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335583056,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 42.9,
                                                "currentPrice": 42.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "鸡腿肉烧香菇",
                                        "unit": "",
                                        "spuId": 1201337411,
                                        "tag": "85593957",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/6c07dfd97af66f1727fe7edb8a945e1d145055.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/6c07dfd97af66f1727fe7edb8a945e1d145055.jpg",
                                        "saleVolume": 7,
                                        "originPrice": 36.99,
                                        "currentPrice": 36.99,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335936323,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 36.99,
                                                "currentPrice": 36.99,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "鸡腿肉炖土豆",
                                        "unit": "",
                                        "spuId": 1201337245,
                                        "tag": "85593957",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/wmproductdwm/5c9f453b682e53f6c1d4450624ab8ff5108987.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/wmproductdwm/5c9f453b682e53f6c1d4450624ab8ff5108987.jpg",
                                        "saleVolume": 28,
                                        "originPrice": 36.99,
                                        "currentPrice": 36.99,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335866551,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 36.99,
                                                "currentPrice": 36.99,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "红烧肉烧腐竹",
                                        "unit": "",
                                        "spuId": 1201461969,
                                        "tag": "85593957",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/602ac33f2c588878ddff3eec48fdf360150313.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/602ac33f2c588878ddff3eec48fdf360150313.jpg",
                                        "saleVolume": 10,
                                        "originPrice": 36.9,
                                        "currentPrice": 36.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335917800,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 36.9,
                                                "currentPrice": 36.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [
                                            {
                                                "spuAttrName": "温度",
                                                "spuAttrValueList": [
                                                    {
                                                        "attrId": 450872504,
                                                        "attrValue": "热"
                                                    }
                                                ]
                                            }
                                        ],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "红烧肉烧豆角",
                                        "unit": "",
                                        "spuId": 1201521934,
                                        "tag": "85593957",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/wmproductdwm/1cc89dcab140f9cfa6b4e871c04280d8204769.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/wmproductdwm/1cc89dcab140f9cfa6b4e871c04280d8204769.jpg",
                                        "saleVolume": 18,
                                        "originPrice": 36.9,
                                        "currentPrice": 36.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335788184,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 36.9,
                                                "currentPrice": 36.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "红烧肉炖土豆",
                                        "unit": "",
                                        "spuId": 1201521703,
                                        "tag": "85593957",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/wmproductdwm/d0330878ef021a033751bdaee1a6380a137159.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/wmproductdwm/d0330878ef021a033751bdaee1a6380a137159.jpg",
                                        "saleVolume": 12,
                                        "originPrice": 38.9,
                                        "currentPrice": 38.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336004719,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 38.9,
                                                "currentPrice": 38.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "尖椒护心肉",
                                        "unit": "",
                                        "spuId": 1201132763,
                                        "tag": "85593957",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/d3988b29f6f5a9617bf8f7692510d19c188807.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/d3988b29f6f5a9617bf8f7692510d19c188807.jpg",
                                        "saleVolume": 19,
                                        "originPrice": 38.9,
                                        "currentPrice": 38.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335692309,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 38.9,
                                                "currentPrice": 38.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "排骨烧玉米",
                                        "unit": "",
                                        "spuId": 1201247050,
                                        "tag": "85593957",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/5be4d75e0d3f8b0a6e484c7db4eb4cf4146947.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/5be4d75e0d3f8b0a6e484c7db4eb4cf4146947.jpg",
                                        "saleVolume": 4,
                                        "originPrice": 39.9,
                                        "currentPrice": 39.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335544719,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 39.9,
                                                "currentPrice": 39.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    }
                                ],
                                "end": true,
                                "nextPageIndex": 0
                            },
                            {
                                "tag": "86179214",
                                "activityTag": "",
                                "iconUrl": "",
                                "categoryName": "辣炒小海鲜",
                                "categoryType": 0,
                                "spuList": [
                                    {
                                        "spuName": "辣炒花蛤",
                                        "unit": "",
                                        "spuId": 1212301435,
                                        "tag": "86179214",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/b8a248ad4f6706596cb6eb0bff1d5fb6207116.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/b8a248ad4f6706596cb6eb0bff1d5fb6207116.jpg",
                                        "saleVolume": 9,
                                        "originPrice": 29.9,
                                        "currentPrice": 29.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348801885,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 29.9,
                                                "currentPrice": 29.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    }
                                ],
                                "end": true,
                                "nextPageIndex": 0
                            },
                            {
                                "tag": "86181199",
                                "activityTag": "",
                                "iconUrl": "",
                                "categoryName": "特色干锅",
                                "categoryType": 0,
                                "spuList": [
                                    {
                                        "spuName": "干锅四季豆",
                                        "unit": "",
                                        "spuId": 1212308957,
                                        "tag": "86181199",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfu/b512d2a391c48fc1c9ecd65f60068f96268015.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfu/b512d2a391c48fc1c9ecd65f60068f96268015.jpg",
                                        "saleVolume": 10,
                                        "originPrice": 26.9,
                                        "currentPrice": 26.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348815728,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 26.9,
                                                "currentPrice": 26.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "干锅土豆片",
                                        "unit": "",
                                        "spuId": 1212347748,
                                        "tag": "86181199",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/3a91b6be61664dffd6fe6be71cbe1c5d168644.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/3a91b6be61664dffd6fe6be71cbe1c5d168644.jpg",
                                        "saleVolume": 21,
                                        "originPrice": 24.9,
                                        "currentPrice": 24.9,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348744055,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 24.9,
                                                "currentPrice": 24.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "干锅肥肠",
                                        "unit": "",
                                        "spuId": 1212455041,
                                        "tag": "86181199",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/7585baca2e8b6e490052399c5cf44fb9178746.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/7585baca2e8b6e490052399c5cf44fb9178746.jpg",
                                        "saleVolume": 12,
                                        "originPrice": 38.9,
                                        "currentPrice": 38.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348891340,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 38.9,
                                                "currentPrice": 38.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "干锅娃娃菜",
                                        "unit": "",
                                        "spuId": 1212347695,
                                        "tag": "86181199",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/09cdfe078df6f2115fdb8b0289dc95e8152280.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/09cdfe078df6f2115fdb8b0289dc95e8152280.jpg",
                                        "saleVolume": 7,
                                        "originPrice": 24.9,
                                        "currentPrice": 24.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348854091,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 24.9,
                                                "currentPrice": 24.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "干锅千叶豆腐",
                                        "unit": "",
                                        "spuId": 1212423738,
                                        "tag": "86181199",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/d35308aa10329a55c4942d4d946792ae164272.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/d35308aa10329a55c4942d4d946792ae164272.jpg",
                                        "saleVolume": 13,
                                        "originPrice": 24.9,
                                        "currentPrice": 24.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348782517,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 24.9,
                                                "currentPrice": 24.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "干锅手撕包菜",
                                        "unit": "",
                                        "spuId": 1212454973,
                                        "tag": "86181199",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/5078c4b4d2d59ea31098a160970dc964198531.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/5078c4b4d2d59ea31098a160970dc964198531.jpg",
                                        "saleVolume": 16,
                                        "originPrice": 21.9,
                                        "currentPrice": 21.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348891257,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 21.9,
                                                "currentPrice": 21.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "干锅大虾",
                                        "unit": "",
                                        "spuId": 1212423683,
                                        "tag": "86181199",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/4de0f446e5b23697ef38f89bf59c917a216829.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/4de0f446e5b23697ef38f89bf59c917a216829.jpg",
                                        "saleVolume": 3,
                                        "originPrice": 47,
                                        "currentPrice": 47,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348712302,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 47,
                                                "currentPrice": 47,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "干锅排骨虾",
                                        "unit": "",
                                        "spuId": 1212398868,
                                        "tag": "86181199",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/66b7449ee8659a6151b047ab498ac895207961.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/66b7449ee8659a6151b047ab498ac895207961.jpg",
                                        "saleVolume": 4,
                                        "originPrice": 49.9,
                                        "currentPrice": 49.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348743928,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 49.9,
                                                "currentPrice": 49.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "干锅手撕鸡",
                                        "unit": "",
                                        "spuId": 1212454904,
                                        "tag": "86181199",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/1371895854c7b507635b664ce0d5e25c165336.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/1371895854c7b507635b664ce0d5e25c165336.jpg",
                                        "saleVolume": 4,
                                        "originPrice": 36,
                                        "currentPrice": 36,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348712248,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 36,
                                                "currentPrice": 36,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "干锅鱼豆腐",
                                        "unit": "",
                                        "spuId": 1212398809,
                                        "tag": "86181199",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/ce08db2143485c77678e654ab0b66914181229.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/ce08db2143485c77678e654ab0b66914181229.jpg",
                                        "saleVolume": 4,
                                        "originPrice": 24.9,
                                        "currentPrice": 24.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348891149,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 24.9,
                                                "currentPrice": 24.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "干锅小炒有机菜花",
                                        "unit": "",
                                        "spuId": 1212454861,
                                        "tag": "86181199",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/f130d85612e57c5a1697a99dde25cdcb163757.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/f130d85612e57c5a1697a99dde25cdcb163757.jpg",
                                        "saleVolume": 9,
                                        "originPrice": 25.9,
                                        "currentPrice": 25.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348743857,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 25.9,
                                                "currentPrice": 25.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    }
                                ],
                                "end": true,
                                "nextPageIndex": 0
                            },
                            {
                                "tag": "85604794",
                                "activityTag": "",
                                "iconUrl": "",
                                "categoryName": "金手勺压锅菜",
                                "categoryType": 0,
                                "spuList": [
                                    {
                                        "spuName": "压锅豆腐",
                                        "unit": "",
                                        "spuId": 1201469395,
                                        "tag": "85604794",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/1181a4c3e423b85e6774128e1b890773199146.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/1181a4c3e423b85e6774128e1b890773199146.jpg",
                                        "saleVolume": 13,
                                        "originPrice": 28.9,
                                        "currentPrice": 28.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335996042,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 28.9,
                                                "currentPrice": 28.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "压锅大丰收",
                                        "unit": "",
                                        "spuId": 1201373859,
                                        "tag": "85604794",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/270cac2aacb4489546bd8f21f785b26c197877.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/270cac2aacb4489546bd8f21f785b26c197877.jpg",
                                        "saleVolume": 123,
                                        "originPrice": 39.99,
                                        "currentPrice": 39.99,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336012483,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 39.99,
                                                "currentPrice": 39.99,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "压锅鸡爪",
                                        "unit": "",
                                        "spuId": 1201528519,
                                        "tag": "85604794",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/9b2f1da78bc4c60a51bc2328a39e34ca161010.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/9b2f1da78bc4c60a51bc2328a39e34ca161010.jpg",
                                        "saleVolume": 7,
                                        "originPrice": 38.9,
                                        "currentPrice": 38.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336011794,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 38.9,
                                                "currentPrice": 38.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    }
                                ],
                                "end": true,
                                "nextPageIndex": 0
                            },
                            {
                                "tag": "85605274",
                                "activityTag": "",
                                "iconUrl": "",
                                "categoryName": "汤类",
                                "categoryType": 0,
                                "spuList": [
                                    {
                                        "spuName": "白菜豆腐汤",
                                        "unit": "",
                                        "spuId": 1201414434,
                                        "tag": "85605274",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/07631766ff89ddec8d620e64d69af124200753.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/07631766ff89ddec8d620e64d69af124200753.jpg",
                                        "saleVolume": 55,
                                        "originPrice": 14.9,
                                        "currentPrice": 14.9,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335998730,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 14.9,
                                                "currentPrice": 14.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "紫菜蛋花汤",
                                        "unit": "",
                                        "spuId": 1201414014,
                                        "tag": "85605274",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/1d17218560167770bec2529c5827ae58159615.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/1d17218560167770bec2529c5827ae58159615.jpg",
                                        "saleVolume": 13,
                                        "originPrice": 14.9,
                                        "currentPrice": 14.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336087786,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 14.9,
                                                "currentPrice": 14.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "西红柿鸡蛋汤",
                                        "unit": "",
                                        "spuId": 1201342268,
                                        "tag": "85605274",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/8cc3f4fbc84743f8d95cde411ea8b99e156562.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/8cc3f4fbc84743f8d95cde411ea8b99e156562.jpg",
                                        "saleVolume": 9,
                                        "originPrice": 14.9,
                                        "currentPrice": 14.9,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1335871869,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 14.9,
                                                "currentPrice": 14.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "酸辣汤",
                                        "unit": "",
                                        "spuId": 1201530748,
                                        "tag": "85605274",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/wmproduct/debfd5a6749a733c7902a9463cd262df444697.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/wmproduct/debfd5a6749a733c7902a9463cd262df444697.jpg",
                                        "saleVolume": 22,
                                        "originPrice": 14.9,
                                        "currentPrice": 14.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336086810,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 14.9,
                                                "currentPrice": 14.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    }
                                ],
                                "end": true,
                                "nextPageIndex": 0
                            },
                            {
                                "tag": "86179188",
                                "activityTag": "",
                                "iconUrl": "",
                                "categoryName": "盖浇饭",
                                "categoryType": 0,
                                "spuList": [
                                    {
                                        "spuName": "尖椒肉丝盖饭",
                                        "unit": "",
                                        "spuId": 1212446710,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/ece10ff5ae6f93f3ca5c68affe65db26127356.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/ece10ff5ae6f93f3ca5c68affe65db26127356.jpg",
                                        "saleVolume": 36,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348697379,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "木须肉盖饭",
                                        "unit": "",
                                        "spuId": 1212446664,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/8ea350de85a737a7637ddce6f0232659187915.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/8ea350de85a737a7637ddce6f0232659187915.jpg",
                                        "saleVolume": 52,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348697240,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "尖椒豆皮盖饭",
                                        "unit": "",
                                        "spuId": 1212302164,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/ee521044c238b6e323ff54c79edc5e1c313495.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/ee521044c238b6e323ff54c79edc5e1c313495.jpg",
                                        "saleVolume": 12,
                                        "originPrice": 17.9,
                                        "currentPrice": 17.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348770117,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 17.9,
                                                "currentPrice": 17.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "溜肝尖盖饭",
                                        "unit": "",
                                        "spuId": 1212390280,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/1eb974eae85ed4dbc9d4c9c98cf9421f176262.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/1eb974eae85ed4dbc9d4c9c98cf9421f176262.jpg",
                                        "saleVolume": 15,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348638186,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "剁椒鸡蛋盖饭",
                                        "unit": "",
                                        "spuId": 1212274455,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/ac1ea3f524dd030a162159c210fc5870149022.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/ac1ea3f524dd030a162159c210fc5870149022.jpg",
                                        "saleVolume": 42,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348696001,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "大酱炒鸡蛋盖饭",
                                        "unit": "",
                                        "spuId": 1212446164,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/09de543e7b8d05ff3700cc79a9052757200049.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/09de543e7b8d05ff3700cc79a9052757200049.jpg",
                                        "saleVolume": 27,
                                        "originPrice": 17.9,
                                        "currentPrice": 17.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348802277,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 17.9,
                                                "currentPrice": 17.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "酸辣土豆丝盖饭",
                                        "unit": "",
                                        "spuId": 1212301779,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/2ff6a0b4249ae5f9b6321e05d262eb3a117149.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/2ff6a0b4249ae5f9b6321e05d262eb3a117149.jpg",
                                        "saleVolume": 18,
                                        "originPrice": 16.9,
                                        "currentPrice": 16.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348637489,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 16.9,
                                                "currentPrice": 16.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "小炒菜花盖饭",
                                        "unit": "",
                                        "spuId": 1212389856,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/1101c42e488cfe63d1831a004c92a530171727.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/1101c42e488cfe63d1831a004c92a530171727.jpg",
                                        "saleVolume": 21,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348695846,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "蒜苔炒肉盖饭",
                                        "unit": "",
                                        "spuId": 1212274261,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/40f12b11e654c53642b17442d359f3d6170754.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/40f12b11e654c53642b17442d359f3d6170754.jpg",
                                        "saleVolume": 46,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348695782,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "鱼香肉丝盖饭",
                                        "unit": "",
                                        "spuId": 1212416598,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/af2484ac6b9e2e1faf483fe9efdd3a4a181278.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/af2484ac6b9e2e1faf483fe9efdd3a4a181278.jpg",
                                        "saleVolume": 37,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 1,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348674515,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "宫保鸡丁盖饭",
                                        "unit": "",
                                        "spuId": 1212301583,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/d9e3eba91faefcac5b73e6e8477b761c149182.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/d9e3eba91faefcac5b73e6e8477b761c149182.jpg",
                                        "saleVolume": 22,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348730333,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "回锅肉盖饭",
                                        "unit": "",
                                        "spuId": 1212445901,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/95f10669921544bc4f2e3ef0aa2452c7125258.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/95f10669921544bc4f2e3ef0aa2452c7125258.jpg",
                                        "saleVolume": 40,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348730321,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "小炒肉盖饭",
                                        "unit": "",
                                        "spuId": 1212389729,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/268539ddcf6921e1f69332fe6826b73b201893.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/268539ddcf6921e1f69332fe6826b73b201893.jpg",
                                        "saleVolume": 51,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348637209,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "西红柿鸡蛋盖饭",
                                        "unit": "",
                                        "spuId": 1212274126,
                                        "tag": "86179188",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/1856426d1c48756a7889962c10de032f136067.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/1856426d1c48756a7889962c10de032f136067.jpg",
                                        "saleVolume": 34,
                                        "originPrice": 17.9,
                                        "currentPrice": 17.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1348730288,
                                                "spec": "",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 17.9,
                                                "currentPrice": 17.9,
                                                "boxFee": 1.5,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    }
                                ],
                                "end": true,
                                "nextPageIndex": 0
                            },
                            {
                                "tag": "85608019",
                                "activityTag": "",
                                "iconUrl": "",
                                "categoryName": "凉菜",
                                "categoryType": 0,
                                "spuList": [
                                    {
                                        "spuName": "风味木耳",
                                        "unit": "份",
                                        "spuId": 1201640229,
                                        "tag": "85608019",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/b53b5fe59eb5600d39576c505b5537b0163897.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/b53b5fe59eb5600d39576c505b5537b0163897.jpg",
                                        "saleVolume": 6,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336099650,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": 1000,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "果仁菠菜",
                                        "unit": "份",
                                        "spuId": 1201561870,
                                        "tag": "85608019",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/8e5fe217a805e28bbd90b8a505b02734212168.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/8e5fe217a805e28bbd90b8a505b02734212168.jpg",
                                        "saleVolume": 18,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336169166,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": 999,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "素拍黄瓜",
                                        "unit": "份",
                                        "spuId": 1201561496,
                                        "tag": "85608019",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/ad56410547a9d6f00e7adb4e791fcc06163375.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/ad56410547a9d6f00e7adb4e791fcc06163375.jpg",
                                        "saleVolume": 9,
                                        "originPrice": 15.9,
                                        "currentPrice": 15.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336025720,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": 998,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 15.9,
                                                "currentPrice": 15.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "炸花生米",
                                        "unit": "份",
                                        "spuId": 1201422237,
                                        "tag": "85608019",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/f0675e418d804a908403d5448ef8c54e227300.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/f0675e418d804a908403d5448ef8c54e227300.jpg",
                                        "saleVolume": 1,
                                        "originPrice": 16.9,
                                        "currentPrice": 16.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336044677,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": 1000,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 16.9,
                                                "currentPrice": 16.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "东北大拉皮",
                                        "unit": "份",
                                        "spuId": 1201518580,
                                        "tag": "85608019",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/8fa817bbda65238d19557988d6288f6d182266.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/8fa817bbda65238d19557988d6288f6d182266.jpg",
                                        "saleVolume": 31,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336168131,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "姜汁松花蛋",
                                        "unit": "份",
                                        "spuId": 1201540870,
                                        "tag": "85608019",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/0cdbe8277163e1dd7bb21a756989d835156041.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/0cdbe8277163e1dd7bb21a756989d835156041.jpg",
                                        "saleVolume": 7,
                                        "originPrice": 18.9,
                                        "currentPrice": 18.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336097459,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 18.9,
                                                "currentPrice": 18.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "皮蛋豆腐",
                                        "unit": "份",
                                        "spuId": 1201560410,
                                        "tag": "85608019",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/61ce2f92605d9903871579c86cf8404c183303.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/61ce2f92605d9903871579c86cf8404c183303.jpg",
                                        "saleVolume": 10,
                                        "originPrice": 16.9,
                                        "currentPrice": 16.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336044007,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 16.9,
                                                "currentPrice": 16.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "酸辣蕨根粉",
                                        "unit": "份",
                                        "spuId": 1201383576,
                                        "tag": "85608019",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/4090b07391968f4de1674b452320520b244952.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/4090b07391968f4de1674b452320520b244952.jpg",
                                        "saleVolume": 28,
                                        "originPrice": 16.9,
                                        "currentPrice": 16.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336043866,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 16.9,
                                                "currentPrice": 16.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "家常凉菜",
                                        "unit": "份",
                                        "spuId": 1201539915,
                                        "tag": "85608019",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/373411a433ab004daeb7a6d6bb25916c190103.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/373411a433ab004daeb7a6d6bb25916c190103.jpg",
                                        "saleVolume": 117,
                                        "originPrice": 19.9,
                                        "currentPrice": 19.9,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336096497,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 19.9,
                                                "currentPrice": 19.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    }
                                ],
                                "end": true,
                                "nextPageIndex": 0
                            },
                            {
                                "tag": "85607453",
                                "activityTag": "",
                                "iconUrl": "",
                                "categoryName": "主食",
                                "categoryType": 0,
                                "spuList": [
                                    {
                                        "spuName": "蛋炒饭",
                                        "unit": "份",
                                        "spuId": 1201516738,
                                        "tag": "85607453",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/01cc9b3d286abc414e2af93450944216153819.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/01cc9b3d286abc414e2af93450944216153819.jpg",
                                        "saleVolume": 84,
                                        "originPrice": 12.9,
                                        "currentPrice": 12.9,
                                        "spuDesc": "",
                                        "praiseNum": 2,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336023148,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 12.9,
                                                "currentPrice": 12.9,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "酱油炒饭",
                                        "unit": "份",
                                        "spuId": 1201478822,
                                        "tag": "85607453",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p1.meituan.net/xianfudwm/d9a59c5d982153268e7c1a355aa0d0d4220199.jpg",
                                        "bigImageUrl": "http://p1.meituan.net/xianfudwm/d9a59c5d982153268e7c1a355aa0d0d4220199.jpg",
                                        "saleVolume": 40,
                                        "originPrice": 13,
                                        "currentPrice": 13,
                                        "spuDesc": "",
                                        "praiseNum": 0,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336095624,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 13,
                                                "currentPrice": 13,
                                                "boxFee": 1,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    },
                                    {
                                        "spuName": "米饭",
                                        "unit": "份",
                                        "spuId": 1201419413,
                                        "tag": "85607453",
                                        "activityTag": "",
                                        "littleImageUrl": "http://p0.meituan.net/xianfudwm/dfbee66b6c838b841cf22477d939bd97115716.jpg",
                                        "bigImageUrl": "http://p0.meituan.net/xianfudwm/dfbee66b6c838b841cf22477d939bd97115716.jpg",
                                        "saleVolume": 1415,
                                        "originPrice": 3,
                                        "currentPrice": 3,
                                        "spuDesc": "米饭单点不送",
                                        "praiseNum": 6,
                                        "sellStatus": 0,
                                        "activityType": 0,
                                        "skuList": [
                                            {
                                                "skuId": 1336165173,
                                                "spec": "(份)",
                                                "soldStatus": 0,
                                                "realStock": -1,
                                                "activityStock": 0,
                                                "minPurchaseNum": -1,
                                                "restrict": -1,
                                                "originPrice": 3,
                                                "currentPrice": 3,
                                                "boxFee": 0,
                                                "skuPromotionInfo": "",
                                                "count": 0
                                            }
                                        ],
                                        "spuAttrList": [],
                                        "spuPromotionInfo": "",
                                        "activityPolicy": {
                                            "discountByCount": {
                                                "count": 0,
                                                "discount": 1
                                            }
                                        },
                                        "statusDesc": ""
                                    }
                                ],
                                "end": true,
                                "nextPageIndex": 0
                            }
                        ],
                        "shoppingCart": {
                            "minFeeForCartTip": 14,
                            "promptText": "满30减10;满58减15;满88减18"
                        }
                    },
                    "code": 0,
                    "msg": "成功"
             }]
            }, {
                //不将版本号存入数据库
                versionKey: false
            }
        );
        // ShopData.save();
    }
});
/*
const staticPath = './www'
app.use(static(
    path.join(__dirname, staticPath)
))
app.use(bodyParser()); //POST传送过来数据格式转换,再router.get之前
 */
router.get('/pers/clerks', async (ctx) => {
    let arr = await Shop.find({id: 1})
    ctx.body = {
        code: 0,
        data: arr,
        msg: "成功"
}
   /*  
   switch (params.act) {
        case "clerks":
            try {
            let arr = await Shop.find({id: 2})//没有设置则匹配所有数据
                console.log(arr)
                ctx.body = {
                    code: 0,
                    data: arr,
                    msg: "成功"
                }
            } catch (error) {
                ctx.body = {
                    code: 1,
                    msg: "找不到"
                }
            }
            break;
    }
     */
});




router.get('/pers/:act', async (ctx) => {
    let req = ctx.request.query; //对象
    // console.log(ctx.request.path) //pers/131232
    // console.log(ctx.params); //{ act:'22132'}
    let params = ctx.params
    switch (params.act) {
        case "clerks":
            try {
               // db.col.find({"data":{$gt:1}}).pretty()
            let arr = await Shop.find({id: 2})//没有设置则匹配所有数据
             // let arr=  Shop.find().then(function (result) {
            // console.log(result); //没有设置则匹配所有数据
            //     });
            // let data1=await Data.find((e)=>{e==="banner"});
            //  Shop.find({'content.label': value}, function (err, comment) {
            //     console.log(comment)
            // })
                console.log(arr)
                ctx.body = {
                    code: 0,
                    data: arr,
                    msg: "成功"
                }
            } catch (error) {
                ctx.body = {
                    code: 1,
                    msg: "找不到"
                }
            }
            break;
    }
});


app.use(router.routes());
app.listen(2000, () => {
    console.log('app started at port 2000...');
})