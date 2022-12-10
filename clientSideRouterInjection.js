	console.log(document);
	let clientSideRouter = document.createElement('script');
	clientSideRouter.textContent = `
	async function fetchLink(event) {
		window.myRouter.fetchOnHover.call(window.myRouter, event);
	}
	async function followLink(event) {
	// use rerunner to scrape links on destination page
		if (!window.r || window.r === 'undefined'){
			r = new rerunner();
		}
		await r.scrape();
		r.scrapeFrom(myRouter.routeTable[event.target.attributes.link.value]);
		myRouter.follow(event);
		r.run()
	}
	if (!window.myRouter || window.myRouter === 'undefined'){
		window.myRouter = new router();
	}
	window.links = document.querySelectorAll("a");
	for (let i = 0; i < links.length; i++) {
		try{
			links[i].addEventListener('mouseover', fetchLink);
			links[i].addEventListener('click', followLink);
		} catch {
			// could not attach event listener
		}
	}
	`;
	clientSideRouter.setAttribute('data-rerun', 'true');
	document.body.appendChild(clientSideRouter);
