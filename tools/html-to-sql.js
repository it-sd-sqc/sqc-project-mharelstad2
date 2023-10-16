const fs = require('fs');

// Read the HTML file (change 'input.html' to your HTML file's path)
const inputFilePath = 'input.html';
const htmlData = fs.readFileSync(inputFilePath, 'utf8');

// Convert the HTML data to SQL statements (modify this logic as needed)
const sqlStatements = `INSERT INTO your_table_name (html_data_column) VALUES ('${htmlData.replace(/'/g, "''")}');`;

// Write the SQL statements to an output file (change 'output.sql' to your desired output file's path)
const outputFilePath = 'output.sql';
fs.writeFileSync(outputFilePath, sqlStatements);

console.log(`HTML data has been converted to SQL and saved to ${outputFilePath}`);

// Correct the file path format
const lukesFilePath = 'C:/Users/Owner/Documents/CVTC/SQC/sqc-project-mharelstad2/data';

// Read the input file
try {
    const content = fs.readFileSync(lukesFilePath, 'utf8');
    
    // Process the content as needed
    console.log('Content from the input file:');
    console.log(content);
} catch (error) {
    if (error.code === 'ENOENT') {
        console.error(`File not found at path: ${lukesFilePath}`);
    } else {
        console.error(`An error occurred: ${error.message}`);
    }
}

const sqlHeader = `
-- Drop tables if they exist
DROP TABLE IF EXISTS your_table_name1, your_table_name2;

-- Create tables
CREATE TABLE your_table_name1 (
    column1_name datatype1,
    column2_name datatype2,
    -- Add more columns as needed
);

CREATE TABLE your_table_name2 (
    column1_name datatype1,
    column2_name datatype2,
    -- Add more columns as needed
);

-- Insert data into tables
INSERT INTO your_table_name1 (column1_name, column2_name)
VALUES (value1, value2),
       (value3, value4);

INSERT INTO your_table_name2 (column1_name, column2_name)
VALUES (value5, value6),
       (value7, value8);`;

// Define the output file path
const sqlFilePath = './docs/generated-schema.sql';

// Ensure the directory exists or create it
const outputDir = sqlFilePath.substring(0, sqlFilePath.lastIndexOf('/'));
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Write the SQL script content to the output file
fs.writeFileSync(sqlFilePath, sqlHeader);

console.log(`SQL script has been written to ${sqlFilePath}`);
