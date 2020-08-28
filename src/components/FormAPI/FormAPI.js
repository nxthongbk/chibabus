import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap
import { Collapse } from 'reactstrap';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

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
	const btnClasses = classNames({
		[classes.button]: true,
		[classes[size]]: size,
		[classes[color]]: color,
		[classes.round]: round,
		[classes.disabled]: disabled,
		[classes.simple]: simple,
		[classes.block]: block,
		[classes.link]: link,
		[classes.justIcon]: justIcon,
		[className]: className
	});

	const [isOpen, setIsOpen] = React.useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const dataHandler = (data) => {
		if (data) {
			const result = Object.entries(data).map(([key, value]) => {
				return (
					<div>{key}: {value},</div>
				);
			});
			return result;
		}
	};

	return (<div>
		<Button {...rest} classes={muiClasses} className={btnClasses} onClick={toggle} >
			{APIdata.name}
		</Button>
		<Collapse isOpen={isOpen}>
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
						{" { "}
						{dataHandler(APIdata.header)}
						{" } "}
					</CardBody>
					<h4>Body:</h4>
					<CardBody className="text-success bg-dark">
						{" { "}
						{dataHandler(APIdata.body)}
						{" } "}
					</CardBody>
					<h4>Request Success:</h4>
					<CardBody className="text-success bg-dark">
						{" { "}
						{dataHandler(APIdata.success)}
						{" } "}
					</CardBody>
					<h4>Request Error:</h4>
					<CardBody className="text-success bg-dark">
						{" { "}
						{dataHandler(APIdata.error)}
						{" } "}
					</CardBody>
				</CardBody>
			</Card>
		</Collapse>
	</div>);
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
