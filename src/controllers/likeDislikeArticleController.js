import model from '../db/models/index';

const { likeDislikes } = model;

/**
 * like/dislike controller
 */
class LikeDislike {
  /**
   *
   * @param {string} slug
   * @returns {integer} number of likes
   */
  static async countLikesDislikes(slug) {
    const likes = await likeDislikes.findAll({ where: { slug, like: true } });
    const disLikes = await likeDislikes.findAll({ where: { slug, dislike: true } });
    return ([likes.length, disLikes.length]);
  }

  /**
   *
   * @param {string} slug
   * @param {integer} id
   * @param {object} liked
   * @returns {object} like/dislike info
   */
  static async revertLikeArticleAction(slug, id, liked) {
    await likeDislikes.update({ like: liked }, { where: { slug, userId: id } });
    const likesDislikes = await LikeDislike.countLikesDislikes(slug);
    const articleLikeDislikeInfo = {
      liked,
      disLiked: false,
      likes: likesDislikes[0],
      disLikes: likesDislikes[1]
    };
    return articleLikeDislikeInfo;
  }

  /**
 *
 * @param {integer} id
 * @param {string} slug
 * @param {string} likedOrDisliked
 * @returns {object} like/dislike info
 */
  static async createNewLikeOrDislike(id, slug, likedOrDisliked) {
    if (likedOrDisliked === 'like') {
      const newArticleLike = { userId: id, slug, like: true };
      const likeArticle = await likeDislikes.create(newArticleLike);
      const { like, dislike } = likeArticle.dataValues;
      const likesDislikes = await LikeDislike.countLikesDislikes(slug);
      const isLiked = {
        liked: like,
        disliked: dislike,
        likes: likesDislikes[0],
        dislikes: likesDislikes[1]
      };
      return isLiked;
    }
    const newArticleDislike = { userId: id, slug, dislike: true };
    const dislikeArticle = await likeDislikes.create(newArticleDislike);
    const { like, dislike } = dislikeArticle.dataValues;
    const likesDislikes = await LikeDislike.countLikesDislikes(slug);
    const isDisliked = {
      liked: like,
      disliked: dislike,
      likes: likesDislikes[0],
      dislikes: likesDislikes[1]
    };
    return isDisliked;
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} likes
   */
  static async likeArticle(req, res) {
    const { slug } = req.params;
    const { id } = req.user;
    const userReactedOnArticle = await likeDislikes.findOne({ where: { slug, userId: id } });
    if (userReactedOnArticle) {
      const { like: liked, dislike: disliked } = userReactedOnArticle.dataValues;
      if (disliked) {
        await LikeDislike.revertDisLikeArticleAction(slug, id, false);
        const likeArticle = await LikeDislike.revertLikeArticleAction(slug, id, true);
        return res.status(200).json(likeArticle);
      }
      if (liked) {
        const unLikeArticle = await LikeDislike.revertLikeArticleAction(slug, id, false);
        return res.status(200).json(unLikeArticle);
      }
      const likeArticle = await LikeDislike.revertLikeArticleAction(slug, id, true);
      return res.status(200).json(likeArticle);
    }
    const newArticleLike = await LikeDislike.createNewLikeOrDislike(id, slug, 'like');
    return res.status(200).json(newArticleLike);
  }


  /**
   *
   * @param {string} slug
   * @param {integer} id
   * @param {object} disLiked
   * @returns {object} like/dislike info
   */
  static async revertDisLikeArticleAction(slug, id, disLiked) {
    await likeDislikes.update({ dislike: disLiked }, { where: { slug, userId: id } });
    const likesDislikes = await LikeDislike.countLikesDislikes(slug);
    const articleLikeDislikeInfo = {
      liked: false,
      disLiked,
      likes: likesDislikes[0],
      disLikes: likesDislikes[1]
    };
    return articleLikeDislikeInfo;
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} likes
   */
  static async dislikeArticle(req, res) {
    const userReactedOnArticle = await likeDislikes
      .findOne({ where: { slug: req.params.slug, userId: req.user.id } });
    if (userReactedOnArticle) {
      const { like: liked, dislike: disliked } = userReactedOnArticle.dataValues;
      if (liked) {
        await LikeDislike.revertLikeArticleAction(req.params.slug, req.user.id, false);
        const disLikeArticle = await LikeDislike
          .revertDisLikeArticleAction(req.params.slug, req.user.id, true);
        return res.status(200).json(disLikeArticle);
      }
      if (disliked) {
        const unDisLikeArticle = await LikeDislike
          .revertDisLikeArticleAction(req.params.slug, req.user.id, false);
        return res.status(200).json(unDisLikeArticle);
      }
      const disLikeArticle = await LikeDislike
        .revertDisLikeArticleAction(req.params.slug, req.user.id, true);
      return res.status(200).json(disLikeArticle);
    }
    const newArticleDislike = await LikeDislike.createNewLikeOrDislike(req.user.id, req.params.slug, 'dislike');
    return res.status(200).json(newArticleDislike);
  }
}

export default LikeDislike;
