import React, { Component } from 'react';
import TitleHeader from '../components/TitleHeader';
import Toolbar from '../components/Toolbar';
import styles from './SubscriptionScreen/SubscriptionScreenStyles';

//import ProviderApi from "../Services/Api/ProviderApi";
import Icon from 'react-native-vector-icons/Feather';
import strings from '../lang/strings';

import { subscriptionDetails, cancelSubscription } from '../services/api';

import * as parse from '../Util/Parse';
import {
	View,
	Text,
	BackHandler,
	Linking,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
} from 'react-native';
import * as constants from '../constants/index';
import SubscriptionDetail from '../components/SubscriptionDetail';

export default class SubscriptionDetailsScreen extends Component {
	constructor(props) {
		super(props);
		this.provider = this.props.navigation.state.params.provider;
		this.route = this.props.navigation.state.params.route;
		this.routeBack = this.props.navigation.state.params.routeBack || 'ConfigScreen';
		this.themeColor = this.props.navigation.state.params.themeColor ?? '#007bff';
		this.buttonTextColor = this.props.navigation.state.params.buttonTextColor ?? '#FFF';
		this.routeAPI = this.props.navigation.state.params.routeAPI || constants.ROUTE_API;
		this.isContainerPaymentType = this.props.navigation.state.params.isContainerPaymentType || false;

		if(this.provider._id) {
			this.provider.id = this.provider._id;
		} 

		if(this.provider._token) {
			this.provider.token = this.provider._token
		}

		this.state = {
            isLoading: true,
			signature: {},
			status: '',
		};
		this.willFocus = this.props.navigation.addListener('willFocus', () => {
			this.getSubscriptionDetails();
		});
	}

	componentDidMount() {
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.navigation.goBack();
			return true;
		});
		this.getSubscriptionDetails();
	}

	getSubscriptionDetails() {
        this.setState({isLoading: true});
		subscriptionDetails(this.route, this.provider.id, this.provider.token)
			.then((response) => {
				const { data } = response;

				if (data.is_cancelled == 1) {
					data.status = strings.cancelled;
				} else if (data.activity == 0) {
					data.status = strings.inactive;
				} else {
					data.status = strings.active;
				}

				this.setState({
					signature: data,
					isLoading: false
				});
			})
			.catch((error) => {
				console.log(error);
				this.setState({isLoading: false});
			});
	}

	alertCancelSubscription() {
		Alert.alert(
			strings.cancel_alert_title,
			strings.cancel_alert + this.state.signature.good_cancel_date,
			[
				{
					text: strings.no_tinny,
					onPress: () => function () { },
					style: 'cancel',
				},
				{
					text: strings.yes_tinny,
					onPress: () => this.cancelProviderSubscription(),
				},
			],
			{ cancelable: true },
		);
	}

	cancelProviderSubscription() {
		cancelSubscription(
			this.route,
			this.provider.id,
			this.provider.token,
			this.state.signature.id,
		)
			.then((response) => {
				if (response.data.success === false) {
					Alert.alert(
						strings.permission,
						strings.plan_permission,
						[
							{
								text: strings.ok,
								onPress: () => function () { },
								style: 'cancel',
							},
						],
						{ cancelable: true },
					);
				} else {
					Alert.alert(
						strings.cancelled,
						strings.cancelled_with_success,
						[
							{
								text: strings.ok,
								onPress: () => function () { },
								style: 'cancel',
							},
						],
						{ cancelable: true },
					);
				}
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
			routeAPI : this.routeAPI,
			routeBack: this.routeBack,
			isContainerPaymentType: this.isContainerPaymentType
		});
	}

	handleClickBillet() {
		if(this.state.signature.billet_link) {
            Linking.openURL(this.state.signature.billet_link);
        } else {
            Alert.alert('Opps', strings.invalid_link);
        }
	}
    handleClickPix() {
        const { navigate } = this.props.navigation;
        return navigate('PixQrCodeScreen', 
        {
            routeName: "PixQrCodeScreen",
            params: {
                provider: this.props.providerProfile,
                request_id: null,
                transaction_id: this.state.signature.transaction_db_id,
				route: this.route,
				routeAPI: this.routeAPI ,
				routeBack: this.routeBack,
				isContainerPaymentType: this.isContainerPaymentType,
            }
        });
    }

	render() {
		return (
			<View style={styles.parentContainer}>
				<Toolbar
					back={true}
					handlePress={() => this.props.navigation.goBack()}
				/>
				<TitleHeader text={strings.subscriptionDetails} align="flex-start" />
				<SubscriptionDetail
					isLoading={this.state.isLoading}
					signatureDetail={this.state.signature}
					themeColor={this.themeColor}
					handleClickBillet={() => this.handleClickBillet()}
					handleClickPix={() => this.handleClickPix()}
					alertCancelSubscription={() => this.alertCancelSubscription()}
					/>
				<View>
                    <TouchableOpacity
                        style={styles.morePlans}
                        onPress={() => this.navigate()}
                    >
                        <Text style={styles.fontBold}>
                            {strings.view_plans}
                        </Text>
                    </TouchableOpacity>
                </View>
			</View>
		);
	}
}
