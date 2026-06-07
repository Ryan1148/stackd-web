import fs from 'fs'
import path from 'path'
import process from 'process'
import Fuse from 'fuse.js'

const filePath = path.join(
    process.cwd(),
    'stackd.exercises.json'
)

const data = JSON.parse(
    fs.readFileSync(filePath,'utf-8')
)

const fuse = new Fuse(data,{
    keys:[
        {name:'name',weight:0.7},
        {name:'primaryMuscles',weight:0.3},
    ],
    threshold:0.3,
    ignoreLocation:false,
    minMatchCharLength:3,
    includeScore:true
})

export default function handler(req,res){
    const q = req.query.q
    if(!q) return res.json([])
    const results = fuse.search(q)
    res.json((results.map(result => result.item)).slice(0,20))
}