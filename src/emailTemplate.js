const esc=v=>String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
export function renderEmail(jobs,date){
 const cards=jobs.map(j=>`<div style="border:1px solid #e5e7eb;border-radius:12px;padding:18px;margin:0 0 14px;background:#fff">
 <div style="font-size:12px;font-weight:700">${esc(j.company)} · ${j.finalScore}% MATCH</div>
 <h2 style="font-size:18px;margin:7px 0">${esc(j.title)}</h2>
 <div style="color:#4b5563;font-size:14px">${esc(j.location||"Location not specified")}${j.workMode?` · ${esc(j.workMode)}`:""}${j.experience?` · ${esc(j.experience)}`:""}</div>
 <div style="font-size:13px;color:#374151;margin:10px 0">${(j.technologies||[]).map(esc).join(" · ")}</div>
 ${j.description?`<p style="font-size:14px;line-height:1.5;color:#374151">${esc(j.description)}</p>`:""}
 <a href="${esc(j.applyUrl)}" style="display:inline-block;padding:9px 14px;border-radius:8px;background:#111827;color:#fff;text-decoration:none;font-size:13px;font-weight:600">Apply</a>
 </div>`).join("");
 return `<!doctype html><html><body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;color:#111827"><div style="max-width:720px;margin:auto;padding:28px 16px"><div style="margin-bottom:20px"><div style="font-size:12px;font-weight:700;letter-spacing:.08em;color:#6b7280">DAILY SDE-2 JOB DIGEST</div><h1 style="font-size:26px;margin:6px 0">React / React Native / Frontend</h1><p style="color:#6b7280">${esc(date)} · ${jobs.length} new matching jobs</p></div>${cards||'<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px">No new matching jobs today.</div>'}</div></body></html>`;
}
