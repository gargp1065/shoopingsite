import React, { Component } from 'react'

import {connect} from 'react-redux'
import axios from 'axios'
import Card from './Card'

class ViewAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: []
        }
    }
    componentDidMount (){ 
        console.log(this.props);
        axios.get(`http://localhost:8080/api/users/getaddress?email=${this.props.auth.user.email}`)
        .then((res) => {
            if(!res) {
                alert("User Not Found");
            }
            else {
                this.setState({
                    address: res.data
                })
            }
        })
    }
    render() {
        console.log(this.state.address);

        return (
            <div className="container" style={{
                marginTop: "100px"
            }}>
                <div style={{
                    textAlign: "center"
                }}>
                    <h3>List of Addresses</h3>
                </div>
                <div className="row " style={{
                    marginTop: "50px",
                    display: "flex",
                    flexWrap: "wrap"
                }}>
                    {
                        
                        this.state.address.map( (add) => {
                            return (
                                    <Card address={add}/>
                            )
                        })
                    }     
                </div>           
            </div>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(ViewAddress)