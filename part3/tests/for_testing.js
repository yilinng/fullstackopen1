const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const persons = []

  const result = listHelper.dummy(person)
  assert.strictEqual(result, 1)
})
