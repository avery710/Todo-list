import React, { useState, useEffect, useRef } from "react"
import styled from 'styled-components'
import { Button, ButtonWrapper } from '../static/styles'
import { Link } from "react-router-dom";
import { collection, doc, addDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import { db } from '../firebase'

// to do list
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
`

const UpperWrapper = styled.div`
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgb(213, 216, 220);
    width: 100%;
    margin-bottom: 20px;
`

const Input = styled.input`
    padding: 10px;
    height: 40px;
    width: 200px;
    margin-right: 10px;
`

const Li = styled.li`
    width: 310px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-item: center;
    font-size: 16px;
    margin-bottom: 5px;
`

const DeleteButt = styled(Button)`
    width: 60px;
`

export default function TodoPage(){
    const [todos, setTodos] = useState([])

    // read data from firebase
    useEffect(() => {
        async function readDocs(){
            let newData = []
    
            const querySnapshot = await getDocs(collection(db, "tasks"))
            querySnapshot.forEach((doc) => {
                newData.push({key: doc.id, task: doc.data().task})
            })
    
            setTodos(newData)
        }

        readDocs()
    }, [])

    return (
        <Wrapper>
            <InputField todos={todos} setTodos={setTodos} />

            <Todolist todos={todos} setTodos={setTodos} />
            
            <ReturnButt />
        </Wrapper>
    );
}


function InputField({ todos, setTodos }){
    const [newTodo, setNewTodo] = useState("")
    const inputRef = useRef("")

    function handleAddTask(){
        const inputValue = inputRef.current.value

        if (inputValue === ""){
            return
        }

        console.log(inputValue)
        setNewTodo(inputValue)
        inputRef.current.value = ""
    }

    // add data to firestore
    useEffect(() => {
        async function addDB(){
            if (newTodo === ""){
                return
            }
            
            const data = {
                task: newTodo
            }
    
            const docRef = await addDoc(collection(db, "tasks"), data)
            setTodos([...todos, {key: docRef.id, task: newTodo}])
            console.log("Document written with ID: ", docRef.id)
        }

        addDB()
    }, [newTodo])

    return (
        <UpperWrapper>
            <Input type="text" ref={inputRef}/>
            <Button onClick={handleAddTask}>新增紀錄</Button>
        </UpperWrapper>
    )
}


function Todolist({ todos, setTodos }){
    const [deleteDocID, setDeleteDocID] = useState('')

    // delete data
    function handleDelete(id){
        setTodos(todos.filter(todo => todo.key !== id))
        setDeleteDocID(id)
    }

    useEffect(() => {
        async function deleteDB(){
            await deleteDoc(doc(db, "tasks", deleteDocID))
        }

        deleteDB()
    }, [todos])

    return (
        <ul>
            {todos.map(todo => {
                return (
                    <Li key={todo.key}>
                        {todo.task}
                        <DeleteButt onClick={() => handleDelete(todo.key)}>刪除</DeleteButt>
                    </Li>
                )
            })}
        </ul>
    )
}


function ReturnButt(){
    return (
        <ButtonWrapper>
            <Button>
                <Link style={{textDecoration: "none", color: "black"}} to="/">返回首頁</Link>
            </Button>
        </ButtonWrapper>
    )
}