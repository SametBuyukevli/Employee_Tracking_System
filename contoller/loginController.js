const pool = require("../data/db");
const bcrypt = require("bcrypt");

exports.get_register = async function(req,res){
    try{
        res.render("../views/auth/login")
    }catch(e){
    console.log(e);
    }
}
exports.get_login = async function(req,res){
    try{
        res.render("../views/auth/login") 
    }catch(e){
    console.log(e);
    }
}
exports.get_alert = async function(req,res){
    try{
        res.render("../views/auth/alert.ejs")
    }catch(e){
    console.log(e);
    }
}

//kayit olusturduk
exports.post_register = async function(req, res) {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const sql = "INSERT INTO userlogin (userName, email, password) VALUES (?, ?, ?)";
        const params = [userName, email, hashedPassword];
        

        const [rows] = await pool.execute(sql, params);
        if(rows.affectedRows > 0){
            req.session.userName = userName;
            res.redirect("/employees");
        } else {
            req.flash("error", "User registration failed");
            res.redirect("/register");
        }
    } catch (error) {
        console.log(error);
    }
}

exports.post_login = async function (req, res) {
    const { email, password } = req.body;

    try {
        const sql = "SELECT * FROM userlogin WHERE email = ?";
        const params = [email];

        const [rows] = await pool.execute(sql, params);
        if (rows.length > 0) {
            const match = await bcrypt.compare(password, rows[0].password);
            if (match) {
                // giris basarili
                req.session.userName = rows[0].userName;
                req.flash("success", "Başarılı Giriş. 3 saniye içinde yönlendiriliyorsunuz...");
                    res.redirect("/alert");
            } else {
                // Yanlis sifre
                req.flash("error", "Eposta adresi veya şifre yanlış. Giriş sayfasına yönlendiriliyorsunuz...");
                    res.redirect("/alert");
            }
        } else {
            // Kullanici bulunamadi
            req.flash("error1", "Kullanıcı bulunamadı. Giriş sayfasına yönlendiriliyorsunuz...");
                res.redirect("/alert");
        }
    } catch (error) {
        console.log(error);
    }
};