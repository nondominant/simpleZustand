function router() {
	this.routeTable = {};
}

router.prototype.Utf8ArrayToStr = function Utf8ArrayToStr(array) {
    let out, i, len, c;
    let char2, char3;
    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }

    return out;
}

router.prototype.fetchOnHover = async function fetchOnHover(event){
		const nav = event.target.attributes.link.value;
		if (this.routeTable[`${nav}`] !== undefined) {
			return;
		} else {
			const response = await fetch(nav, {
			    method: 'GET', // *GET, POST, PUT, DELETE, etc.
			    mode: 'cors', // no-cors, *cors, same-origin
			    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			    credentials: 'same-origin', // include, *same-origin, omit
			  });
			const reader = response.body.getReader();
			let blob = await reader.read().then(({done, value}) => {
				if (done) {
					return;
				}
				return value;
			})
			let html = await this.Utf8ArrayToStr(blob);
			let parser = new DOMParser();
			let doc = parser.parseFromString(html, 'text/html');
			this.routeTable[`${nav}`] = doc.body;
			console.log(this.routeTable[`${nav}`]);
		}
	}

router.prototype.follow = async function follow(event){
	const nav = event.target.attributes.link.value;
	document.body = this.routeTable[`${nav}`];
}

