const mongoose = require('mongoose')
const mongo = require('mongodb')
const dbUrl = 'mongodb://localhost:27017/DiaryDB'

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
const db = mongoose.connection

//สร้าง Schema เพื่อสร้าง ID
const Schema = mongoose.Schema

const diarySchema = new Schema({
    id:{
        type:Schema.ObjectId
    },
    title:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
})

//ฟังก์ชันบันทึกข้อมูล
const Diary = module.exports=mongoose.model("diarys",diarySchema)
module.exports.createDiary = function(newDiary,callback){
    newDiary.save(callback)
}

module.exports.getAllDiary=function(data){
    Diary.find(data)
}
module.exports.deleteDiary=function(id,callback){
    Diary.findByIdAndDelete(id,callback)
}
//ดึงข้อมูลออกมาแก้ไข
module.exports.getDiaryId=function(id,callback){
    var query={
        _id:id
    }
    Diary.findOne(query,callback)
}

module.exports.updateDiary=function(data,callback){
    var query={
        _id:data.id
    }
    Diary.findByIdAndUpdate(query,{
      $set:{
          title:data.title,
          detail:data.detail,
          author:data.author
      }
    },{new:true},callback)
}

