var express = require('express');
var router = express.Router();
const Diary = require('../models/diary')
const {check,validationResult} = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
    Diary.getAllDiary(function(err,diarys){
        if(err) throw err;
        res.render("diary/indux",{data:"หัวข้อไดอารี่ทั้งหมด",diarys:diarys});
    })
});

router.get('/add', function(req, res, next) {
    res.render("diary/addForm",{data:"เพิ่มไดอารี่"});
});
router.get('/delect/:id', function(req, res, next) {
    Diary.deleteDiary([req.params.id],function(err){
        if (err) throw err
        res.redirect("/diary")
    })
    console.log("Find ID : ",req.params.id);

});
router.get('/edit/:id', function(req, res, next) {
    Diary.getDiaryId([req.params.id],function(err,diary){
        if(err) throw err
        res.render("diary/editForm",{data:"แก้ไขบทความ",diary:diary});
    });

});

router.post('/add',[
    check('title','กรุณาป้อนหัวข้อไดอารี่').not().isEmpty(),
    check('detail','กรุณาป้อนรายละเอียด').not().isEmpty(),
    check('author','กรุณาป้อนชื่อผู้เขียน').not().isEmpty()
], function(req, res, next) {
    //check validate data
    const result= validationResult(req);
    var errors = result.errors;
    for (var key in errors) {
            console.log(errors[key].value);
    }
    if (!result.isEmpty()) {
        //กรณีที่ป้อนไม่ครบ
        res.render("diary/addForm",{data:"เพิ่มไดอารี่",errors:errors});
    }else{
        data = new Diary ({
        title:req.body.title,
        detail:req.body.detail,
        author:req.body.author
        })
        Diary.createDiary(data,function(err){
            if(err) console.log(err);
            res.redirect('/diary')
        }) 
    }
    
});

router.post('/update',[
    check('title','กรุณาป้อนหัวข้อไดอารี่').not().isEmpty(),
    check('detail','กรุณาป้อนรายละเอียด').not().isEmpty(),
    check('author','กรุณาป้อนชื่อผู้เขียน').not().isEmpty()
], function(req, res, next) {
    //check validate data
    const result= validationResult(req);
    var errors = result.errors;
    for (var key in errors) {
            console.log(errors[key].value);
    }
    if (!result.isEmpty()) {
        //กรณีที่ป้อนไม่ครบ
        res.redirect("/diary");
    }else{
        data = new Diary ({
        id:req.body.id,
        title:req.body.title,
        detail:req.body.detail,
        author:req.body.author
        })
        Diary.updateDiary(data,function(err){
            if(err) console.log(err);
            res.redirect('/diary')
        }) 
    }
    
});

module.exports = router;