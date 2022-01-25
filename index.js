const express = require("express");
const bodyParser = require('body-parser')
const path = require("path");
const router = express.Router();
const fs = require("fs");

const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/", router)


router.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"/task.html"))
  }) 
  
  // ADDS DATA
  router.post('/todos', (req, res) => {
   
    let data = fs.readFileSync('data.json');
    data = JSON.parse(data);
    var title = req.body.title;
    var description = req.body.description;
    var status = req.body.status;
    var id = data.length+1;
  
    data.push({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      id:id,
    });
  
    var newData = JSON.stringify(data);
    fs.writeFile('data.json', newData, (err) => {
      if (err) throw err;
      console.log('New data added');
    });
    
    res.status(200).send(data);
  });

  // UPDATES DATA
  router.put("/update/:id", (req, res) => {
    var id = req.params.id-1;
  
    let jsonData = fs.readFileSync("data.json");
    var data = JSON.parse(jsonData);
  
    data[id]["title"] = req.body.title;
    data[id]["description"] = req.body.description;
    data[id]["status"] = req.body.status;
  
    var newData = JSON.stringify(data);
    fs.writeFile("data.json", newData, (err) => {
      if (err) throw err;
      console.log("Data updated");
    });
    res.status(200).send(data);
  });

  // REMOVES DATA
  router.delete("/remove/:id", (req, res) => {
    var id = req.params.id-1;
  
    let jsonData = fs.readFileSync("data.json");
    var data = JSON.parse(jsonData);

    data.splice(id,1)
    var newData = JSON.stringify(data);
    fs.writeFile("data.json", newData, (err) => {
      if (err) throw err;
      console.log("Data deleted");
    });
    res.status(200).send(data);

  })

app.listen(port, () => {
  console.log(`Server running ar port ${port}`);
})