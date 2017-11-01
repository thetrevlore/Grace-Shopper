'use strict'

const {STRING, INTEGER, TEXT} = require('sequelize')
const db  = require('../db');

const Review = db.define('review', {
  stars: {
    type: INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  title: STRING,
  text: {
    type: TEXT,
    validate: {
      len: [25, 2500]
    }
  }
});

module.exports = Review;
