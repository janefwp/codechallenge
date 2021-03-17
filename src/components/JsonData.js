import React, {useState, useEffect} from 'react'
import { Form, Button, Alert, Navbar, Container,Row, Col, ListGroup} from 'react-bootstrap'


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
        <div className='div'>
            <header>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    JSON Data Filter
                </Navbar.Brand>
            </Navbar>
            </header>
            <h5 className='h5'>How to use:</h5>
                <ul className='ul'>
                <li >Step1: Paste JSON data into "Input JSON data"</li>
                <li >Step2: Click Filter button</li>
                <li >Step3: Get the result from the "JSON data output"</li>
                </ul>

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
                        className='formcontrol' 
                        as="textarea" 
                        rows={10} 
                        cols={10}
                        type='text'
                        value ={newdata}
                        >
                        </Form.Control>
        
                </Form.Group>
                
        </Form>     

        <footer>
            <Container>
                <Row>
                    <Col className ="text-center py-3"> Copyright &copy; Jing
                    </Col>
                </Row>
            </Container>
        </footer>

        </div>
        
    )
}

export default JsonData
