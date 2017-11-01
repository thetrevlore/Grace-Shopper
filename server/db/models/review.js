'use strict'

const {STRING, INTEGER, TEXT} = require('sequelize')

const Review = db.define('review', {
  stars: {
    type: INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  title: STRING,
  text: TEXT,

});

module.exports = Review;
