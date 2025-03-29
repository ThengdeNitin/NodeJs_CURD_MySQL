const express = require('express');
const { getStudents, getStudentById, createStudent, updateStudent,deleteStudent } = require('../controllers/studentController');

//router object 
const router = express.Router();

//routes

//get all student list
router.get('/getall',getStudents);

//Get Stuent By ID
router.get('/get/:id', getStudentById);

//Create Student
router.post('/create', createStudent);

//Update Student 
router.put('/update/:id', updateStudent);

//Delete Student 
router.delete('/delete/:id', deleteStudent);

module.exports = router