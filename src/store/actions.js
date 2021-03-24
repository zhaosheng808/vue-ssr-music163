import {
  fetchUser,
  fetchItem,
  // fetchIdsByType,
  fetchItemComments,
  fetchListByType
} from '../api'

export default {
  // ensure data for rendering given list type
  FETCH_LIST_DATA: ({ commit, dispatch, state }, { type }) => {
    commit('SET_ACTIVE_TYPE', { type })
    return fetchListByType(type)
      .then(ids => {
        commit('SET_LIST', { type, ids })
      })
      .then( items => commit('SET_ITEMS', { items }))
  },

  // ensure all active items are fetched
  ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => {
    return dispatch('FETCH_ITEMS', {
      ids: getters.activeIds
    })
  },

  FETCH_ITEM: ({ commit, state }, { id }) => {
    // on the client, the store itself serves as a cache.
    // only fetch items that we do not already have, or has expired (3 minutes)
    if (id) {
      return fetchItem(id).then(item => commit('SET_ITEM', { item: item }))
    } else {
      return Promise.resolve()
    }
  },

  FETCH_COMMENTS: ({ commit, state }, { id }) => {
    // on the client, the store itself serves as a cache.
    // only fetch items that we do not already have, or has expired (3 minutes)
    if (id) {
      return fetchItemComments(id).then(data => commit('SET_COMMENTS', { data }))
    } else {
      return Promise.resolve()
    }
  },

  FETCH_USER: ({ commit, state }, { id }) => {
    return state.users[id]
      ? Promise.resolve(state.users[id])
      : fetchUser(id).then(user => commit('SET_USER', { id, user }))
  }
}
