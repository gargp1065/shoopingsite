import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { addAddress } from '../actions/authAction'
import {connect} from 'react-redux'

class AddAddress extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            line1: '',
            line2: '',
            city: '',
            landmark: '',
            state: '',
            country: '',
            pincode: '',
        }
    }

    onSubmit = (e) => {
        console.log(this.props);
        e.preventDefault();
        const newAddress = {
            line1: this.state.line1,
            line2: this.state.line2,
            landmark: this.state.landmark,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            pincode: this.state.pincode,
            email: this.props.auth.user.email
        }
        
        console.log(newAddress);
        console.log(this.props.history);
        this.props.addAddress(newAddress, this.props.history);
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div style={{
                        textAlign: "center"
                    }}>
                        <h4>
                            <b>Add Address</b>
                        </h4>
                    </div>
                    <div className="col s8 offset-s2">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    type="text"
                                    id="line1"
                                    onChange={this.onChange}
                                    value={this.state.line1}
                                    // error={errors.line1}
                                />
                                <label htmlFor="line1">Line 1</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    type="text"
                                    id="line2"
                                    onChange={this.onChange}
                                    value={this.state.line2}
                                    // error={errors.line2}
                                />
                                <label htmlFor="line2">Line 2</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    type="text"
                                    id="landmark"
                                    onChange={this.onChange}
                                    value={this.state.landmark}
                                    // error={errors.landmark}
                                />
                                <label htmlFor="landmark">Landmark</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    type="text"
                                    id="city"
                                    onChange={this.onChange}
                                    value={this.state.city}
                                    // error={errors.city}
                                />
                                <label htmlFor="city">City</label>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    type="text"
                                    id="state"
                                    onChange={this.onChange}
                                    value={this.state.state}
                                    // error={errors.state}
                                />
                                <label htmlFor="state">State</label>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    type="text"
                                    id="country"
                                    onChange={this.onChange}
                                    value={this.state.country}
                                    // error={errors.country}
                                />
                                <label htmlFor="country">Country</label>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    type="text"
                                    id="pincode"
                                    onChange={this.onChange}
                                    value={this.state.pincode}
                                    // error={errors.   pincode}
                                />
                                <label htmlFor="pincode">Pincode</label>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {addAddress})(withRouter(AddAddress));