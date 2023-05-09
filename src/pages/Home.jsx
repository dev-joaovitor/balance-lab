import React, { Component } from 'react'
import './Home.css';
import { Link } from 'react-router-dom';


export default class Home extends Component {
    componentDidMount() {
        document.body.classList.add('home-page');
      }
      
      componentWillUnmount() {
        document.body.classList.remove('home-page');
      }

    render() {
        return (
            <>
                <h1>Home Page</h1>
                <Link to="/table">Tables</Link>
            </>
        )
    }
}