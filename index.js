var textLength = 0;
fn_editValue = function(selID){
	var spanEdit = document.getElementById(selID);
	var selValue = spanEdit.textContent;
	textLength = selValue.length;
	var j = parseInt(spanEdit.offsetWidth + 2);
	var inputValue = '<input type="text" id="input_'+selID+'" style="font-size:16px;width:'+j+'px;" onblur="fn_showValue('+selID+');" onkeyup="fn_addLength('+selID+');">';
	spanEdit.innerHTML = inputValue;
	document.getElementById('input_'+selID).focus();
	setTimeout(function(){
		document.getElementById('input_'+selID).value = selValue;},100);}
	
fn_addLength = function(selID){
	var thisID = selID.id;
	var readInput = document.getElementById('input_'+thisID);
	var jjj = readInput.value.length;
	if(jjj >= textLength){
		readInput.style.width = parseInt(readInput.style.width) + 8 + 'px';}
	else{
		readInput.style.width = parseInt(readInput.style.width) - 8 + 'px';}
	textLength = jjj;}
	
fn_showValue = function(selID){
	var thisID = selID.id
	var spanEdit = document.getElementById(thisID);
	var readInput = document.getElementById('input_'+thisID);
	var addValue = readInput.value;
	setTimeout(function(){
		spanEdit.innerHTML = '<span onclick="fn_editValue(this.parentElement.id);" class="cl_editCell">'+addValue+'</span>';},100);}

fn_getItem = function(isItem,isPrice,isQuantity){
	var areKeys = Object.keys(isItem);
	var jj = areKeys.length;
	var firstKey = '';
	for(var ii = 0; ii < jj; ii++){
		if(isNaN(Math.abs(isItem[areKeys[ii]])) == true){
			firstKey = areKeys[ii];
			break;}}
	var newCardItem = {};
	var positionsArray = ["Item","Price","Quantity","Sub_Total"];
	var itemSubTotal = 0;
	var itemQuantity = 0;
	var cardUpdate = 0;
	var selIndex = 0;
	if(isCard.length >= 1){
		for(var i = 0; i < isCard.length; i++){
			if(isCard[i].Item == isItem[firstKey]){
				cardUpdate = 1;
				selIndex = i;}}}
	if(cardUpdate == 1){
		itemQuantity = parseInt(isCard[selIndex].Quantity + isQuantity);
		itemSubTotal = parseFloat(itemQuantity * isPrice);
		isCard[selIndex].Quantity = itemQuantity;
		isCard[selIndex].Sub_Total = itemSubTotal;
		fn_reCalcSubtotal();
		}else{
		itemSubTotal = isPrice;
		itemQuantity = isQuantity;
		var posValuesArray = [isItem[firstKey],isPrice,itemQuantity,itemSubTotal];
		var j = positionsArray.length;
		for(var i = 0; i < j; i++){
			var posName = positionsArray[i];
			newCardItem[posName] = posValuesArray[i];
			}
		isCard.push(newCardItem);
		fn_reCalcSubtotal();}}

fn_cancelQuan = function(){
	setTimeout(function(){
		var selObjs1 = document.getElementsByClassName('cl_quan2');
		var selObjs2 = document.getElementsByClassName('cl_quan3');
		var j = selObjs1.length;
		for(var i = 0; i < j; i++){
			selObjs1[i].className = 'cl_quan1';
			selObjs2[i].className = 'cl_quan4';
			}},120);}
			
var isNum = 0;
fn_getNewQuan = function(selNum){isNum = parseInt(selNum);}
	
fn_selQuan = function(k){
	//console.log(event.currentTarget.id);
	var objQuan1 = document.getElementById('idQuan1_'+k);
	var objQuan2 = document.getElementById('idQuan2_'+k);
	if(objQuan1.className == 'cl_quan1'){
		objQuan1.className = 'cl_quan2';
		objQuan2.className = 'cl_quan3';
		document.getElementById('inFocus').focus();
		}else{
		objQuan1.className = 'cl_quan1';
		objQuan2.className = 'cl_quan4';
		if(isNum == 0){
			fn_removeFromCard(k);
			}else{
			isCard[k].Quantity = isNum;
			isCard[k].Sub_Total = isCard[k].Price * isNum;
			fn_reCalcSubtotal();}
		isNum = 0;}}
fn_removeFromCard = function(k){
	isCard.splice(k,1);
	fn_reCalcSubtotal();
	}
fn_rmvOne = function(k){
	var currQuan = isCard[k].Quantity;
	var itemPrice = isCard[k].Price;
	isCard[k].Quantity = parseInt(currQuan - 1);
	if(isCard[k].Quantity == 0){fn_removeFromCard(k);}else{
	isCard[k].Sub_Total = parseFloat(isCard[k].Quantity * itemPrice);
	fn_reCalcSubtotal();}
	}
fn_addOne = function(k){
	var currQuan = isCard[k].Quantity;
	var itemPrice = isCard[k].Price;
	isCard[k].Quantity = parseInt(currQuan + 1);
	if(isCard[k].Quantity == 0){fn_removeFromCard(k);}else{
	isCard[k].Sub_Total = parseFloat(isCard[k].Quantity * itemPrice);
	fn_reCalcSubtotal();}
	}
fn_reCalcSubtotal = function(){
	app.isTotal = 0;
	for(var i = 0; i < isCard.length; i++){
		app.isTotal = app.isTotal + isCard[i].Sub_Total;}}