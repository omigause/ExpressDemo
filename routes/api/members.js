const express=require('express');
const router=express.Router();
const uuid=require('uuid');
const members=require('../../Members');
const cors=require('cors');


//Gets All Members
router.get('/',cors(),(req,res)=>res.json(members));

//Get Single Member
router.get('/:id',cors(),(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));
    if(found){
    res.json(members.filter(member=>member.id===parseInt(req.params.id)));
    }else{
        res.status(400).json({msg:`No member with the id of ${req.params.id}`});
    }
});

//Creat Member
router.post('/',cors(),(req,res)=>{
   const newMember={
       id:uuid.v4(),
       text:req.body.text,
       day:req.body.day,
       reminder:req.body.reminder
   };

   if(!newMember.name || !newMember.email){
       return res.status(400).json({msg:'Please included a text and day'});
   }
   members.push(newMember);
   res.json(members);
   //res.redirect('/');
});

//Update Member
router.put('/:id',cors(),(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));
    if(found){
       const upMember=req.body;
       members.forEach(member=>{
           if(member.id===parseInt(req.params.id)){
               member.name=upMember.name ? upMember.name: member.name;
               member.email=upMember.email ? upMember.email: member.email;

               res.json({msg:'Member updated',member});
           }
       })
    }else{
        res.status(400).json({msg:`No member with the id of ${req.params.id}`});
    }
});

//Delete Member
router.delete('/:id',cors(),(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));
    if(found){
      res.json({msg:'Member deleted',
      members:members.filter(member=>member.id!==parseInt(req.params.id))
    });
    }else{
        res.status(400).json({msg:`No member with the id of ${req.params.id}`});
    }
});

module.exports=router;