window.addEventListener('load', () => {

    fetch('http://localhost:8888/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(ident)
    })
        .then(blob => blob.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err))
})
