const TECH=["react native","react","typescript","javascript","next.js","nextjs","frontend","front-end","mobile","expo","redux","zustand","tanstack","performance","architecture"];
const TITLES=["sde ii","sde-2","sde 2","software development engineer ii","software development engineer 2","frontend engineer","front-end engineer","senior frontend engineer","react native engineer","react developer","mobile engineer"];
const EXCLUDE=["qa","sdet","test engineer","android developer","ios developer","staff","principal","director","engineering manager","vp"];
const LOC=[["bangalore",20],["bengaluru",20],["india",10],["remote",5]];

const text=j=>[j.title,j.description,j.location,...(j.technologies||[])].filter(Boolean).join(" ").toLowerCase();

export function scoreJob(j){
  const h=text(j), t=String(j.title||"").toLowerCase();
  let s=Number.isFinite(j.matchScore)?j.matchScore:0;
  for(const k of TECH) if(h.includes(k)) s+=2;
  for(const k of TITLES) if(t.includes(k)) s+=8;
  for(const [k,p] of LOC) if(String(j.location||"").toLowerCase().includes(k)){s+=p;break;}
  for(const k of EXCLUDE) if(t.includes(k)) s-=50;
  return Math.max(0,Math.min(100,Math.round(s)));
}
export const rankJobs=jobs=>jobs.map(j=>({...j,finalScore:scoreJob(j)})).sort((a,b)=>b.finalScore-a.finalScore);
