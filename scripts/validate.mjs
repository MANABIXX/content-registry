import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const registry = JSON.parse(fs.readFileSync(path.join(root,'registry.json'),'utf8'));
const errors=[];
for(const ds of registry.datasets){const file=path.join(root,ds.path);if(!fs.existsSync(file)){errors.push(`missing ${ds.path}`);continue;}if(ds.format!=='json')continue;let data;try{data=JSON.parse(fs.readFileSync(file,'utf8'));}catch(e){errors.push(`invalid JSON ${ds.path}: ${e.message}`);continue;}const rows=Array.isArray(data)?data:(data.questions||data.resources||[]);const seen=new Set();for(const [i,q] of rows.entries()){if(q.id){if(seen.has(q.id))errors.push(`duplicate id ${q.id} in ${ds.path}`);seen.add(q.id);}if('prompt'in q&&(!q.prompt||!Array.isArray(q.options)||q.options.length<2||!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.options.length))errors.push(`invalid question ${ds.path}[${i}]`);}console.log(`${ds.id}: ${rows.length}`);}if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log(`Registry OK: ${registry.datasets.length} datasets`);
