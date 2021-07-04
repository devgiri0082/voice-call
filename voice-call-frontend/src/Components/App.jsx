import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import styled from "styled-components";

let Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: rgb(31, 38, 57);
    display: flex;
    flex-direction: column;
    padding: 30px;
    align-items: center;
    gap: 20px;
    .title {
        color: white;
    }
`
let Users = styled.div`
    width: 200px;
    border: 1px solid white;
    color: white;
    padding: 10px;
    padding-right: 40px;
`
const socket = socketIOClient('http://localhost:8080')

const App = () => {
    const [users, setUsers] = useState({});
    const [name, setName] = useState("");
    let gettingName = async () => {
        let myName = await prompt("Enter your name? ");
        setName(myName);
        handleSocket(myName);

    }
    useEffect(() => {
        gettingName();
        socket.on("names", (data) => {
            console.log(data, "getting data");
            console.log(Object.values(data.users))
            setUsers(data)
        });
    }, []);
    // useEffect(() => {
    //     socket.on(channel, (data) => {
    //         setMessage(data);
    //     })
    // }, [channel])

    const handleSocket = (myName) => {
        console.log(myName);
        // socket.open()
        console.log("connecting");
        socket.on('connect', () => {
            socket.emit("addName", myName);
            console.log("connected");
        });
    }
    return (
        <Container>
            <h2 className="title">Walkie Talkie</h2>
            <Users>
                <div className="title">User Online</div>
                {
                    Object.values(users.users).length !== 0 && Object.values(users.users).map((elem, index) => {
                        console.log(elem)
                        return <div className="elem">{elem}</div>
                    })}
            </Users>
        </Container>
    )
}

export default App