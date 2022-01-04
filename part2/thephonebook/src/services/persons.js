import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const update = (duplicate, newNumber) => {
    axios.put(`${baseUrl}/${duplicate.id}`, {
        name: duplicate.name,
        number: newNumber
    })
}

const del = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, del }