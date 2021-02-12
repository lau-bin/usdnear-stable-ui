const express = require('express');
const path = require('path');
const rootDir = require('../project.config').APP_ROOT
const app = express();

app.use(express.static(rootDir + '/dist')); app.get('/*', function (req, res) {
    res.sendFile(path.join(rootDir + req.path ));
    console.log(req.path);
});
app.listen(3000, () => {
    console.log(path.join(rootDir + '/dist/index.html'))
    console.log("Starting web server in port: " + 3000)
});
