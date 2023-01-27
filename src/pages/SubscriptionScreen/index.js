import React, { Component } from 'react';
import TitleHeader from '../../components/TitleHeader';
import Toolbar from '../../components/Toolbar';
import strings from '../../lang/strings';
import styles from './SubscriptionScreenStyles';
import IconCheck from 'react-native-vector-icons/Feather';
import { getAvailablePlans, getSettingsServer } from '../../services/api';

import {
	View,
	Text,
	BackHandler,
	FlatList,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import * as parse from '../../Util/Parse';

export default class SubscriptionScreen extends Component {
	constructor(props) {
		super(props);
		this.provider = this.props.navigation.state.params.provider;
		this.route = this.props.navigation.state.params.route;
		this.themeColor = this.props.navigation.state.params.themeColor ?? '#007bff';
		this.buttonTextColor = this.props.navigation.state.params.buttonTextColor ?? '#FFF';

		this.state = {
			checkedPaymentType: 'card',
			selectedPlan: 0,
			plans: [],
			isPaymentBillet: true,
            isPaymentPix: false,
            isPaymentCard: true,
            isLoadingPayment: true,
			isLoadingPlans: true,
			screen: this.props.navigation.state.params.screen,
			is_change: this.props.navigation.state.params.is_change,
			verifyButton: 1,
		};
	}

	componentDidMount() {
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.navigation.goBack();
			return true;
		});
		this.getPlans();
        this.getSettingsMethods();
	}

	componentWillUnmount() {
		this.backHandler.remove();
	}

	/**
	 * Api to get available plans
	 * @return {void}
	 */
	getPlans() {
        this.setState({ isLoadingPlans: true});
		getAvailablePlans(this.route, this.provider.id, this.provider.token)
			.then((response) => {
				const { data } = response;
				const plans = data.plans;
				this.setState({
					verifyButton: plans.length > 0 ?  1 : 0,
					plans: plans,
					selectedPlan: plans.length > 0 ? plans[0] : {},
					isLoadingPlans: false,
					checkedPaymentForm: !this.props.navigation.state.params.is_change,
				});
			})
			.catch((error) => {
				this.setState({ isLoadingPlans: false});
				console.log('getAvailablePlans', error);
			});
	}

    /**
     * Api to get settings payments avaliables
     * @return {void}
     */
    getSettingsMethods() {
        this.setState({ isLoadingPayment: true});
        getSettingsServer(this.route)
			.then(response => {
            	const { data } = response;
				this.setState({
					isPaymentBillet: data.payment_card == 1 ? true : false,
					isPaymentCard: data.payment_card == 1 ? true : false,
					isPaymentPix: data.payment_gateway_pix,
					isLoadingPayment: false
				});
			}).catch(error => {
				this.setState({ isLoadingPayment: false});
				console.log('getPayments', error);
			});
    }

	/**
     * Toggle payment form check box
     * @return {void}
     */
    handleTogglePaymentForm() {
        this.setState({
            checkedPaymentForm: !this.state.checkedPaymentForm
        });
    }

	/**
	 * Toggle payment type check box
	 * @return {void}
	 */
	handleTogglePaymentType(type) {
		this.setState({
			checkedPaymentType: type,
		});
	}

	/**
	 * Toggle selected plan
	 * @return {void}
	 */
	handleSelectPlan(item) {
		parse.showToast(`${item.name} ${strings.selected}`, Toast.durations.SHORT);
		this.setState({
			selectedPlan: item,
		});
	}

	/**
	 * Handle confirm button press
	 * @return {void}
	 */
	handleConfirmButton() {
		const { navigate } = this.props.navigation;
		if(this.state.verifyButton == 0 ){
			Alert.alert(
				strings.error,
				strings.noPlanAvailable,
				[
					{
						text: strings.ok,
						onPress: () => function () { },
						style: 'cancel',
					},
				],
				{ cancelable: true },
			);
		}else if (!this.state.checkedPaymentForm) {
			navigate('SubscriptionFinishScreen', {
				provider: this.provider,
				route: this.route,
				item: this.state.selectedPlan,
				type: this.state.checkedPaymentType,
				screen: this.state.screen,
				is_change: this.state.is_change,
				themeColor: this.themeColor,
				buttonTextColor: this.buttonTextColor,
			});
		} else {
			if (this.state.screen == 'RegisterDocumentsStepScreen') {
				navigate('RegisterFinishedScreen');
			} else {
				navigate('ConfigScreen');
			}
		}
	}

	renderPayments() {
		if(this.state.isLoadingPayment) {
			return (
				<View style={{display: 'flex', flex: 1, justifyContent: 'center', alignContent: 'center', marginBottom: 10}}>
					<ActivityIndicator size="small" color={this.themeColor} />
				</View>
			);
		}
		return (<>
			{this.state.isPaymentPix ? 
				<CheckBox
					title={strings.pix}
					checked={this.state.checkedPaymentType == 'gatewayPix'}
					iconType="material"
					size={26}
					checkedIcon='check-circle'
					uncheckedIcon='radio-button-unchecked'
					onPress={() => this.handleTogglePaymentType('gatewayPix')}
					containerStyle={styles.checkBoxStyle}
				/>
			: null}
			{this.state.isPaymentBillet ?
				<CheckBox
					title={strings.billet}
					checked={this.state.checkedPaymentType == 'billet'}
					iconType="material"
					size={26}
					checkedIcon="check-circle"
					uncheckedIcon="radio-button-unchecked"
					onPress={() => this.handleTogglePaymentType('billet')}
					containerStyle={styles.checkBoxStyle}
				/>
			: null}
			{this.state.isPaymentCard ? 
				<CheckBox
					title={strings.card}
					checked={this.state.checkedPaymentType == 'card'}
					iconType="material"
					size={26}
					checkedIcon="check-circle"
					uncheckedIcon="radio-button-unchecked"
					onPress={() => this.handleTogglePaymentType('card')}
					containerStyle={styles.checkBoxStyle}
				/>
			: null}
		</>);
	}

	renderListPlans() {
		if(this.state.isLoadingPlans) {
			return (
			<View style={{display: 'flex', flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <ActivityIndicator size="large" color={this.themeColor} />
            </View>
			);
		}

		if(this.state.verifyButton == 0) {
			return (
				<View>
					<Text style={styles.selectPayment}>
						{strings.noPlan}
					</Text>
				</View>
			);
		}

		return (
			<FlatList
				data={this.state.plans}
				keyExtractor={(x, i) => i.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.listPlanItem}
						onPress={() => this.handleSelectPlan(item)}>
						<>
						
							<View style={{ display: 'flex', flex: 3}}>
								<Text>{ item.name }</Text>
							</View>

							{item.plan_price && 
								<View  style={{ display: 'flex', flex: 3, justifyContent: 'center', alignItems: 'flex-end'}}>
									<Text>{item.plan_price}</Text>
								</View>
							}
							<View  style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
								{this.state.selectedPlan.id == item.id && (
									<View
										style={[
											styles.iconCheck,
											{ backgroundColor: this.themeColor },
										]}>
										<IconCheck name="check" size={18} color="#ffffff" />
									</View>
								)}
							</View>
						</>
					</TouchableOpacity>
				)}
			/>
		);
	}

	render() {
		return (
			<View style={styles.parentContainer}>
				<Toolbar
					back={true}
					handlePress={() => this.props.navigation.goBack()}
				/>
				<TitleHeader text={strings.selectedAPlan} align="flex-start" />

				<View style={styles.containerCheckBox}>
					<View>
                        <CheckBox
                            title={strings.byService}
                            checked={this.state.checkedPaymentForm}
							iconType="material"
							size={26}
							checkedIcon="check-circle"
							uncheckedIcon="radio-button-unchecked"
                            onPress={() => this.handleTogglePaymentForm()}
                            containerStyle={styles.checkBoxStyle}
                        />
                        <CheckBox
                            title={strings.bySubscription}
                            checked={!this.state.checkedPaymentForm}
							iconType="material"
							size={26}
							checkedIcon="check-circle"
							uncheckedIcon="radio-button-unchecked"
                            onPress={() => this.handleTogglePaymentForm()}
                            containerStyle={styles.checkBoxStyle}
                        />
                    </View>
					{!this.state.checkedPaymentForm ?
						<View
							style={{
								flex: 1,
								justifyContent: 'space-between',
							}}>
							<View style={styles.containerList}>
								{this.renderListPlans()}
							</View>

							<View>
								{(this.state.verifyButton == 1 ) ? (
								<View>
									<Text style={styles.selectPayment}>
										{strings.paymentType}
									</Text>
									{this.renderPayments()}
								</View>
								) : null }
							</View>
						</View> 
					: null}

					<View style={styles.nextButton}>
						<TouchableOpacity
							style={[styles.nextBtn, { backgroundColor: this.themeColor }]}
							onPress={() => this.handleConfirmButton()}>
							<Text style={[styles.nextTxt, { color: this.buttonTextColor }]}>
								{strings.next}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View >
		);
	}
}
