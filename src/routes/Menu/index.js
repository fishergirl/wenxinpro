import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
	Row,
	Col,
	Icon,
	Card,
} from 'antd';


@connect(({ menus, loading }) => {
	return {
		// chart,
		// loading: loading.effects['chart/fetch'],
	};
})
export default class Menus extends Component {
	state = {};

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {
		return (
			<Fragment>
        aaa
			</Fragment>
		);
	}
}
