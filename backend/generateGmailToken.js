import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import path from "path";

const SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
];

const auth = await authenticate({
    keyfilePath: path.join(
        process.cwd(),"backend",
        "credentials.json"
    ),
    scopes: SCOPES,
});

console.log("Authentication successful!");

console.log("Access Token:");
console.log(auth.credentials.access_token);

console.log("Refresh Token:");
console.log(auth.credentials.refresh_token);