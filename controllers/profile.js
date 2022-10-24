export const getCurrentUser = async(req, res) => {
    const { user:userDB } = req;

    if (!userDB) {
        return res.redirect('back');
    }

    res.json({
        userDB
    })
}