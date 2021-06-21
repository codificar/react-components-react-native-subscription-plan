import React, {Component} from 'react';
import TitleHeader from '../components/TitleHeader';
import Toolbar from '../components/Toolbar';
import styles from './SubscriptionScreen/SubscriptionScreenStyles';

//import ProviderApi from "../Services/Api/ProviderApi";
import Icon from 'react-native-vector-icons/Feather';
import strings from '../lang/strings';

import {subscriptionDetails, cancelSubscription} from '../services/api';

import * as parse from '../Util/Parse';
import {
	View,
	Text,
	BackHandler,
	Linking,
	TouchableOpacity,
	Alert,
} from 'react-native';

export default class SubscriptionDetailsScreen extends Component {
	constructor(props) {
		super(props);
		this.provider = this.props.navigation.state.params.provider;
		this.route = this.props.navigation.state.params.route;
		this.themeColor = this.props.navigation.state.params.themeColor ?? '#007bff';
		this.buttonTextColor = this.props.navigation.state.params.buttonTextColor ?? '#FFF';

		this.state = {
			signature: {},
			status: '',
		};
	}

	componentDidMount() {
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.navigation.goBack();
			return true;
		});
		this.getSubscriptionDetails();
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

	alertCancelSubscription() {
		Alert.alert(
			strings.cancel_alert_title,
			strings.cancel_alert + this.state.signature.good_cancel_date,
			[
				{
					text: strings.no_tinny,
					onPress: () => function () {},
					style: 'cancel',
				},
				{
					text: strings.yes_tinny,
					onPress: () => this.cancelProviderSubscription(),
				},
			],
			{cancelable: true},
		);
	}

	cancelProviderSubscription() {
		cancelSubscription(
			this.route,
			this.provider.id,
			this.provider.token,
			this.state.signature.id,
		)
			.then(() => {
				this.getSubscriptionDetails()
			})
			.catch((error) => {
				console.log(error);
			});
	}

	navigate() {
		this.props.navigation.navigate('SubscriptionScreen', {
			screen: 'SubscriptionDetailsScreen',
			provider: this.provider,
			route: this.route,
			is_change: true,
			themeColor: this.themeColor,
			buttonTextColor: this.buttonTextColor,
		});
	}

	handleClickBillet() {
		Linking.openURL(this.state.signature.billet_link);
	}

	render() {
		return (
			<View style={styles.parentContainer}>
				<Toolbar
					back={true}
					handlePress={() => this.props.navigation.goBack()}
				/>
				<TitleHeader text={strings.subscriptionDetails} align="flex-start" />

				{this.state.signature.paid_status ? (
					<View style={styles.containerDetails}>
						<View style={styles.detailsBox}>
							<Text
								style={[
									this.state.signature.paid_status != 'paid'
										? styles.statusOpen
										: styles.statusPaid,
								]}>
								{this.state.signature.paid_status != 'paid'
									? strings.open
									: strings.paid}
							</Text>

							<Text style={styles.textDetailsBox}>
								{this.state.signature.plan_name}
							</Text>

							<Text style={styles.planDetails}>
								{strings.due} {'\n'}
								<Text style={styles.fontBold}>
									{this.state.signature.next_expiration}
								</Text>
							</Text>
							<Text style={styles.planDetails}>
								Status: {'\n'}
								<Text style={styles.fontBold}>
									{this.state.signature.status}
								</Text>
							</Text>

							{this.state.signature.billet_link && (
								<View style={styles.billetView}>
									<Text style={styles.planDetails}>{strings.accessBillet}</Text>
									<TouchableOpacity onPress={() => this.handleClickBillet()}>
										<Icon name="external-link" size={28} color={'#000'} />
									</TouchableOpacity>
								</View>
							)}

							<View style={styles.optionsView}>
								{!this.state.signature.is_cancelled &&
									<TouchableOpacity
										onPress={() => this.alertCancelSubscription()}>
										<Text style={styles.fontBold}>{strings.cancel}</Text>
									</TouchableOpacity>
								}
								<TouchableOpacity onPress={() => this.navigate()}>
									<Text style={styles.fontBold}>{strings.change}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				) : (
					<View style={styles.noSubscription}>
						<Text>{strings.no_subscription}</Text>
					</View>
				)}
			</View>
		);
	}
}
