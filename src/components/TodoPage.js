import React, { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { Button, ButtonWrapper } from '../static/styles'

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

export default function TodoPage({ setIndex }){
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    
    function handleToggle(){
        setIndex("welcome")
    }

    function handleAddTask(e){
        e.preventDefault()
        setTodos([...todos, {key: uuidv4(), task: newTodo}])
        setNewTodo('')
    }

    return (
        <Wrapper>
            <UpperWrapper>
                <Input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)}/>
                <Button onClick={handleAddTask}>新增紀錄</Button>
            </UpperWrapper>

            <Todolist todos={todos} setTodos={setTodos} />

            <ButtonWrapper>
                <Button onClick={handleToggle}>返回首頁</Button>
            </ButtonWrapper>
        </Wrapper>
    );
}

function Todolist({ todos, setTodos }){
    function handleDelete(id){
        setTodos(todos.filter(todo => todo.key !== id))
    }

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