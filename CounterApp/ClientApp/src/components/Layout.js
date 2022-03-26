import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import "./Layout.css";

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>

            <div className="row">
                <div className="col-md-2">
                    <div className="sidebar px-4 py-4 py-md-4 me-0">
                        <div className="d-flex flex-column h-100">
                           

                            <ul className="menu-list flex-grow-1 mt-3">
                                <li>
                                    <i className="icofont-focus fs-5"></i>  <span><NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink> </span>
                                </li>

                              
                            </ul>

                            <button type="button" className="btn btn-link sidebar-mini-btn text-light">
                                <span className="ms-2"><i className="icofont-bubble-right"></i></span>
                            </button>
                        </div>
                    </div>

                </div>
                <div className="col-md-10 component-part">
                    {this.props.children}

                </div>

            </div>

      </div>
    );
  }
}
