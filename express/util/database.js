const mysqldb = require('mysql2');

const pool = mysqldb.createPool({
    host: 'localhost',
    user: 'silver_commerce',
    database: 'commerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    password:'silver_commerce'
  });

  const promisePool = pool.promise();

  console.log(promisePool);

  

  promisePool.execute('SELECT * FROM PRODUCT').save.then(([result])=>{
    console.log(result[0]);
    
  }).catch((err)=>{
    console.error(`error here ===> ${err}`);
  })
  
 
  
 module.exports = promisePool;

/*const connection = mysqldb.createConnection({
    host: 'localhost',
    user: 'silver_commerce',
    password:'silver_commerce',
    database: 'commerce'
  });

  console.log(`connection ::: ${connection}` );*/

 