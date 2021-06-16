import React from 'react';
import { Link, withRouter } from "react-router-dom";

class UserListElement extends React.Component {
	
	render = () => {
		return (
			<li style={liStyle}>
				<Link to={(this.props.creator) ? `#` : "#"} style={linkStyle}>
					{
						this.props.reg.email
					}
				</Link>
			</li>
		);
	};
}

const liStyle = {
	width: "1280px",
	height: "auto",
	margin: "auto",
	padding: "20px 10px",
	boxSizing: "border-box",
	display: "block",
	position: "relative",
	marginBottom: "20px",
	background:
		"linear-gradient(45deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.79) 7%, rgba(48, 48, 48, 0.79) 93%, rgba(153, 0, 255, 0.6) 100%)",
	borderRadius: "48px",
	color: "white",
	lineSpacing: "30px",
	fontSize: "1.3rem"
};

const linkStyle = {
	textDecoration: "none",
	color: "white"
};

export default withRouter(UserListElement);