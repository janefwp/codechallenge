import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios, { post } from 'axios';

function JasonData() {

    const [file, setFile] = useState('')

    
    const onChange=(e) =>{
        setFile({file:e.target.files[0]})
    }
    const fileUpload=(file)=>{
        // const url = '../../../public/';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  axios.post("api/uploadfile", formData,config)
    }
    const onFormSubmit=(e) =>{
        e.preventDefault() // Stop form submit
        fileUpload(file).then((response)=>{
          console.log(response.data);
        })
    }


    return (
        <div>
            <form onSubmit={onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" onChange={onChange} />
            <button type="submit">Upload</button>
            </form>

        </div >

        
         
       
    )
}

export default JasonData
