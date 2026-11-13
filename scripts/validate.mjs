import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const registry=JSON.parse(fs.readFileSync(path.join(root,'registry.json'),'utf8'));
const errors=[];
const datasetIds=new Set();
for(const ds of registry.datasets){
 if(datasetIds.has(ds.id))errors.push('duplicate dataset id: '+ds.id);datasetIds.add(ds.id);
 const file=path.join(root,ds.path);
 if(!fs.existsSync(file)){errors.push('missing dataset: '+ds.path);continue;}
 if(ds.format!=='json')continue;
 let data;try{data=JSON.parse(fs.readFileSync(file,'utf8'));}catch(e){errors.push('invalid JSON '+ds.path+': '+e.message);continue;}
 let rows=Array.isArray(data)?data:(data.questions||data.resources||data.topicRecords||data.quotes||[]);
 if(ds.id==='knowledge-base')rows=[...(data.topicRecords||[]),...(data.authoredModules||[])];
 if(ds.id==='motivation-200')rows=(data.groups||[]).flatMap(g=>Array.isArray(g[2])?g[2]:[]);
 const seen=new Set();
 for(const [i,q] of rows.entries()){
  if(q&&typeof q==='object'&&q.id){if(seen.has(q.id))errors.push('duplicate record id '+q.id+' in '+ds.path);seen.add(q.id);}
  if(q&&typeof q==='object'&&'prompt'in q){
   if(!q.prompt||!Array.isArray(q.options)||q.options.length<2)errors.push('invalid question shape '+ds.path+'['+i+']');
   if(!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.options.length)errors.push('invalid correct index '+ds.path+'['+i+']');
  }
 }
 if(ds.recordCount!==null&&rows.length!==ds.recordCount)errors.push('record count mismatch '+ds.id+': manifest '+ds.recordCount+', actual '+rows.length);
 console.log(ds.id+': '+rows.length+' records OK');
}
if(errors.length){console.error(errors.join('\\n'));process.exit(1);}
console.log('Registry validation passed: '+registry.datasets.length+' datasets.');
