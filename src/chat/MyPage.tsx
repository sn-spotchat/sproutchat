import React, { FC, useEffect, useRef, useState} from 'react'
import {BrowserRouter as Router, Redirect, Route, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import './styles.css'
import Join from '../routes/Board/join';
import {items} from '../layouts/Main/SideBar/SideBar.js'

const MyPage: FC = (props) => {
    return(
        <div>Welcome! :)</div>
    )
}

export default MyPage