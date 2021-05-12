const Users = require('../models/userModel')

const userCtrl = {
    getUser: async (req,res)=>{
            try {
                const user = await Users.findById(req.params.id).select('-password')
                if(!user)return status(400).json({msg: "User does not exist."})

                res.json({user})
            } catch (err) {
                return res.status(500).json({msg:err.message})
            }
    },
    updateUser: async (req, res)=>{
        try {
            const {avatar, fullname, mobile, address, story, website, gender} = req.body
            if(!fullname) return res.status(400).json({msg: "Please add your fullname!"})
            await Users.findOneAndUpdate({_id: req.user._id},{
                avatar, fullname, mobile, address, story, website,gender
            })
            res.json({msg: "updated successfully!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
            
        }
    }
}

module.exports = userCtrl