const express = require('express');
const app = express();
const cors = require('cors');
const utils = require('./utils');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/get_historical_data/:currency/:start/:end', (req, res) => {
    utils.getAPI(`https://api.nomics.com/v1/exchange-rates/history?key=75e23f1b7a3f2f43339b7de9bfe8acf68bb934ae&currency=${req.params.currency}&start=${req.params.start}&end=${req.params.end}`)
        .then((chartData) => {
            res.status(200).json({
                success: true,
                data: utils.formatData(chartData.data)
            });
        }).catch(err => {
            res.status(500).json({
                success: false,
                message: 'Something went wrong!',
                data: err
            });
        });
});

app.get('/get_cryto_list/:start/:perPage', async (req, res) => {
    try {
        const cryptoList = await utils.getAPI(`https://api.nomics.com/v1/currencies/ticker?key=75e23f1b7a3f2f43339b7de9bfe8acf68bb934ae&interval=1d,30d&convert=USD&sort=rank&per-page=${req.params.perPage}&page=${req.params.start}`)
        res.status(200).json({
            success: true,
            data: await cryptoList.data
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            data: err
        });
    }
});

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
app.listen(port, () => console.log(`Listening on port ${port}`));
