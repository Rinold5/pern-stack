import arcjet, {shield,tokenBucket,detectBot} from "@arcjet/node";
import "dotenv/config";

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules: [
        // shield protects the route from being accessed by bots
        shield({mode:"LIVE"}),
        detectBot({
            mode:"LIVE",
            // allow search engines to access the route
            allow:[
                "CATEGORY:SEARCH_ENGINE",
            ]}),
        tokenBucket({
            mode:"LIVE",
            refillRate: 30,
            interval: 5,
            capacity: 20,
        })    
    ]
})