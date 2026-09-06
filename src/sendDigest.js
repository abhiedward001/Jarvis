import fs from "node:fs/promises";
import {Resend} from "resend";
import {rankJobs} from "./rankJobs.js";
import {renderEmail} from "./emailTemplate.js";

const jobsPath=new URL("../data/jobs.json",import.meta.url);
const sentPath=new URL("../data/sent_jobs.json",import.meta.url);
const jobs=JSON.parse(await fs.readFile(jobsPath,"utf8"));
const sent=JSON.parse(await fs.readFile(sentPath,"utf8"));
const ranked=rankJobs(jobs);
const fresh=ranked.filter(j=>j.applyUrl&&!sent[j.applyUrl]).slice(0,30);
const date=new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",dateStyle:"full"}).format(new Date());

if(process.argv.includes("--dry-run")){
 console.table(fresh.map(j=>({score:j.finalScore,company:j.company,title:j.title,location:j.location,url:j.applyUrl})));
 process.exit(0);
}
if(!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
if(!process.env.EMAIL_FROM) throw new Error("Missing EMAIL_FROM");

const resend=new Resend(process.env.RESEND_API_KEY);
const {data,error}=await resend.emails.send({
 from:process.env.EMAIL_FROM,
 to:[process.env.EMAIL_TO||"abhishek.jaiswal.dev.1999@gmail.com"],
 subject:fresh.length?`SDE-2 Job Digest — ${fresh.length} new matches — ${date}`:`SDE-2 Job Digest — No new matches — ${date}`,
 html:renderEmail(fresh,date)
});
if(error) throw new Error(JSON.stringify(error));
console.log("Email sent:",data?.id);

for(const j of fresh) sent[j.applyUrl]={company:j.company,title:j.title,sentAt:new Date().toISOString()};
await fs.writeFile(sentPath,JSON.stringify(sent,null,2)+"\n");
