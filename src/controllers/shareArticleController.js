/**
 * share article controller
 */
class ShareArticleManager {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns{object} object of response with open new email window
   */
  static async shareOnEmail(req, res) {
    const { slug, link } = req.article;
    res.status(200).json({
      message: 'Article to share on E-mail',
      link: `mailto:?subject=${slug}&body=${link}`
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns{object} object of response with open new twitter window
   */
  static async shareOnTwitter(req, res) {
    const { link } = req.article;
    res.status(200).json({
      message: 'Article to share on Twitter',
      link: `https://twitter.com/intent/tweet?text=${link}`
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns{object} object of response with open new facebook window
   */
  static async shareOnFacebook(req, res) {
    const { link: shareLink } = req.article;
    res.status(200).json({
      message: 'Post to share on Facebook',
      link: `https:www.facebook.com/sharer/sharer.php?u=${shareLink}`
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns{object} object of response with open new Whatsapp window
   */
  static async shareOnWhatsapp(req, res) {
    res.status(200).json({
      message: 'Article to share on Whatsapp',
      link: `https://wa.me/?text=${req.article.link}`
    });
  }
}
export default ShareArticleManager;
