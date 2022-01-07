const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('postData', (request, response) => {
    if (request.method !== 'POST') {
        return null
    }
    else {
        return JSON.stringify(request.body)
    }
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(morgan((tokens, request, response) => {
    return tokens.postData(request, response)
}))

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('phonebookbackend')
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    else if (persons.find(person => person.name === body.name)) {
        return response.status(409).json({
            error: 'name must be unique'
        })
    }

    let newId = Math.floor(Math.random() * 100)
    while (persons.find(person => person.id === newId)) {
        newId = Math.floor(Math.random() * 100)
    }

    const newPerson = {
        id: newId,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})