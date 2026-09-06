// backend/config/safepay.js

import Safepay from "@sfpy/node-core";

const safepay = new Safepay(
    process.env.SAFEPAY_SECRET_API_KEY,
    {
        authType: "secret",
        host: "https://sandbox.api.getsafepay.com",
    }
);

export default safepay;