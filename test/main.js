import test from 'ava'

import { parse, test as testComment } from '../src/main.js'

import { COMMENTS } from './helpers/fixtures.js'

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
