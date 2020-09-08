import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomButton from "components/CustomButtons/Button.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import FormAPI from "components/FormAPI/FormAPI.js";
// reactstrap
import { Collapse } from 'reactstrap';
// redux
import { connect } from 'react-redux';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
// documents data
import APIs from '../../variables/APIs';

const useStyles = makeStyles(styles);

function Documentation(props) {
	const classes = useStyles();

	// detect color for each method
	const methodColor = (method) => {
		;
		switch (method) {
			case "GET":
				return "success";
			case "PUT":
				return "blue";
			case "DELETE":
				return "danger";
			case "POST":
				return "warning";
			default:
				return "white";
		}
	};

	// API List
	const APIList = APIs.map((api, index) => {
		return (<div>
			<CustomButton color={methodColor(api.method)} id={api.id}>{api.name}</CustomButton>
			<br></br>
		</div>);
	});

	// Show all APIs
	const showAPIs = APIs.map((api, index) => {
		return (
			<FormAPI
				color={methodColor(api.method)}
				APIdata={api}
			></FormAPI>
		);
	});

	if (!props.isLogin) return <Redirect to="/login" />
	return (
		<GridContainer>
			<GridItem xs={12} sm={6} md={3}>
				<div>{APIList}</div>
			</GridItem>
			<GridItem xs={12} sm={6} md={9}>
				{showAPIs}
			</GridItem>
		</GridContainer>
	);
}

const mapState = state => ({
	isLogin: state.isLogin,
});

const mapDispatch = dispatch => ({
	setLogin: (login) => {
		dispatch({ type: "SET_LOGIN", login })
	}
});

export default connect(mapState, mapDispatch)(Documentation)