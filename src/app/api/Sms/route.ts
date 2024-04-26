import {NextResponse } from "next/server";
import twilio from "twilio";



export const POST = async (request:any) => {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    const {phone,firstname} = await request.json();
    
    const result = await client.messages.create({
        body: `Hello ${firstname},\n\nI hope this message finds you well. I'm reaching out because there is an urgent need for blood donation matching your blood type. Your generous donation could save a life.\n\nPlease let me know if you're available to donate or if you need any further information. Your contribution would be greatly appreciated.`,
                from: process.env.VIRTUAL_NUMBER,
                to: phone
    })
    console.log("SMS sent to :",phone);
    
    return NextResponse.json({ message: "sucess" }, { status: 500 })
}

