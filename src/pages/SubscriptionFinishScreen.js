import React, { Component } from 'react';
import TitleHeader from '../components/TitleHeader';
import Toolbar from '../components/Toolbar';
import Loader from '../components/Loader';
import * as parse from '../Util/Parse';
import strings from '../lang/strings';
import styles from './SubscriptionScreen/SubscriptionScreenStyles';
import IconCheck from 'react-native-vector-icons/Feather';
import images from '../img';
import {
	View,
	Text,
	BackHandler,
	Alert,
	TouchableOpacity,
	FlatList,
	Image,
	ScrollView
} from 'react-native';

import { listCards, newSubscriptionPlan } from '../services/api';

export default class SubscriptionFinishScreen extends Component {
	constructor(props) {
		super(props);
		this.provider = this.props.navigation.state.params.provider;
		this.route = this.props.navigation.state.params.route;
		this.themeColor = this.props.navigation.state.params.themeColor;
		this.buttonTextColor = this.props.navigation.state.params.buttonTextColor;

		this.arrayIconsType = {};
		this.arrayIconsType.visa = images.icon_ub_creditcard_visa;
		this.arrayIconsType.mastercard = images.icon_ub_creditcard_mastercard;
		this.arrayIconsType.master = images.icon_ub_creditcard_mastercard;
		this.arrayIconsType.amex = images.icon_ub_creditcard_amex;
		this.arrayIconsType.diners = images.icon_ub_creditcard_diners;
		this.arrayIconsType.discover = images.icon_ub_creditcard_discover;
		this.arrayIconsType.jcb = images.icon_ub_creditcard_jcb;
		this.arrayIconsType.terracard = images.terra_card;

		this.state = {
			isLoading: false,
			loading_message: strings.loading,
			item: this.props.navigation.state.params.item,
			charge_type: this.props.navigation.state.params.type,
			cards: [],
			selectedCard: null,
			screen: this.props.navigation.state.params.screen,
			is_change: this.props.navigation.state.params.is_change,
		};

		this.willFocus = this.props.navigation.addListener('willFocus', () => {
			this.listProviderCards();
		});
	}

