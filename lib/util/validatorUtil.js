/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat ValidatorUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var Constant = require('./constant');
var Utils = require('./utils');
var ValidatorUtil = {};

/**
 * ValidatorUtil validate metaObject.
 *
 * @param    {Object}   metaObject
 * @return   {Boolean}  true|false
 * @api public
 */
ValidatorUtil.metaValidator = function(metaObject) {
	var id = metaObject.id;

	if (!Utils.checkString(id))
		return new Error('id must be String');

	var func = metaObject.func;
	if (!func || !Utils.checkFunction(func))
		return new Error('func must be Function');

	var order = metaObject.order;
	if (Utils.isNotNull(order) && !Utils.checkNumber(order))
		return new Error('order must be Number');

	var parentName = metaObject.parent;
	if (Utils.isNotNull(parentName) && !Utils.checkString(parentName))
		return new Error('parent must be String');

	var initMethodName = metaObject.init;
	if (Utils.isNotNull(initMethodName) && !Utils.checkString(initMethodName))
		return new Error('init must be String');

	var destroyMethodName = metaObject.destroy;
	if (Utils.isNotNull(destroyMethodName) && !Utils.checkString(destroyMethodName))
		return new Error('destroy must be String');

	var factoryBeanName = metaObject.factoryBean;
	if (Utils.isNotNull(factoryBeanName) && !Utils.checkString(factoryBeanName))
		return new Error('factoryBean must be String');

	var factoryMethodName = metaObject.factoryMethod;
	if (Utils.isNotNull(factoryMethodName) && !Utils.checkString(factoryMethodName))
		return new Error('factoryMethodName must be String');

	var scope = metaObject.scope || Constant.SCOPE_DEFAULT;
	if (scope && scope !== Constant.SCOPE_SINGLETON && scope !== Constant.SCOPE_PROTOTYPE)
		return new Error('scope must be singleton or prototype');

	var args = metaObject.args || Constant.ARGS_DEFAULT;
	var props = metaObject.props || Constant.PROPS_DEFAULT;
	var factoryArgsOn = metaObject.factoryArgs || Constant.ARGS_DEFAULT;

	var asyncInit = metaObject.async || Constant.ASYNC_INIT_DEFAULT;
	if (Utils.isNotNull(asyncInit) && !Utils.checkBoolean(asyncInit))
		return new Error('async must be Boolean');

	var lazyInit = metaObject.lazy || Constant.LAZY_INIT_DEFAULT;
	if (Utils.isNotNull(lazyInit) && !Utils.checkBoolean(lazyInit))
		return new Error('lazy must be Boolean');

	return true;
}

module.exports = ValidatorUtil;