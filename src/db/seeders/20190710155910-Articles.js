import moment from 'moment';

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', [{
      title: 'TIA',
      body: 'This is Andela',
      description: 'From the heart and deep on the soul of young African software engineers',
      authorId: 1,
      slug: 'TIA',
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },{
      title: 'Delete this',
      body: 'This is Andela',
      description: 'From the heart and deep on the soul of young African software engineers',
      authorId: 1,
      slug: 'dropTIA',
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },{
      title: 'like dislike',
      body: 'This is Andela',
      description: 'From the heart and deep on the soul of young African software engineers',
      authorId: 1,
      slug: 'like-africa',
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },{
        title: 'Bookmark this story',
        body: 'This is Andela',
        description: 'From the heart and deep on the soul of young African software engineers',
        authorId: 1,
        slug: 'bookmark-it',
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format()
    },{
      title: 'Return of the Mack',
      body: 'It is a song written and recorded by the British R&B singer Mark Morrison and features backing vocals from Angie Brown. It was released in the United Kingdom in March 1996 and topped the UK Singles Chart a month later',
      description: 'blues',
      authorId: 7,
      tagList: ['return','mack','morrison'],
      slug: 'mack-returned',
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },{
      title: 'Staying alive',
      body: 'is a disco song written and performed by the Bee Gees from the Saturday Night Fever motion picture soundtrack. The song was released on 13 December 1977 as the second single from the Saturday Night Fever soundtrack.',
      description: 'disco',
      authorId: 4,
      tagList: ['alive','night','fever'],
      slug: 'stay-alive',
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    },{
      title: 'How Deep Is Your Love',
      body: 'How Deep Is Your Love, is a 1977 single by the Bee Gees. Originally intended for singer Yvonne Elliman, their request was declined and the Bee Gees decided to sing it themselves.',
      description: 'single',
      authorId: 5,
      tagList: ['deep','love','original'],
      slug: 'deep-love',
      createdAt: moment.utc().format(),
      updatedAt: moment.utc().format()
    }], {});
  },
  down: (queryInterface, Sequelize) => {}
};
