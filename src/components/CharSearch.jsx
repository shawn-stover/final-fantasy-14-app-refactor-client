// Imports
import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import '../App.css'

const Inputs = styled.input `
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 450px;
    height: 30px;
    margin-top: 30px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    padding-left: 5px;
`

const SearchB = styled.input `
    height: 38px;
    width: 150px;
    background: #1B6625;
    color: #ffffff;
    font-family: Poppins;
    font-size: 18px;
    font-weight: 900;
    border-radius: 10px;
    margin-bottom: 40px;
    border: 0;
`

export default function CharSearch(props) {
    // State for the controlled form
    const [name, setName] = useState('')
    const [server, setServer] = useState('')
    const [jobs, setJobs] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log('do axios call')
            // Post to the backend with axios
            const requestBody = {
                name: name,
                server: server
            }

            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/chars/results`, requestBody)
            console.log(response)
        } catch (err) {
            if(err.response.status === 400) {
                console.log(err)
            } else {
                console.log(err)
            }
        }
    }

    return (
        <div className="secondborder">
            <div className="borderedpicture4">
                <form onSubmit={handleSubmit}>
                    <label htmlFor={'name-input'}></label>
                    <Inputs
                        id='name-input'
                        type='name'
                        placeholder='Character name'
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />

                    <label htmlFor={'server-input'}></label>
                    <Inputs
                        id='server-input'
                        type='text'
                        placeholder='Server Name'
                        onChange={e => setServer(e.target.value)}
                        value={server}
                    />

                    <SearchB
                        type='submit'
                        value='Search Character'
                    />
                </form>    
            </div>
        </div>    
    )
}