'use strict';

var ethKey = require('@parity/ethKey.js');
var request = require('request');

var publicKey;
var address;

var post = function(params, method, callback) {
	request({
    	method: 'POST',
    	json: true,
    	uri: 'http://localhost:8545/',
    	body: [{
        	params: params,
        	method: method,
        	id: 1,
        	jsonrpc: '2.0'
      	}]
  	},
  	function (error, response, body) {
    	if (error) {
      		return console.error('Call failed:', error);
    	}
    	callback(body);
  	})
}

var generateSecretPhrase = function(pw, msg) {

	post([], 'parity_generateSecretPhrase', function(body) {
		var phrase = body[0]['result'];
    	console.log('Generated new mnemonic: ' + phrase);

    	var wallet = ethKey.phraseToWallet(phrase);

    	wallet.then(function(result) {
    		console.log('Generated new wallet: ' + JSON.stringify(result));
    		address = result['address'];
  			publicKey = result['public'];
  			newAccountFromPhrase(phrase, pw, msg);
		}, function(err) {
  			console.log('Error: ' + err);
		});
	});
}

var newAccountFromPhrase = function(phrase, pw, msg) {

	post([phrase, pw], 'parity_newAccountFromPhrase', function(body) {
		console.log('Added new account: ' + body[0]['result']);
    	encrypt(pw, msg);
	});
}

var encrypt = function(pw, msg) {
	console.log('Encrypting message: ' + msg);

	post([publicKey, '0x' + a2hex(msg)], 'parity_encryptMessage', function(body) {
		var em = body[0]['result'];
    	console.log('Encrypted message: ' + em);
    	unlockAccount(pw, em)
	});
}

var unlockAccount = function(pw, em) {

	post([address, pw, null], 'personal_unlockAccount', function(body) {
		console.log('Unlocked account? ' + body[0]['result']);
    	decrypt(em);
	});
}

var decrypt = function(em) {

	post([address, em], 'parity_decryptMessage', function(body) {
		var decryptedMsg = body[0]['result'];
    	console.log('Decrypted message: ' + hex2a(decryptedMsg));
	});
}

function a2hex(str) {
    var arr = [];
	for (var n = 0; n < str.length; n ++) {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr.push(hex);
	}
	return arr.join('');
}

function hex2a(hexx) {
    var hex = hexx.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

module.exports = {
	generateSecretPhrase: generateSecretPhrase
}

require('make-runnable');