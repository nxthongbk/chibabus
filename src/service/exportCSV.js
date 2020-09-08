import React from 'react';
import { CSVLink } from 'react-csv';

export default ({ csvHeader, csvData, fileName }) => {
	if (csvHeader && csvData) {
		return (
			<CSVLink
				headers={csvHeader}
				data={csvData}
				filename={fileName + ".csv"}
				className="btn btn-sm btn-primary float-right"
			>
				<i class="fas fa-file-export"></i> Export
			</CSVLink>
		);
	};
	return null;
}