const db = require("../config/db");

// Get all students list
const getStudents = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM students");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      success: true,
      totalStudents: data[0].length,
      message: "All student records",
      data
    });
  } catch (error) {
    console.log("Error in getStudents API:", error);
    res.status(500).send({
      success: false,
      message: "Error in getting all student records",
      error
    });
  }
};

//get student by ID
const getStudentById = async(req, res) =>{
   try{
    const studentId = req.params.id;
    if(!studentId){
      return res.status(404).send({
        success: false,
        message:'Invalid or Provide Student ID'
      })
    }
    const [data] = await db.query(`SELECT * from students where id=?`,[ studentId, ]);
    if(!data){
      return res.status(404).send({
        success: false,
        message: "No Record Found"
      })
    }
    res.status(200).send({
      success: true,
      studentDeatils: data,
    })
   }catch(error){
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Get student by Id API",
        error
      })
   }
}

//create Student
const createStudent = async(req,res) => {
   try {
    const {name, roll_no, fees, medium, std} = req.body
    if(!name || !roll_no || !medium || !fees || !std ){
       return res.stats(500).send({
        success: false,
        message: "Please Provide all Fields"
       })
    }
    const data = await db.query(`INSERT INTO students (name, roll_no, fees,medium, std) Values (?,?,?,?,?)`, [name, roll_no, fees,medium, std]);
      if(!data){
        return res.stats(404).send({
          success: false,
          message: "Error in SQL query"
        })
      }
      res.status(201).send({
        sucess: true,
        message:'New Student Record Created',
      })
   } catch (error) {
     console.log(error);
     res.status(500).send({
      success: false,
      message: "Error in Create Student ApI",
      error
     })
   }
}

//Update Student
const updateStudent = async(req,res) => {
    try{
      const studentId = req.params.id;
      if(!studentId){
        return res.status(404).send({
          success:false,
          message: "Invaild Id or Provid Id"
        })
      }
      const {name, roll_no, fees,std,medium} = req.body
      const data = await db.query(`UPDATE students SET name=?, roll_no=?, fees=?, std=?, medium=? where id=?`, [name, roll_no, fees, std, medium, studentId])
      if(!data){
        return res.status(500).send({
          success: false,
          message: "Error in Update Data"
        })
      }
      res.status(200).send({
        success: true,
        message: "Student Details Updated Successfully"
      })
    }catch(error){
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Update Student API",
        error
      })
    }
}

//Delete Student 
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    if (!studentId) {
      return res.status(400).send({
        success: false,
        message: "Invalid or missing student ID",
      });
    }

    const [data] = await db.query("DELETE FROM students WHERE id = ?", [studentId]);

    if (data.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteStudent API:", error);
    res.status(500).send({
      success: false,
      message: "Error in delete API",
      error: error.message,
    });
  }
};

module.exports = { getStudents,getStudentById,createStudent,updateStudent,deleteStudent };
