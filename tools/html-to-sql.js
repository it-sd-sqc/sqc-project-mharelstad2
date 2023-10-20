// Dependencies
import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'node-html-parser';

// Define input and output file paths
const inputFilePath = 'input.html'; // Relative path to your HTML file
const outputFilePath = 'output.sql'; // Relative path for the SQL output

// Read the HTML file
const htmlData = readFileSync(inputFilePath, 'utf8');

// Convert the HTML data to SQL statements
const sqlStatements = `INSERT INTO your_table_name (html_data_column) VALUES ('${htmlData.replace(/'/g, "''")}');`;

// Write the SQL statements to an output file
writeFileSync(outputFilePath, sqlStatements);

console.log(`HTML data has been converted to SQL and saved to ${outputFilePath}`);

// Define the input file path using a relative path
const relativeFilePath = './data/'; // Adjust this relative path as needed

// Read the input file
try {
  const content = readFileSync(relativeFilePath, 'utf8');

  // Process the content as needed
  console.log('Content from the input file:');
  console.log(content);
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error(`File not found at path: ${relativeFilePath}`);
  } else {
    console.error(`An error occurred: ${error.message}`);
  }
}

// Define the output file path
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

// Define the output file path using a relative path
const sqlFilePath = './docs/generated-schema.sql';

// Ensure the directory exists or create it
const outputDir = sqlFilePath.substring(0, sqlFilePath.lastIndexOf('/'));
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the SQL script content to the output file
writeFileSync(sqlFilePath, sqlHeader);

console.log(`SQL script has been written to ${sqlFilePath}`);