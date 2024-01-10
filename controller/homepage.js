exports.get_home = async function(req,res){
    try{
        res.render("../views/auth/login")
    }catch(e){
    console.log(e);
    }
}
// bu ksimda anasayfa duzenlemsini yap ve anasayfaya gecis yap
