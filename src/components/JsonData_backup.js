import React, {useState} from 'react'
import { Form, Button} from 'react-bootstrap'
import axios from 'axios'


function JasonData() {
    const [data, setData]= useState('')
    const [newdata, setNewdata] = useState('')
    // const [url, setUrl] = useState('')
    
    const handleChange= (e) =>{
        e.preventDefault()
        let url = e.target.value
        console.log(url)
        // const config = {
        //     url,
        //     headers: {
        //      'Access-Control-Allow-Origin' : '*',
        //      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //      }
        //  }
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        axios.get(url, config)
            .then((data) =>{
                let JasonData = (JSON.parse(data)).payload;
                console.log(JasonData)
            })
            .catch(e) 
            

        // let JasonData
        // try {
        //     JasonData = (JSON.parse(value)).payload;
        // } catch(e) {
        //     console.log(e)
        //     return e
            
        // }
        console.log(JasonData)
        let newData = JasonData.filter(item => {
            return item.drm && item.episodeCount >0
        }) 
        setData(newData)
        console.log(newData)                
        
    }
    const transformObject = () => {
        let newArray = []
        if (data && typeof data === 'object') {
            
            data.map((item, index) =>{
                newArray[index] = {
                    "image": item.image.showImage,
                    "slug": item.slug,
                    "title": item.title
                }
            })
        };
        console.log(newArray)
        let newJason= JSON.stringify({respones:newArray},null,"\t")
        setNewdata(newJason)
        console.log(JSON.parse(newJason))
     };

    const handleSubmit=(e)=>{
        e.preventDefault()
        transformObject()
        // console.log('submit')
        // let jasonformat = JSON.stringify(data)
        // console.log(jasonformat)
    }
    return (
        <div>
            
            <h1 >JSON Data Filter</h1>
            <p>How to use:</p>
            <li>Step1: Copy JSON data to "Input JSON data"</li>
            <li>Step2: Click filter button</li>
            <li>Step3: Get the result from the "JSON data output"</li>
       
            <Form >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className='formLabel'>URL</Form.Label>
                    <Form.Control type="text" onChange={handleChange}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Form>
                
                <Form.Group controlId="OldJSON">
                    <Form.Label className='formLabel'>Form JSON Data</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={10} 
                        type='text'
                        defaultValue={data}/>
                </Form.Group>
    
                <Button variant="primary" type="submit" onClick={handleSubmit}> 
                    Filter
                </Button>
             
                <Form.Group controlId="NewJSON">
                    <Form.Label className='formLabel'>JSON data output</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={10} 
                        type='text'
                        defaultValue={newdata}/>
        
                </Form.Group>
           
      
                
        </Form>     

        </div>
        
    )
}

export default JasonData
