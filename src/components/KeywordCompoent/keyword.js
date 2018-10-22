import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
	Row,
	Col,
	Icon,
	Card,
} from 'antd';


@connect(({ chart, loading }) => {
	return {
		chart,
		loading: loading.effects['chart/fetch'],
	};
})
export default class Analysis extends Component {
	state = {};

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {
		return (
			<Fragment>

			</Fragment>
		);
	}
}
