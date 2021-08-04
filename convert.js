const fs = require('fs')
var randomstring = require("randomstring");

var config = JSON.parse(fs.readFileSync('config.json'))

if (config.Options.Variables == 1) {
	var replacer_var = {}
	for (var index in config.Variables) {
		replacer_var[index] = new RegExp(config.Variables[index], 'g')
	}
}
if (config.Options.Functions == 1) {
	var replacer_fct = {}
	for (var index in config.Functions) {
		replacer_fct[index] = new RegExp(config.Functions[index], 'g')
	}
}

var read = fs.readFileSync('tmp.lua').toString()

read = read.split('\t').join("").split("^M").join("").split("\n").join(" ").split("$").join("").split("\r").join("")


if (config.Options.Functions == 1) {
	for (index in replacer_fct) {
		var rand = rand_string()
		read = read.replace(replacer_fct[index], rand)
	}
}
if (config.Options.Variables == 1) {
	for (index in replacer_var) {
		read = read.replace(replacer_var[index], rand_string)
	}
}

fs.writeFileSync('Obfu.lua', read)
fs.unlinkSync('tmp.lua')

function rand_string()
{
	var re = randomstring.generate({
		length: 32,
		charset: 'alphabetic'
	})

	return re
}
