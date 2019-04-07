import test from 'ava'

import { parse, test: testComment } from '../src.js'

import { COMMENTS } from './helpers.js'

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
