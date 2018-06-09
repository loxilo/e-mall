const mongoose = require('mongoose');
const {Goods,insertData} = require('../models/goods_model');
const DB_URL = 'mongodb://localhost:27017/goods';
const goodData = require('../db/goods');

//连接数据库
mongoose.connect(DB_URL);

//连接成功
mongoose.connection.on('connected',()=>{
	console.log('Database connect success!');
	console.log('Mongoose connection open to' + DB_URL);
});

//连接失败
mongoose.connection.on('error',err=>{
	console.log('Database connect failed!');
	console.log('Mongoose connection error: '+ err);
	//process.exit(1);
});

//数据库断开
mongoose.connection.on('disconnected',()=>{
	console.log('Mongoose connection disconnected!');
});





