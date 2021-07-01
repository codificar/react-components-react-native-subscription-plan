import React, {Component} from 'react';

import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './ConfigScreenStyle';
import strings from '../../lang/strings';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TitleHeader from '../../components/TitleHeader';
import Toolbar from '../../components/Toolbar';
import {subscriptionDetails} from '../../services/api';


class ConfigScreen extends Component {
	constructor(props) {
		super(props);
		this.route = this.props.navigation.state.params.route;
		this.provider = this.props.navigation.state.params.provider;
		this.themeColor = this.props.navigation.state.params.themeColor;
		this.buttonTextColor = this.props.navigation.state.params.buttonTextColor;
		this.activeSubscriptionModule = this.props.navigation.state.params.activeSubscriptionModule;

		this.state = {
			signature: undefined,
		}

		this.willFocus = this.props.navigation.addListener("willFocus", () => {
			this.getSubscriptionDetails();
		});
	}

	componentDidMount() {
		this.getSubscriptionDetails();
	}

	componentWillUnmount() {
		this.willFocus.remove();
	}

	getSubscriptionDetails() {
		subscriptionDetails(this.route, this.provider.id, this.provider.token)
			.then((response) => {
				const {data} = response;

				if (data.is_cancelled == 1) {
					data.status = strings.cancelled;
				} else if (data.activity == 0) {
					data.status = strings.inactive;
				} else {
					data.status = strings.active;
				}

				this.setState({
					signature: data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	/**
	 * return const navigate = this.props.navigation
	 */
	returnConstNavigate() {
		const {navigate} = this.props.navigation;
		return navigate;
	}

	navigateToScreen(screen, type) {
		const {navigate} = this.props.navigation;

		/**
		 * First parameter: Screen to be initialized passed in "screen" variable
		 * Second parameter: Information sent from CurrentScreen to NextScreen.
		 * Use "this.props.navigation.state.params.loginBy" to use data on the other Screen
		 */

		navigate(screen);
	}

	render() {
		return (
			<View style={styles.parentContainer}>
				<Toolbar
					back={true}
					handlePress={() => this.props.navigation.goBack()}
				/>
				<TitleHeader text={strings.configuration} align="flex-start" />
				<View style={{paddingHorizontal: 25}}>
					<View style={styles.cardPerfil}>
						<Image source={{uri: this.provider.picture}} style={styles.image} />
						<View style={styles.information}>
							<Text style={{fontWeight: 'bold'}}>
								{this.provider.firstName + ' ' + this.provider.lastName}
							</Text>
							<Text style={{}}>{this.provider.phone}</Text>
							<Text style={{}}>{this.provider.email}</Text>
						</View>
					</View>

					{
						this.activeSubscriptionModule &&
						<>
						{
							(this.state.signature?.id && !this.state.signature?.is_cancelled) ?
							(
								<TouchableOpacity
								onPress={() =>
									this.props.navigation.navigate('SubscriptionDetailsScreen', {
										provider: this.provider,
										route: this.route,
										themeColor: this.themeColor,
										buttonTextColor: this.buttonTextColor,
									})
								}
								style={styles.cardContact}>
								<View style={styles.leftContact}>
									<Icon
										name="playlist-edit"
										size={25}
										color={'#000'}
										style={styles.shield}
									/>
									<Text style={{color: '#000'}}>
										{strings.subscriptionDetails}
									</Text>
								</View>
								<Icon name="chevron-right" size={28} color={'#000'} />
							</TouchableOpacity>
							) : (
								<TouchableOpacity
								onPress={() =>
									this.props.navigation.navigate('SubscriptionScreen', {
										provider: this.provider,
										route: this.route,
										themeColor: this.themeColor,
										buttonTextColor: this.buttonTextColor,
										screen: 'ConfigScreen',
										is_change: false,
									})
								}
								style={styles.cardContact}>
								<View style={styles.leftContact}>
									<Icon
										name="pencil-plus-outline"
										size={25}
										color={'#000'}
										style={styles.shield}
									/>
									<Text style={{color: '#000'}}>{strings.subscriptions}</Text>
								</View>
								<Icon name="chevron-right" size={28} color={'#000'} />
							</TouchableOpacity>
							)
						}
						</>
					}
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const {providerProfile} = state.providerProfileReducer;
	const {settings} = state.settingsReducer;
	return {providerProfile, settings};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfigScreen);
