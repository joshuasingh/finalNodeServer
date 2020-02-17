const { withDBout } = require("../mongodbDepend");

module.exports.getAll = (req, res) => {
  withDBout(
    async db => {
      await db.find({}).toArray(function(err, result) {
        if (err) {
          res.json({ error: "InternalError" }).status(500);
        }
        console.log("here", JSON.stringify(result));
        res.json({ result }).status(200);
      });
    },
    "other",
    res
  );
};

// Broadcast to all clients
function broadcast(clients, result) {
  
  console.log("the total number of client", Object.keys(clients).length);
  

  for (var i = 0; i < Object.keys(clients).length; i++) {
    //if(Object.keys(client)[i]!==soc.id)
    Object.values(clients)[i].emit("chat", result);
  }
  }

//this is to broadcast the message to every connected client

module.exports.getAllSocket = (req, res, clients) => {
  withDBout(
    async db => {
      await db.find({}).toArray(function(err, result) {
        if (err) {
          res.json({ error: "InternalError" }).status(500);
        }
        console.log("here", JSON.stringify(result));

        //broadcasting the update values
        broadcast(clients, result);

        // res.json({ result }).status(200);
        res.send("response send").status(200);
      });
    },
    "other",
    res
  );
};
