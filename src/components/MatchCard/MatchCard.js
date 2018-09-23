import React from "react";
import "./MatchCards.css";

const MatchCard = props => (

	<div onClick={() => props.setClicked(props.id)} className="img-container col-s4 col-m3">
		<img alt={props.name} src={props.image} />
	</div>

);

export default MatchCard;
