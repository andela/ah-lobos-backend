/* eslint-disable class-methods-use-this */
/**
 * Read Time class
 */
class ReadTime {
  /**
     *
     * @param {Integer} seconds
     * @returns {String} minutes
     */
  convert(seconds) {
    if (seconds > 60) {
      return `${Math.ceil(seconds / 60)} min`;
    }
    return 'Less than a minute';
  }

  /**
     *
     * @param {String} words
     * @returns {Integer} number of words
     */
  wordsLength(words) {
    return words.split(' ').length;
  }

  /**
     *
     * @param {String} text
     * @returns {Integer} seconds
     */
  read(text) {
    const wordPerSecond = 4;
    const words = this.wordsLength(text);
    const seconds = words / wordPerSecond;
    return this.convert(seconds);
  }
}

export default new ReadTime();
