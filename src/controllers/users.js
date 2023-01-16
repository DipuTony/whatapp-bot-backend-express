const getAllUsers = async(req, res) =>{
    res.status(200).json({sge:"get All projexys"})
}

const getAboutDipu = async(req, res) =>{
    res.status(200).json({Message:"Hi.. This is about Dipu"})
}
const getAllTestUsers = async(req, res) =>{

    let name =  req.body.name;

    res.status(200).json({msg:"get All getAllTestUsers ", data: name})
}

module.exports = {getAllUsers, getAllTestUsers, getAboutDipu};