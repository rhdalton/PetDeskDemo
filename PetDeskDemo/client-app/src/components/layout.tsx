import React, { Component } from 'react';
import AppointmentDashboard from './dashboard';
import Navbar from './navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from '../AppRoutes';

export default class Layout extends Component<any, any> {
  static displayName = Layout.name;
  
  render() {
    return (
      <div>
        <Navbar />
        <AppointmentDashboard>
          <BrowserRouter>
            <Routes>
              {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} {...rest} element={element} />;
              })}
            </Routes>
          </BrowserRouter>
        </AppointmentDashboard>      
      </div>
    )
  }
}
