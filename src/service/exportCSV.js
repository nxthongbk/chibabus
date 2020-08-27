import React from 'react';
import { CSVLink } from 'react-csv';

export default ({ csvHeader, csvData, fileName }) => {
	if (csvHeader && csvData) {
		return (
			<CSVLink
				headers={csvHeader}
				data={csvData}
				filename={fileName + ".csv"}
				className="btn btn-primary"
			>
				<i className="material-icons">save_alt</i> Export
			</CSVLink>
		);
	};
	return null;
}