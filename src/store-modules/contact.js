import * as types from './mutation-types';
import * as urls from './url-constants';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const state = {
    loading: false,
    message: '',
    name: '',
    phone: '',
    messageInForm: ''
}

const getters = {

}

const actions = {
    contactUs({
        commit
    }, postParams) {
        var mock = new MockAdapter(axios, { delayResponse: 2000 })
        mock.onAny(urls.URL).reply(200, {
          message: 'Data successfully saved!!!'
        });
        
        commit(types.CHANGE_LOADING_STATE, true)
        
        commit(types.SAVE_FORM_VALUES, postParams)
        
        axios
            .post(urls.URL, postParams)
            .then((response) => {

                commit(types.CHANGE_LOADING_STATE, false)

                commit(types.SET_RESPONSE_MESSAGE, response.data.message)
            })
            .catch(err => {
                commit(types.CHANGE_LOADING_STATE, false)
                commit(types.SET_RESPONSE_MESSAGE, err.message)
            })
    }
}

const mutations = {
    [types.CHANGE_LOADING_STATE](state, loading) {
        state.loading = loading
    },
    [types.SET_RESPONSE_MESSAGE](state, message) {
        state.message = message
    },
    [types.SAVE_FORM_VALUES](state, form) {
        state.messageInForm = form.message
        state.phone = form.phone
        state.name = form.name
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}