	componentDidMount() {
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.navigation.goBack();
			return true;
		});
	}

	componentWillUnmount() {
		this.backHandler.remove();
	}

	/**
	 * Api to list available cards
	 * @return {void}
	 */
	listProviderCards() {
		listCards(this.route, this.provider.id, this.provider.token)
			.then((response) => {
				const { data } = response;
				if (data.success) {
					const cards = data.cards;
					this.setState({
						cards: cards,
						selectedCard: cards.length > 0 ? cards[0].id : null,
					});
				}
			})
			.catch((error) => {
				console.log('listCards', error);
			});
	}

	/**
	 * Handle selected card
	 * @return {void}
	 */
	onSelectedCard(id) {
		this.setState({
			selectedCard: id,
		});
	}

	/**
	 * Handle success button press
	 * @return {void}
	 */
	handleSuccessButton() {
		const { navigate } = this.props.navigation;

		if (this.state.screen == 'RegisterDocumentsStepScreen') {
			navigate('RegisterFinishedScreen');
		} else {
			navigate('ConfigScreen');
		}
	}

	/**
	 * Api to submit new subscription
	 * @return {void}
	 */
	createPlan() {
		this.setState({
			isLoading: true,
		});
		newSubscriptionPlan(
			this.route,
			this.provider.id,
			this.provider.token,
			this.state.charge_type,
			this.state.item.id,
			this.state.selectedCard,
			this.state.is_change,
		)
			.then((response) => {
				this.setState({
					isLoading: false,
				});

				const { data } = response;
				if (parse.isSuccess(data)) {
					return Alert.alert(
						'',
						strings.successText,
						[
							{
								text: 'Ok',
								onPress: () => this.handleSuccessButton(),
							},
						],
						{ cancelable: false },
					);
				}
				if (data.error == "O campo payment id é necessário quando charge type é card.") {
					return Alert.alert(
						strings.error,
						strings.payment_method,
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
				if (data.error) {
					if(data.charge_type == "pix"){
						return Alert.alert(
							strings.error,
							strings.pix_error,
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
					if(data.charge_type == "billet"){
						return Alert.alert(
							strings.error,
							strings.billet_error,
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
					return Alert.alert(
						strings.error,
						strings.cardError,
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
			})
			.catch((error) => {
				this.setState({
					isLoading: false,
				});
				console.log('newSubscriptionPlan', error);
			});
	}

	/**
	 * Api to confirm new subscription
	 * @return {void}
	 */
	alertConfirmSubscription() {
		Alert.alert(
			'',
			strings.confirmText,
			[
				{
					text: strings.no_tinny,
					onPress: () => function () { },
					style: 'cancel',
				},
				{
					text: strings.yes_tinny,
					onPress: () => this.createPlan(),
				},
			],
			{ cancelable: true },
		);
	}

	render() {
		return (
			<ScrollView>
				<View style={styles.parentContainer}>
					<Loader
						loading={this.state.isLoading}
						message={this.state.loading_message}
					/>
					<Toolbar
						back={true}
						handlePress={() => this.props.navigation.goBack()}
					/>
					<TitleHeader text={strings.checkoutSubscription} align="flex-start" />

					<View style={styles.containerDetails}>
						<View>
							<View style={styles.contentDetails}>
								<Text style={styles.planName}>{this.state.item.name}</Text>

								<View style={styles.textContainer}>
									<Text style={styles.planDetails}>
										{strings.period} {'\n'}
										<Text style={styles.fontBold}>
											{this.state.item.period} {strings.days}
										</Text>
									</Text>

									<Text style={styles.planDetails}>
										{strings.value} {'\n'}
										<Text style={styles.fontBold}>
											{this.state.item.plan_price}
										</Text>
									</Text>
								</View>
								<Text style={styles.planDetails}>
									{strings.paymentForm} {'\n'}
									<Text style={styles.fontBold}>
										{this.state.charge_type == 'billet'
											? 'Boleto'
											: 'Cartão de crédito'}
									</Text>
								</Text>
							</View>

							{this.state.charge_type != 'billet' && (
								<View>
									{
										<TouchableOpacity
											onPress={() =>
												this.props.navigation.navigate('AddCardScreenLib', {
													token: this.provider.token,
													type: "provider",
													id: this.provider.id,
													color: this.themeColor,
													appUrl: this.route
												})
											}>
											<Text
												style={[styles.addCard, { color: this.themeColor }]}>
												{strings.addCard}
											</Text>
										</TouchableOpacity>
									}
									<FlatList
										style={{ marginBottom: 30 }}
										data={this.state.cards}
										renderItem={({ item }) => (
											<TouchableOpacity
												style={styles.listTypes}
												onPress={() => this.onSelectedCard(item.id)}>
												<View style={{ flex: 0.2 }}>
													<Image
														source={this.arrayIconsType[item.card_type]}
														style={styles.cardIcon}
													/>
												</View>
												<View style={{ flex: 0.7 }}>
													<Text>**** **** **** {item.last_four}</Text>
												</View>
												{this.state.selectedCard == item.id && (
													<View
														style={[
															styles.iconCheck,
															{ backgroundColor: this.themeColor },
														]}>
														<IconCheck name="check" size={18} color="#ffffff" />
													</View>
												)}
											</TouchableOpacity>
										)}
										keyExtractor={(item, index) => `${index}`}
									/>
								</View>
							)}
						</View>

						<View style={styles.nextButton}>
							<TouchableOpacity
								style={[styles.confirmButton, { backgroundColor: this.themeColor }]}
								onPress={() => this.alertConfirmSubscription()}>
								<Text style={[styles.nextTxt, { color: this.buttonTextColor }]}>
									{strings.confirm}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
}
