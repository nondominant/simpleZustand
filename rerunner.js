function rerunner() {
	this.arrayOfScripts = [];
}

rerunner.prototype.scrape = async function scrape(){
	let a = document.body.querySelectorAll('script');
	for (let i = 0; i < a.length; i++) {
		try {
			if(a[i].dataset.rerun === "true") {
				this.arrayOfScripts.push(a[i].innerHTML); 
			}
		} catch {
			console.log('error');
		}
	}
}

rerunner.prototype.scrapeFrom = async function scrapeFrom(bodyObj){
	let arr = bodyObj.querySelectorAll('script');
	let myScript;
	for (const i in arr) { 
		myScript = document.createElement('script');
		myScript.textContent = arr[i].innerHTML;
		document.body.appendChild(myScript);
	}
}

rerunner.prototype.run = async function run(){
	let myScript;
	for (const i in this.arrayOfScripts) { 
		myScript = document.createElement('script');
		myScript.textContent = this.arrayOfScripts[i];
		document.body.appendChild(myScript);
	}
}

