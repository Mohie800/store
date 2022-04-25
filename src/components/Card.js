import React from "react";

const Card = (props) => {
    return (
        <div className="card animate__animated animate__backInUp animate__animated" >
            <div className="image">
                <img src={props.url} />
            </div>
            <div className="content">
                <div className="header">{props.name}</div>
                <div className="description">Price : {props.price} SDG</div>
            </div>
            <div className="extra content" >
                {props.renderAmount}
                {props.renderCartButton}<br/>
                {props.renderAdmin}
            </div>
        </div>
    )
}

export default Card;