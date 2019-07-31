import eventEmitter from './eventEmitter';
import defaultConfigurations from './notifications/defaultConfigurations';
import newArticle from './notifications/newArticle';
import newComment from './notifications/newComment';
import newlikeDislike from './notifications/newlikeDislike';

eventEmitter.on('create default notification configuration', defaultConfigurations.default);
eventEmitter.on('newArticle', newArticle.getFollowers);
eventEmitter.on('newComment', newComment.getComment);
eventEmitter.on('reaction', newlikeDislike.getReaction);
