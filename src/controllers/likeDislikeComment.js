import model from '../db/models/index';

const { LikeDislikeComment, Comments } = model;

const dislikedComment = {
  like: false,
  dislike: true
};

/**
 * like/dislike for comment controller
 */
class LikeDislikeComments {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} likes
   */
  static async likeComment(req, res) {
    const like = {
      like: true,
      dislike: false,
      userId: req.user.id,
      commentId: req.params.id
    };
    const findComment = await Comments.findOne({ where: { id: req.params.id } });
    if (!findComment) {
      return res.status(404).send({ error: 'The comment requested is not found!' });
    }
    const find = await LikeDislikeComment.findOne({ where: { userId: req.user.id, like: true } });
    if (find) {
      await LikeDislikeComment.update({ like: false }, { where: { userId: req.user.id } });
      const Likes = await LikeDislikeComment.findAll({ where: { like: true } });
      return res.status(201).json({
        message: 'You unliked this comment', data: dislikedComment, total: Likes.length
      });
    }
    await LikeDislikeComment.create(like);
    const Likesss = await LikeDislikeComment.findAll({ where: { like: true } });
    return res.status(201).json({ message: 'Thank you for liking this comment', data: like, total: Likesss.length });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} likes
   */
  static async dislikeComment(req, res) {
    const dislike = {
      like: false,
      dislike: true,
      userId: req.user.id,
      commentId: req.body.id
    };
    const find = await LikeDislikeComment.findOne({ where: { userId: req.user.id, like: true } });
    if (find) {
      const { like: liked, dislike: disliked } = find;
      if (liked) await find.update({ like: false });
      if (disliked) await find.update({ dislike: false });
      const Likes = await LikeDislikeComment.findAll({ where: { like: true } });
      return res.status(201).json({ message: 'You disliked this comment', data: dislike, total: Likes.length });
    }
    await LikeDislikeComment.create(dislike);
    const LikesNumber = await LikeDislikeComment.findAll({ where: { like: true } });
    return res.status(201).json({ message: 'You disliked this comment', data: dislike, total: LikesNumber.length });
  }
}

export default LikeDislikeComments;
