var mongoose = require('mongoose'); // Thư viện giúp kết nối và làm việc với MongoDB trong Node.js.
var Schema = mongoose.Schema; //  Được sử dụng để định nghĩa cấu trúc của các bản ghi trong cơ sở dữ liệu MongoDB.
var passportLocalMongoose = require('passport-local-mongoose'); //Plugin cho Mongoose, giúp quản lý xác thực người dùng sử dụng username và password.

// Sử dụng đối tượng Schema để định nghĩa cấu trúc của User trong cơ sở dữ liệu MongoDB.
var User = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose); // được sử dụng để thêm Passport-Local Mongoose plugin vào Schema của Use
module.exports = mongoose.model('User', User);  // định nghĩa một model trong ứng dụng Node.js của bạn để tương tác với collection trong cơ sở dữ liệu MongoDB. Chưa có collection nó sẽ tạo ra 
