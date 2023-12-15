import express from "express";

import { Book } from "../models/bookModel.js";

const router = express.Router();


//Route for saving a new book
router.post('/',async (req,res)=>{
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
            res.status(400).send({message:"Please send all the required fields i.e., title,author,and publishedYear"});
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        }

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    }catch(error){
        console.log("There was some type of error while saving your book",error);
        res.status(500).send({message:error.message});
    }
})

//Route to get all the books in the database
router.get('/',async (req,res)=>{
    try{
        const books = await Book.find({});

        return res.status(200).json(books);
    }catch(error){
        console.log("There was some type of error while saving your book",error);
        res.status(500).send({message:error.message});
    }
});

//Route to get one of the books in the database
router.get('/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book);
    }catch(error){
        console.log("There was some type of error while saving your book",error);
        res.status(500).send({message:error.message});
    }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      const { id } = request.params;
  
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

//Route to delete a book
router.delete('/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message:"Couldn' find the book you are trying to delete"})
        }

        return res.status(200).send({message:"Deleted the specified successfully"});
    }catch(error){
        console.log("There was some type of error while saving your book",error);
        res.status(500).send({message:error.message});
    }
});

export default router;