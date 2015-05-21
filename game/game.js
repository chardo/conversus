function Game(p1, p2){
	this.p1 = p1;
	this.p2 = p2;
	this.p1Target = 'hello';
	this.p2Target = 'hey';
}
Game.prototype.checkMsg = function(id, msg){ 
	result = false;

	if (id == this.p1)
		result = msg == this.p2Target;
	else
		result = msg == this.p1Target;

	return result;
};

module.exports = Game;