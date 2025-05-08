async function getData(id = '') {
    const req = await fetch(`https://json-api.uz/api/project/fn37/todos${id}`)
    
    if (req.status === 200) {
        const res = await req.json()
        return res.data
        
    } else {
        throw new Error('nimadir xato')
    }
} 

export default getData