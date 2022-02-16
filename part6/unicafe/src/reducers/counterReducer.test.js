import deepFreeze from 'deep-freeze'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  test('should return a proper initial state when called with undefined state', () => {
    const state = undefined
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })

  test('good, ok and bad is properly incremented', () => {
    const state = initialState
    deepFreeze(state)

    expect(counterReducer(state, { type: 'GOOD' })).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })

    expect(counterReducer(state, { type: 'OK' })).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })

    expect(counterReducer(state, { type: 'BAD' })).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })
})
