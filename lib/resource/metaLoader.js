var logger = require('pomelo-logger').getLogger('bearcat', 'metaLoader');
var utils = require('../util/utils');
var path = require('path');
var fs = require('fs');

var loader = function() {
	this.metaObjects = {};
}

module.exports = loader;

loader.prototype.load = function(mpath) {
	if (!mpath) {
		throw new Error('opts or opts.path should not be empty.');
	}

	mpath = fs.realpathSync(mpath);

	if (!fs.existsSync(mpath)) {
		throw new Error('path not exist, path:' + mpath);
	}

	if (!utils.isDir(mpath)) {
		throw new Error('path should be directory.');
	}

	this.loadPath(this.metaObjects, mpath);
	return this.metaObjects;
};

loader.prototype.setMetaObject = function(beanName, metaObject) {
	this.metaObjects[beanName] = metaObject;
}

loader.prototype.getMetaObejcts = function() {
	return this.metaObjects;
}

loader.prototype.loadFile = function(fp) {
	var m = utils.requireUncached(fp);
	if (!m) {
		return;
	}

	if (typeof m === 'function') {
		// if the module provides a factory function 
		// then invoke it to get a instance
		// continue;
		return;
		// m = m(context);
	}

	if (!m.func) {
		return;
	}

	return m;
};

loader.prototype.loadPath = function(res, path) {
	var files = fs.readdirSync(path);
	if (files.length === 0) {
		console.warn('path is empty, path:' + path);
		return;
	}

	if (path.charAt(path.length - 1) !== '/') {
		path += '/';
	}

	var fp, fn, m;
	for (var i = 0, l = files.length; i < l; i++) {
		fn = files[i];
		fp = path + fn;

		if (utils.isDir(fp)) {
			this.loadPath(res, fp);
		}

		if (!utils.isFile(fp) || !utils.checkFileType(fn, '.js')) {
			// only load js file type
			continue;
		}

		m = this.loadFile(fp);
		if (!m) {
			continue;
		}

		var id = utils.getFileName(fn, '.js'.length);
		if (m.id) {
			id = m.id;
			var originMeta = res[id];
			// res[id] = m;
			res[id] = mergeMeta(m, originMeta);
		}
	}
	return res;
};

var mergeMeta = function(meta, originMeta) {
	if (!originMeta) {
		return meta;
	}

	for (var key in meta) {
		originMeta[key] = meta[key];
	}

	return originMeta;
}