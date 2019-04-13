const DataConvertor = require('./data-processing/DataConvertor');
const HEART_RATE_FILE = 'com.samsung.health.heart_rate.201904132317.csv';

const convertor = new DataConvertor();

convertor.convert('./DATA/' + HEART_RATE_FILE, './DATA/OUTPUT/heart-rate-own.json');
