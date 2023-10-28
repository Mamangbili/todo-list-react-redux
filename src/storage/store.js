
import { configureStore } from '@reduxjs/toolkit'

const todoDelete = (state, payload) => {
    return state.filter(todo => todo.id !== payload.id)
}
const todoAdd = (state, payload) => {
    const id = Math.random()*100
    return [...state, { ...payload, id , status:"ACTIVE"}]
}

const revert = status => status === "COMPLETED" ? "ACTIVE" : "COMPLETED"
const todoRevert = (state, payload) => {
    return state.map(todo => todo.id === payload.id ? { ...payload, status: revert(payload.status) } : todo)
}
const todoUpdate = (state, payload) => {
    return state.map(todo => todo.id === payload.id ? payload : todo)
}
const todoMethod = {
    "DELETE": todoDelete,
    "ADD": todoAdd,
    "REVERT_STATUS": todoRevert,
    "UPDATE": todoUpdate
}
const todoReducer = (state = [{id:1,todo:"Testing 123",status:"ACTIVE"}], action) => {
    if(!todoMethod[action.type]) return state
    return todoMethod[action.type](state, action.payload)
}


export const store = configureStore({ reducer: { todoReducer } })