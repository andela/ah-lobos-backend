/**
 * highlight class
 */
class HighlightObject {
  /**
   *
   * @param {string} a
   * @param {string} b
   * @param {string} c
   * @param {string} d
   * @param {integer} id
   * @returns {object} new highlighted text
   */
  static makeObject(a, b, c, d, id) {
    const highlightObject = {
      selectFrom: a,
      selectTo: b,
      highlightedBy: id,
      highlightedText: c,
      comment: d,
    };
    return highlightObject;
  }
}

export default HighlightObject;
