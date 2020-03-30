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

  async request_authorization(req,res){    

    const{ email } = req.body; 
    const{ key } = req.body;

    db.getClient((err, client, done)=> {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }      
      client.query('call request_auth($1::text,$2::text); ', [email,key], (err, result) => {            
        if (err) {
          done()
          return res.status(500).json({ error: 'Fail call request_auth', details: err});
        }   

        client.query('SELECT code, key_app, active FROM users WHERE email LIKE $1::text', [email], (err, result) => {  
          if (err) {
            done()
            return res.status(500).json({ error: 'Fail get result of table temp', details: err});
          }   

          if(result.rows.length > 0){ 
            const {code, key_app, active} = result.rows[0];
            if(key_app === key){   
              if(active){
                return res.status(200).json({active, code, message: 'Autorizado'}); 
              } else {
                return res.status(200).json({active, code, message: 'Solicitado'}); 
              } 
            }else{
              if(active){
                return res.status(200).json({active, code: null, message: 'Autorizado para outro dispositivo'}); 
              } else {
                return res.status(200).json({active, code: null, message: 'Solicitado por outro dispositivo'}); 
              } 
            } 
          }else{
            return res.status(500).json({ error: 'No results to email \''+email+'\'', details: err});
          } 
        }) 
      })
    }); 
  },  
};