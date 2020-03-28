const express       = require('express');
const router        = new express.Router();
const mysql         = require('mysql');
const fs            = require('fs')
const _             = require("underscore");


//Create connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pet'
  });
   
  //connect to database
  conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });
   


router.get('/pets', async (req,res) => {
    var _activePage = req.query.activePage;
    var _itemsCountPerPage = req.query.itemsCountPerPage;
    var _nameorder = req.query.nameorder;
    var queryOrderBy = '';
    if(_nameorder != ""){
        queryOrderBy = 'Order By name ' + _nameorder
    }
    
    _activePage = _activePage-1;

   try {

    conn.query('SELECT count(*) as total FROM pets', (err, rows, fields) => {
        if (!err)
           {
            var totalRecord = rows[0].total;
            conn.query('SELECT * FROM pets '+queryOrderBy+' limit '+(_activePage*_itemsCountPerPage)+','+_itemsCountPerPage, (err, rows, fields) => {
                if (!err)
                {
                    var returnobj= {};
                    returnobj.data = rows;
                    returnobj.totalRecord = totalRecord;
                    res.send(returnobj);
                }
                    
                else
                    res.status(422).send(err)
                })
            }
        });

    
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/pet/:id', async (req,res) => {
    var _id =  req.params.id
    
  try {  
        let jsonobj = JSON.parse(fs.readFileSync('data/pets.json', 'utf-8'))
        let data = jsonobj.data;
        let cols = jsonobj.cols;
        let newData = []

        for(var i = 0; i < data.length; i++){
            var obj = {};
            for(var k = 0; k < cols.length; k++){
                obj[cols[k]] = data[i][k];
            }
            newData[i] = obj;
        }

        _id = parseInt(_id)
        var filtered = _.where(newData, {id: _id});
        if (filtered)
        {
            res.send(filtered);
        } 
        else
            res.status(422).send("No Record Found!")
        } catch (error) {
            res.status(500).send()
        }
});

module.exports = router