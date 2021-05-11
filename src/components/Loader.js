import React from 'react';
import {StyleSheet, View, Modal, Text, ActivityIndicator} from 'react-native';
import * as constants from '../constants';

/**
 * Loading Model that receives message and loading variables
 * where message is a text below spinner and
 * loading is a boolean if model is visible or not.
 */

const Loader = (props) => {
	const {loading, message} = props;

	return (
		<Modal
			transparent={true}
			animationType={'none'}
			visible={loading}
			onRequestClose={() => {}}>
			<View style={styles.modalBackground}>
				<View style={styles.activityIndicatorWrapper}>
					<Text style={styles.titleText}></Text>
					<ActivityIndicator
						animating={loading}
						color={constants.LOADING_COLOR}
						size="large"
					/>
					<Text style={styles.titleText}> {message} </Text>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#00000040',
	},
	activityIndicatorWrapper: {
		backgroundColor: '#FFFFFF',
		height: 120,
		width: 120,
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	titleText: {
		textAlign: 'center',
		padding: 15,
	},
});

export default Loader;
