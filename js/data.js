'use strict';

(function () {
  var commentsArray = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

    var getUrls = function (min, max) {
      var urls = [];
      for (var i = 0; i < max; i++) {
        urls[i] = 'photos/' + (i + 1) + '.jpg';
      }
      return urls;
    };

    var getLikes = function (min, max) {
      var likes = [];
      for (var i = 0; i < 25; i++) {
        likes[i] = min - 0.5 + Math.random() * (max - min + 1);
        likes[i] = Math.round(likes[i]);
      }
      return likes;
    };

    var getComments = function () {
      var comments = [];
      for (var i = 0; i < 25; i++) {
        var number = Math.floor(Math.random() * commentsArray.length);
        comments[i] = commentsArray[number];
      }
      return comments;
    };

    var createPictures = function () {
      var pictures = [];
      for (var i = 0; i < 25; i++) {
        pictures[i] = {};
        pictures[i].url = urls[i];
        pictures[i].likes = likes[i];
        pictures[i].comments = comments[i];
      }
      return pictures;
    };

    var urls = getUrls(1, 25);
    var likes = getLikes(15, 200);
    var comments = getComments(commentsArray);
    var pictures = createPictures(urls, likes, comments);

  window.data = {
    pictures: pictures
  };
})();
