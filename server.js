
// Requirements
const cors = require('cors')
const express = require('express')
const { Client } = require('pg')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()
app.use(cors())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())  


//==> SET UP THE PG MODULE <==
const connectionString = 
'postgresql://jamal:@localhost:5432/capstone_project'

// instanciare. te the client and pass it the connection string
const client = new Client({ connectionString })
client.connect().then(()=> {console.log("Connection to Postgres succesfull!")})



                                      //USER ROUTES
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
  

//Get All Users
      router.get('/users', (req, res)=> {

          // SQL Query > Select Data
          client.query('SELECT * FROM users ORDER BY user_id ASC;')
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Get users by Username
      router.get('/users/:id', (req, res)=> {

        const id = req.params.id
          // SQL Query > Select Data
          client.query('SELECT * FROM users WHERE username=$1', [id])
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Create User
      router.post('/users/new/user', (req, res, next)=> {

      const text = 'INSERT INTO users(user_id, username, password, email, tokens) VALUES ($1, $2, $3, $4, $5)'
      let data = [req.body.user_id, req.body.username, req.body.password, req.body.email, req.body.tokens]
        
      // If insertion is succesfull log message:
        client.query(text, data)
            .then( ()=> {
              res.status(200)
              .json({
                status: 'Success',
                message: 'Inserted new User'
              });
              console.log("New user: >" + req.body.username + "< succesfully inserted!")
          })
      });



      //Create User Shipping
      router.post('/users/new/shipping', (req, res, next)=> {

      const text = 'INSERT INTO users_shipping(user_id, first_name, last_name, address_one, address_two, city, state, zip, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
      let data = [req.body.user_id, req.body.first_name, req.body.last_name, req.body.address_one, req.body.address_two, req.body.city, req.body.state, req.body.zip, req.body.country]
        
      // If insertion is succesfull log message:
        client.query(text, data)
            .then( ()=> {
              res.status(200)
              .json({
                status: 'Success',
                message: 'Inserted new Shipping Adress'
              });
              console.log("New shipping address: >" + req.body.address_one + "< succesfully inserted!")
          })
      });



      //Create User Payment
      router.post('/users/new/payment', (req, res, next)=> {

      const text = 'INSERT INTO users(user_id, card_name, card_number, exp_date, cvv) VALUES ($1, $2, $3, $4, $5)'
      let data = [req.body.user_id, req.body.card_name, req.body.card_number, req.body.exp_date, req.body.cvv]
        
      // If insertion is succesfull log message:
        client.query(text, data)
            .then( ()=> {
              res.status(200)
              .json({
                status: 'Success',
                message: 'Inserted new Payment Method'
              });
              console.log("New payment method: >" + req.body.card_name + "< succesfully inserted!")
          })
      });




      //Upate User
      router.put('/users/update', (req, res, next)=> {

      const text = 'UPDATE users SET username=($2), password=($3), email=($4) WHERE user_id=($1)'
      let data = [req.body.user_id, req.body.username, req.body.password, req.body.email]
        
      // If insertion is succesfull log message:
        client.query(text, data)
            .then( ()=> {
              res.status(200)
              .json({
                status: 'Success',
                message: 'Updated User'
              })
              .catch(error => console.log(error));
              console.log("User: >" + req.body.username + "< succesfully Updated!")
          })
      });


      // Delete User with Url:
      router.delete('/users/delete/:id', (req, res)=>{

        const id = req.params.id

        client.query('DELETE FROM users WHERE username=($1)', [id])
          .then(result => res.send(result.rows))
          .catch(error => console.log(error))

      })

      // //Delete User with curl
      router.delete('/delete', (req, res, next)=>{

        const text = 'DELETE FROM users WHERE username=($1), password=($2)'
        let data = [req.body.username, req.body.password]

        client.query(text, data)
          .then(()=>{
            res.status(200)
            .json({
              status: 'Succes',
              message: 'Deleted User'
            })
            .catch(error => console.log(error));
            console.log("User: >" + req.body.username + "< succesfully Deleted!")
          })
      });

//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------





                                      //ITEM ROUTES
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
      //Get All Items
      router.get('/inventory', (req, res)=> {

          // SQL Query > Select Data
          client.query('SELECT * FROM inventory ORDER BY item_id ASC;')
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Get inventory by Username
      router.get('/inventory/users/:id', (req, res)=> {

        const id = req.params.id
          // SQL Query > Select Data
          client.query('SELECT * FROM inventory WHERE item_id=$1', [id])
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Get inventory by Price Range
      router.get('/inventory/price/:id', (req, res)=> {

        const id = req.params.id
          // SQL Query > Select Data
          client.query('SELECT * FROM inventory WHERE item_price=$1 ORDER BY item_id', [id])
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Create Item
      router.post('/inventory/new', (req, res, next)=> {

      const text = 'INSERT INTO inventory(item_id, item_name, item_price, item_group, stock, item_info, item_img, item_short) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
      let data = [req.body.item_id, req.body.item_name, req.body.item_price, req.body.item_group, req.body.stock, req.body.item_info, req.body.item_img, req.body.item_short]
        
      // If insertion is succesfull log message:
        client.query(text, data)
            .then( ()=> {
              res.status(200)
              .json({
                status: 'Success',
                message: 'Inserted new Item'
              });
              console.log("New item: >" + req.body.item_name + "< succesfully inserted!")
          })
      });


      //Upate Item
      router.put('/inventory/update', (req, res, next)=> {

      const text = 'UPDATE inventory SET item_id=($1), item_name=($2), item_price=($3), item_group=($4), stock=($5), item_info=($6), item_img=($7), item_short=($8)'
      let data = [req.body.item_id, req.body.item_name, req.body.item_price, req.body.item_group, req.body.stock, req.body.item_info, req.body.item_img, req.body.item_short]
        
      // If insertion is succesfull log message:
        client.query(text, data)
            .then( ()=> {
              res.status(200)
              .json({
                status: 'Success',
                message: 'Updated Item'
              })
              .catch(error => console.log(error));
              console.log("Item: >" + req.body.item_name + "< succesfully Updated!")
          })
      });


      // Delete item with Url:
      router.delete('/inventory/delete/:id', (req, res)=>{

        const id = req.params.id

        client.query('DELETE FROM inventory WHERE item_name=($1)', [id])
          .then(result => res.send(result.rows))
          .catch(error => console.log(error))
        })


//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------





                                            //CARD UPDATE
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------

      //Get inventory by Username
      router.get('/card/users/:id', (req, res)=> {

        const id = req.params.id
          // SQL Query > Select Data
          client.query('SELECT * FROM payment_card WHERE user_id=$1', [id])
           .then(result => res.send(result.rows))
           .catch(error => console.log(error))
      });


      //Upate Card
      router.put('/card/update', (req, res, next)=> {

      const text = 'UPDATE payment_card SET card_name=($2), card_number=($3), exp_date=($4), sn=($5) WHERE user_id=($1)'
      let data = [req.body.user_id, req.body.card_name, req.body.card_number, req.body.exp_date, req.body.sn]
        
      // If insertion is succesfull log message:
        client.query(text, data)
            .then( ()=> {
              res.status(200)
              .json({
                status: 'Success',
                message: 'Updated Payment Method'
              })
              .catch(error => console.log(error));
              console.log("Card: >" + req.body.card_number + "< succesfully Updated!")
          })
      });
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------


//Get create and account page
router.get('/sign-up', (req, res)=> {
  res.sendFile(path.join(__dirname + '/Views/form.html'));
});


//Using Views folder for Css
app.use(express.static(__dirname + '/Views'));
app.use('/', router)


//App listening
const PORT = 8080
app.listen(PORT, ()=> {
	console.log('Listeting on port: ', PORT)
})

