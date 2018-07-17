# Parity sandbox

### Encrypting and decrypting messages with Parity

This script takes two string inputs (a password and a message) then makes calls to a Parity node to do the following:
1. Generate a new mnemonic phrase
2. Use the mnemonic phrase and password string to create a new account
3. Add that account to the Parity node
4. Encrypt the message string
5. Unlock the account on the Parity node
6. Decrypt the message string

#### Install Parity locally and start it with this command 
`parity --light --jsonrpc-cors all --jsonrpc-apis=eth,personal,parity,parity_accounts`


#### Use the following command to initiate the sequence of calls to Parity and view their results
`node index.js launch '<password>' '<message to encrypt>'`


#### Ex:
`node index.js launch 'hunter2' 'Bens secret message'`

#### Result:
`Generated new mnemonic: sternum dumping avenue math repacking halt scion jujitsu shopper habitual washtub recital`

```Generated new wallet: {
	
	"secret":"0xb243fae0e84fdd0054fedd9ad3ea29bfb07904f3e2ded5d8578d0dd2bab4cbd5",
	
	"public":"0x947a8c1f2cd96dbb1ceb00502ce68c3f9121f34e4db4dadb8b489e7e7d3f21bc04e4e4139a9a5daa2f3bd686f040c0c047442dfa55005f74e25bd73d8b59b768",
	
	"address":"0x00d167c1231638103fc89fbb3c8f7b88c7a9d995"
}```

`Added new account: 0x00d167c1231638103fc89fbb3c8f7b88c7a9d995`

`Encrypting message: Bens secret message`

`Encrypted message: 0x042e1b6fb0af3925e1f4b28f2660ae6259395a3dbb46735f95d32ab947a6750b3f851dc03780d303494a6e534329fc67727cbd13aca353a45d2479b6d98cfff10d98104a84bfc2dd8beca34140d8a30eb929a7e7369333ed23924a4cb7113644a86fa58b3ce8f11a34015b0c151df7b07c363f245c32e99785845c2a6f17df3a29625828`

`Unlocked account? true`

`Decrypted message: Bens secret message`