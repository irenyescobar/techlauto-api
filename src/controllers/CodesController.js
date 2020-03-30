const db = require('../db');

module.exports = {

  async index(req,res){
    
    const{ email } = req.body; 
    const{ key } = req.body;
    const tablename = email.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

    db.getClient((err, client, done)=> {

      if (err) {
        res.status(503).json({ error: 'Fail connection to database client', details: err});
      } 

      client.query('call get_code($1::text,$2::text,$3::text); ', [email,tablename,key], (err, result) => {  
        
        if (err) {
          done()
          return res.status(500).json({ error: 'Fail call get_code', details: err});
        }   

        client.query('SELECT * FROM '+tablename, [], (err, result) => {  
          if (err) {
            done()
            return res.status(500).json({ error: 'Fail get result of table temp', details: err});
          }   

          if(result.rows.length > 0){
            return res.status(200).json(result.rows[0]);
          }else{
            return res.status(500).json({ error: 'Temp table is clean', details: err});
          } 

        }) 

      })

    }); 
  }, 

};