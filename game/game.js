var fs = require('fs');

function Game(p1, p2){
	this.p1 = p1;
	this.p2 = p2;

	var targets = getWords('./words.txt');
	this.p1Target = targets[0];
	this.p2Target = targets[1];
}

Game.prototype.checkMsg = function(id, msg){ 
	var msg = ' ' + msg + ' ';			// enclose in spaces to ensure word match
	var pattern = '';
	if (id == this.p1)
		pattern = ' ' + this.p1Target + ' ';
	else
		pattern = ' ' + this.p1Target + ' ';

	var re = new RegExp(pattern, 'i');
	
	return re.test(msg);
};

// returns array of two randomly selected words from given file
function getWords(fileName){
	try {
		var data = fs.readFileSync(fileName, {encoding: 'utf8'});
		var words = data.split('\n').map(function(str) { return str.trim(); });

		var index = Math.floor(Math.random() * words.length);
		var target = words[index];

		index = Math.floor(Math.random() * words.length);
		var target2 = words[index];

		return [target, target2];

	} catch (e) {
		if (e.code === 'ENOENT') {
			console.log('File not found! Defaulting target words.');
		} else {
			console.log(e);
		}
		return ['pork', 'beans'];
	}
}

module.exports = Game;