const personController = require('../controller/personController');
const express = require('express');
const router = express.Router();

router.get('/getpersons', async (req, res) => {
    try {
      const persons = await personController.getALLPerson();
      res.json(persons);
    } catch (error) {
      console.error('Error fetching persons:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });




router.get('/getperson/:id', async(req,res) => {
  const person_id = req.params.id ; 
  try{
    const person = await personController.getPerson(person_id);
    res.json(person);
  }catch(error){
    console.log("Error when getting specific person",error)
    res.status(500).json({error:"Internal server error"})
  }
})





router.post('/addperson',async(req,res)=>{
    const {name,age,email,phone_number} = req.body
    try{
        if(!name || !age || !email || !phone_number ){
            throw new Error("required")
        }
        const persons = await personController.createPerson(name,age,email,phone_number);
        res.sendStatus(201);
    }
    catch(error){
        console.log('Error at creating person' ,error)
        res.status(500).json({error:'Internal server error'})
    }
})




router.patch('/updateperson', async(req,res)=>{
  const {person_id,name,age,email,phone_number} = req.body;
  try{
    const person = await personController.updatePerson(person_id,name,age,email,phone_number);
    res.status(200).json(person);
  }
  catch(error){
    console.error('Error at updating person' ,error)
    res.status(500).json({error:'Internal server error'})
  }
})




router.delete('/deleteperson/:id', async(req,res) =>{
  const person_id = req.params.id;
  try{
    const person = await personController.deletePerson(person_id);
    res.status(200).json(person);
  }
  catch(error){
    console.error("Error arrive when deleting person",error);
    res.status(500).json({error: "Internal server error"})
  }
})



module.exports = router;
