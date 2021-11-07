import React from 'react';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { v4 as uuid } from 'uuid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 5,
  border: '1px solid gray',
  boxShadow: 24,
  p: 4,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'blue',
    backgroundColor: 'red',
    backgroundColor: 'rgb(111,111,111)'
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




function App() {

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIsup("")
    setOpen(false)
  };
  const [text, setText] = useState(true)
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [isUp, setIsup] = useState("");
  const data = useSelector(state => state)
  const {users , ...rest} = data.users;


  function create() {
    if (isUp.length <= 0) {
      dispatch({ type: "CREATE", payload: { id: uuid(), firstname: fname, lastname: lname, age: age } });
      setOpen(false)
      setFname('');
      setLname('');
      setAge('');
      setText(true)
    } else {
      dispatch({ type: "UPDATE", payload: { id: isUp, data: { id: uuid(), firstname: fname, lastname: lname, age: age } } });
      setIsup("")
      setOpen(false)

    }
  }

  function deleteData(index) {
    // console.log(index);
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch({ type: "DELETE", payload: { id: index } });
    }
  }

  function editData(index) {
    setOpen(true)
    setText(false)
    var arr = data.users.users.filter((val) => val.id === index)
    console.log(index, arr[0].firstname);
    setFname(arr[0].firstname)
    setLname(arr[0].lastname)
    setAge(arr[0].age)
    setIsup(index)

  }

  return (
    <div className="App">
      <div>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
          <h1>CRUD</h1>
        <Button style={{width:'120px'}} variant='outlined' onClick={handleOpen}>Add User</Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h1">
              {text ? "Add user" : "Update User"}
            </Typography>
            <div >
              <TextField style={{ fontSize: 30, marginTop: 30,width:'100%' }} value={fname} onChange={(e) => setFname(e.target.value)} type="text" label="Firstname" /><br />
              <TextField style={{ fontSize: 30, marginTop: 20 ,width:'100%'}} value={lname} onChange={(e) => setLname(e.target.value)} type="text" label="Lastname" /><br />
              <TextField style={{ fontSize: 30 ,marginTop:20,width:'100%'}} value={age} onChange={(e) => setAge(e.target.value)} type="text" label="Age" /><br />
            </div>
           <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',marginTop:20}}>

           <Button variant='outlined' style={{marginRight:50}} onClick={()=>setOpen(false)}>cancel</Button>
           <Button variant='outlined' onClick={create}>{text ? "Add user" : "Update"}</Button>
           </div>
          </Box>
        </Modal>
      </div>
      {users.length !== 0 ? '' : 'no user'}
      <TableContainer style={{width:'77%',margin:'auto',display: users.length !== 0 ? "block" : 'none'}}  component={Paper}>
        <Table  sx={{ minWidth: 100 }} aria-label="customized table">
          <TableHead style={{ backgroundColor: 'blue' }}>
            <TableRow style={{backgroundColor:'blue'}}>
              <StyledTableCell>Firstname </StyledTableCell>
              <StyledTableCell align="right">Lastname</StyledTableCell>
              <StyledTableCell align="right">Age&nbsp;</StyledTableCell>
              <StyledTableCell align="right">Edit&nbsp;</StyledTableCell>
              <StyledTableCell align="right">Delete&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.firstname}
                </StyledTableCell>
                <StyledTableCell align="right">{row.lastname}</StyledTableCell>
                <StyledTableCell align="right">{row.age}</StyledTableCell>
                <StyledTableCell align="right"><Button style={{ borderRadius: '50%', width: 30, height: 60 }} onClick={() => editData(row.id)}><ModeEditIcon /></Button></StyledTableCell>
                <StyledTableCell align="right"><Button style={{ borderRadius: '50%', width: 30, height: 60 }} onClick={() => deleteData(row.id)}><DeleteIcon style={{ color: 'red' }} /></Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
