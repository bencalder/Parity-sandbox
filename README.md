# Parity sandbox

#### Install Parity locally and run 
`parity --light --jsonrpc-cors all --jsonrpc-apis=eth,personal,parity,parity_accounts`


#### Use the following command to initiate the sequence of calls to Parity and view their results
`node index.js generateSecretPhrase '<password>' '<message to encrypt>'`


#### Ex:
`node index.js generateSecretPhrase 'hunter2' 'Bens secret message'`