/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

export default class Navbar extends Component {
  static displayName = Navbar.name;

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className='container'>
        <a className="navbar-brand" href="/">PetDeskDemo</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/*
            <li className="nav-item active">
              <a className="nav-link" href="/">Dashboard Home</a>
            </li>
          */}
          </ul>
          </div>
        </div>
      </nav>
    )
  }
}
