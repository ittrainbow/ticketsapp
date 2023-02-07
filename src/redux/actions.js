import { SET_LOADING } from './types'

export const setLoading = (boolean) => {
  return {
    type: SET_LOADING,
    payload: boolean
  }
}
