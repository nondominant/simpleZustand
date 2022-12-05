	function zustand() {
		this.global_store = [];
		this.hash_map = {};
	}
	zustand.prototype.create_store = function create_store() {
		let index = this.global_store.length;
		this.global_store[index] = {'data': 0, subscribers : []}
		let key = this.set_key(index);
		return key;
	}
	zustand.prototype.updateState = function update_store_with_key(key, newData) {
		let i = this.get_index(key);
		this.global_store[i].data = newData;
		this.propogate_update(this.global_store[i])
	}
	zustand.prototype.get_index = function get_index(key) {
		let index = this.hash_map.key;
		return index;
	}
	zustand.prototype.set_key = function set_key(index) {
		// generate a uuid
		let key = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
		this.hash_map.key = index;
		return key;
	}
	zustand.prototype.register_state = function register_state(key, callBack, ctx) {
		index = this.get_index(key);
		let arr = this.global_store[index].subscribers;
		this.global_store[index].subscribers[arr.length] = { 'mutator': callBack, 'ctx': ctx};
	}
	zustand.prototype.propogate_update = function propogate_update(storedState) {
		for (let i = 0; i < storedState.subscribers.length; i++) {
			let ctx = storedState.subscribers[i].ctx;
			storedState.subscribers[i].mutator(ctx, storedState.data);
		}
	}

