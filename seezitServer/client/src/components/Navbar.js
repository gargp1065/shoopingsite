import React , {Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from '../actions/authAction'
class Navbar extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    }

    // componentDidMount() {
    //     if(this.props.auth.isAuthenticated) {
    //         this.props.history.push("/dashboard");
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     console.log(this.props.auth.isAuthenticated);
    //     if(nextProps.auth.isAuthenticated) {
    //         this.props.history.push("/dashboard");
    //     }
    // }
    render() {
        let url ;
        if(this.props.auth.isAuthenticated) {
            url="/dashboard"
        } 
        else {
            url="/"
        }
        let b;
        if(this.props.auth.isAuthenticated) {
            b = <a className="waves-effect waves-light btn" href="#" onClick={this.onLogoutClick}>Logout</a>
        }
        else b = <div></div>
        return (
            <div className="navbar-fixed">
                <nav className="z-depth-0">
                    <div className="nav-wrapper-white">
                        <Link to={url}
                            style={ {
                                fontFamily: "monospace"
                            }}
                            className="col s5 brand-logo center black-text">
                            <i className="material-icons">cart</i>
                            Shopping Site
                        </Link>
                        <ul id="nav-mobile" className="right">
                            <li>{b}</li>
                        </ul>       
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(Navbar)