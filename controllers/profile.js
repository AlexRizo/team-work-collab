import User from "../models/user.js";

export const getCurrentUser = async(req, res) => {
    const { user:resp } = req;

    if (!resp) {
        return res.redirect('back');
    }

    const userDB = await User.findByPk(resp.id)

    res.json({
        userDB
    })
}