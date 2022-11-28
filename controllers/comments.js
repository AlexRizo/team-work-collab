import Comment from "../models/comment.js"

export const getComments = async(req, res) => {
    const comments = await Comment.findAll();

    res.json(comments)
}

export const sendComment = async(req, res) => {
    const user = req.user;
    const { comment, eid } = req.body;

    const data = {
        comment,
        userId: user.id,
        eventId: eid
    }

    const comentario = await Comment.create(data);

    res.json(comentario);
}