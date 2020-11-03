import CurrencyLayerClient from 'currencylayer-client';
import { configs } from './configs'
import cron from 'node-cron';

const client = new CurrencyLayerClient({
    apiKey: configs.api_key
});

export function fetchRates(currencies: Array<string>, source = null){
    const set_source = source ? source : configs.default_source;
    return client.live({ currencies: currencies, source: set_source });
}

export const fetchRatesCron = cron.schedule(configs.schedule, () => {
    console.log(fetchRates(
        ['USD', 'KES', 'UGX']
    ));
    
},{
    scheduled: false
});


fetchRatesCron.start();