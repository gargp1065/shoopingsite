import React, { Component } from 'react'

class Card extends Component {

    render() {
        return (
            <div style={{
                width: "30%",
                border: "1px solid black",
                // paddingLeft: "10px",
                margin: "10px",
                lineHeight: "0.7",
                fontSize: "20px",
                padding: "25px"
            }}>
                <div className="card-horizontal ">
                    <div className="card-stacked">
                        <div className="card-content">
                            <b>
                            <p>{this.props.address.line1}</p>
                            <p>{this.props.address.line2}, {this.props.address.landmark}</p>
                            <p>{this.props.address.city}, {this.props.address.state}   {this.props.address.pincode}</p>
                            <p>{this.props.address.country}</p>
                            </b>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Card