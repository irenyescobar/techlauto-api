const db = require('../db');

module.exports = {

  async index(req,res){
    
    db.getClient((err, client, done)=> {

      if (err) {
        return console.error('Error acquiring client', err.stack)
      }

      client.query('SELECT * FROM users', (err, result) => {

        done()

        if (err) {
          return console.error('Error executing query', err.stack)
        } 

        return res.json(result.rows);

      })

    }); 
  }, 

};