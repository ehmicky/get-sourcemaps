'use strict'

const test = require('ava')

const { parse, test: testComment } = require('../localpack')

const { COMMENTS } = require('./helpers')

/* eslint-disable max-nested-callbacks */
COMMENTS.forEach(comment => {
  test(`should test: ${comment}`, t => {
    try {
      const value = testComment(comment)
      t.snapshot(value)
    } catch (error) {
      t.snapshot(error.message)
    }
  })

  test(`should parse: ${comment}`, t => {
    try {
      const value = parse(comment)
      t.snapshot(value)
    } catch (error) {
      t.snapshot(error.message)
    }
  })
})
/* eslint-enable max-nested-callbacks */
