import React from "react"
import styled from 'styled-components'
import { Button, ButtonWrapper } from '../static/styles'
import { Link } from "react-router-dom";
import { db } from "../firebase"

// index page
const WelcomePageSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
`

const HeaderSection = styled.h1`
    background-color: rgb(46, 64, 83);
    color: white;
    text-align: center;
    width: 100%;
    padding: 80px;
    margin: 0;
`

const WelcomeSection = styled.div`
    background-color: rgb(254, 245, 231);
    text-align: center;
    padding: 60px;
    width: 100%;
    font-size: 20px;
`

export default function WelcomePage(){
    return (
        <WelcomePageSection>
            <Header />
            <Welcome />
            <PageToggleButt />
        </WelcomePageSection>
    );
}

function Header(){
    return (
        <HeaderSection>React 練習專案</HeaderSection>
    )
}

function Welcome(){
    return (
        <WelcomeSection>歡迎光臨我的頁面</WelcomeSection>
    )
}

function PageToggleButt(){
    return(
        <ButtonWrapper>
            <Button>
                <Link style={{textDecoration: "none", color: "black"}} to="todo-list">點此開始</Link>
            </Button>
        </ButtonWrapper>
    )
}