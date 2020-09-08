import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap
import { UncontrolledCollapse } from 'reactstrap';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/components/buttonStyle.js";

const useStyles = makeStyles(styles);

export default function FormAPI(props) {
	const classes = useStyles();
	const {
		color,
		round,
		children,
		disabled,
		simple,
		size,
		block,
		link,
		justIcon,
		className,
		muiClasses,
		APIdata,
		...rest
	} = props;

	const mappingObjectHandler = (data) => {
		const result = Object.entries(data).map(([key, value]) => {
			if (typeof(value) === "object") {
				const rs = Object.entries(value).map(([k, vl]) => {
					return (
						<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{k}: "{vl}",</div>
					);
				});
				return (
					<div>&nbsp;&nbsp;&nbsp;&nbsp;{key}: {"{"}
						&nbsp;&nbsp;&nbsp;&nbsp;{rs} 
						&nbsp;&nbsp;&nbsp;&nbsp;{"}"}
					</div>
				);
			} else {
				return (
					<div>&nbsp;&nbsp;&nbsp;&nbsp;{key}: "{value}",</div>
				);
			}
		});
		return (
			<div>
				{"{ "}
				&nbsp;&nbsp;&nbsp;&nbsp;{result}
				{" }"}
			</div>
		);
	};
	
	const mappingArrayHandler = (data) => {
		const arr = data.map((object, index) => {
			const result = Object.entries(object).map(([key, value]) => {
				if (typeof(value) === "object") {
					const rs = Object.entries(value).map(([k, vl]) => {
						return (
							<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{k}: "{vl}",</div>
						);
					});
					return (
						<div>&nbsp;&nbsp;&nbsp;&nbsp;{key}: {"{"}
							&nbsp;&nbsp;&nbsp;&nbsp;{rs}
							&nbsp;&nbsp;&nbsp;&nbsp;{"}"}
						</div>
					);
				} else {
					return (
						<div>&nbsp;&nbsp;&nbsp;&nbsp;{key}: "{value}",</div>
					);
				}
			})
			return (
				<div>
					{"{ "}
					&nbsp;&nbsp;&nbsp;&nbsp;{result}
					{" },"}
				</div>
			);
		});
		return (
			<div>
				{"[ "}
				&nbsp;&nbsp;&nbsp;&nbsp;{arr}
				{" ]"}
			</div>
		);
	};

	const dataHandler = (data) => {
		let result;
		if (!Array.isArray(data)) {
			result = mappingObjectHandler(data);
		} else {
			result = mappingArrayHandler(data);
		}
		return result;
	};

	return (
		<UncontrolledCollapse toggler={"#"+APIdata.id}>
			<Card>
				<CardHeader color={color}>
					<h4 className={classes.cardTitleWhite}>{APIdata.name}</h4>
					<span className={classes.cardCategoryWhite}>{APIdata.method} - {APIdata.path}</span>
				</CardHeader>
				<CardBody>
					<h4>Description:</h4>
					<p>{APIdata.des}</p>
					<h4>Header:</h4>
					<CardBody className="text-success bg-dark">
						{dataHandler(APIdata.header)}
					</CardBody>
					<h4>Body:</h4>
					<CardBody className="text-success bg-dark">
						{dataHandler(APIdata.body)}
					</CardBody>
					<h4>Request Success:</h4>
					<CardBody className="text-success bg-dark">
						{dataHandler(APIdata.success)}
					</CardBody>
					<h4>Request Error:</h4>
					<CardBody className="text-success bg-dark">
						{dataHandler(APIdata.error)}
					</CardBody>
				</CardBody>
			</Card>
		</UncontrolledCollapse>
	);
}

FormAPI.propTypes = {
	color: PropTypes.oneOf([
		"primary",
		"info",
		"success",
		"warning",
		"danger",
		"rose",
		"white",
		"blue",
		"transparent"
	]),
	size: PropTypes.oneOf(["sm", "lg"]),
	simple: PropTypes.bool,
	round: PropTypes.bool,
	disabled: PropTypes.bool,
	block: PropTypes.bool,
	link: PropTypes.bool,
	justIcon: PropTypes.bool,
	className: PropTypes.string,
	// use this to pass the classes props from Material-UI
	muiClasses: PropTypes.object,
	children: PropTypes.node,
	APIdata: PropTypes.object
};
