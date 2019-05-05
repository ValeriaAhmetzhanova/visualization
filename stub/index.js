const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
var cors = require('cors')();

const app = express();

console.log('!!!!!', process.env.BACKEND_URL);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(cors);

app.get('/v1/visualizations/', (req, res) => {
    let data = {
        "data": [
            {
                "config": {
                    "channel": "26",
                    "id": 1,
                    "layer": "conv5_1",
                    "network": "AlexNet",
                    "status": 2,
                    "submitted": "20190423-153010"
                },
                "id": 1,
                "job_id": 1,
                "results": [
                    {
                        "created_at": "20190423-153047",
                        "id": 1,
                        "img_url": "img/20190423-153010-0.jpg",
                        "vis_id": 1
                    }
                ]
            }
        ],
            "success": true
    };


    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

app.get('/v1/networks/', (req, res)=> {
    let data = {
        "networks": [
            {
                "dataset": "ImageNet",
                "description": "AlexNet competed in the ImageNet Large Scale Visual Recognition Challenge[5] on September 30, 2012. The network achieved a top-5 error of 15.3%, more than 10.8 percentage points lower than that of the runner up.",
                "id": 0,
                "layers": [
                    {
                        "depth": 256,
                        "name": "concat_2",
                        "type": "conv"
                    },
                    {
                        "depth": 256,
                        "name": "conv5_1",
                        "type": "conv"
                    },
                    {
                        "depth": 4096,
                        "name": "Relu",
                        "type": "dense"
                    },
                    {
                        "depth": 4096,
                        "name": "Relu_1",
                        "type": "dense"
                    },
                    {
                        "depth": 1000,
                        "name": "Softmax",
                        "type": "dense"
                    }
                ],
                "name": "AlexNet"
            }
        ],
        "success": true
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
})

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);