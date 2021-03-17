import React, {useState, useEffect} from 'react'
import { Form, Button, Alert} from 'react-bootstrap'


function JsonData() {
    // const [input, setInput] =useState('')
    const [data, setData]= useState('')
    const [newdata, setNewdata] = useState('')
    const [errorstate, setErrorstate] =useState(false)
    const [errorstring, setErrorstring] = useState('')
    
    // useEffect(() => {
    //     transformObject()
    // }, [input, filterdata, newdata])

    const handleChange= (e) => {
        e.preventDefault()
        let value = e.target.value
        if(value) {
            try {
                let JasonData =(JSON.parse(value)).payload;
                console.log(JasonData)
                let filterData = JasonData.filter(item => {
                return item.drm && item.episodeCount >0
                }) 
                
                setData(filterData)
                
                setErrorstate(false)     
            } catch(e) {
                let errormsg = {   
                        "error": "Could not decode request: JSON parsing failed",
                        "code": 400,
                        "message": "Bad Request"
                }
                setErrorstate(true)
                let string = JSON.stringify(errormsg,null,"\t")
                setErrorstring(string)
            }
        } else {
            setErrorstate(false)
        }            
    
        
    }

    const handleFilter=(e)=>{
        e.preventDefault()          
        transformObject()

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

        let newJason= JSON.stringify({respones:newArray},null,"\t")
        setNewdata(newJason)

     };


    return (
        <div>
            
            <h1 >JSON Data Filter</h1>
            <p>How to use:</p>
            <div >
                <li >Step1: Copy JSON data to "Input JSON data"</li>
                <li >Step2: Click filter button</li>
                <li>Step3: Get the result from the "JSON data output"</li>
            </div>            
       
            <Form>
                <Form.Group controlId="OldJSON">
                    <Form.Label className='formLabel'>Input JSON data</Form.Label>
                    <Form.Control as="textarea" rows={10} cols={50} onChange={handleChange} className='formControl'/>
                </Form.Group>
                {errorstate && <Alert variant='danger'>{errorstring}</Alert> }
                <Button variant="primary" type="submit" onClick={handleFilter}> 
                    Filter
                </Button>

                <Form.Group controlId="NewJSON">
                    <Form.Label className='formLabel'>JSON data output</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={10} 
                        cols={10}
                        type='text'
                        value ={newdata}
                        >
                        </Form.Control>
        
                </Form.Group>
                
      
                
        </Form>     

        </div>
        
    )
}

export default JsonData
