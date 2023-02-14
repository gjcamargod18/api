const express = require('express')
const { REGEX_BACKSLASH } = require('picomatch/lib/constants')
const routes = express.Router()

routes.get('/', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query("SELECT * FROM books", (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT  INTO books set ?',[req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('registrado')
        })
    })
})

routes.delete('/:id', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE  FROM books WHERE id=?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('borrado')
        })
    })
})

routes.put('/:id', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE books set ? WHERE id=?',[req.body,req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('actualizado')
        })
    })
})

module.exports = routes