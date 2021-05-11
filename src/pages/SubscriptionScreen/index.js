import React, {Component} from 'react';
import TitleHeader from '../../components/TitleHeader';
import Toolbar from '../../components/Toolbar';
import strings from '../../lang/strings';
import styles from './SubscriptionScreenStyles';
import IconCheck from 'react-native-vector-icons/Feather';
import {getAvailablePlans} from '../../services/api';

import {
	View,
	Text,
	BackHandler,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
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
			checkedPaymentForm: !this.props.navigation.state.params.is_change,
			checkedPaymentType: 'billet',
			selectedPlan: 0,
			plans: [],
			screen: this.props.navigation.state.params.screen,
			is_change: this.props.navigation.state.params.is_change,
		};
	}

	componentDidMount() {
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.navigation.goBack();
			return true;
		});
		this.getPlans();
	}

	componentWillUnmount() {
		this.backHandler.remove();
	}

	/**
	 * Api to get available plans
	 * @return {void}
	 */
	getPlans() {
		getAvailablePlans(this.route, this.provider.id, this.provider.token)
			.then((response) => {
				const {data} = response;
				const plans = data.plans;
				this.setState({
					plans: plans,
					selectedPlan: plans.length > 0 ? plans[0] : {},
				});
			})
			.catch((error) => {
				console.log('getAvailablePlans', error);
			});
	}

	/**
	 * Toggle payment form check box
	 * @return {void}
	 */
	handleTogglePaymentForm() {
		this.setState({
			checkedPaymentForm: !this.state.checkedPaymentForm,
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
		const {navigate} = this.props.navigation;
		if (!this.state.checkedPaymentForm) {
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

	render() {
		return (
			<View style={styles.parentContainer}>
				<Toolbar
					back={true}
					handlePress={() => this.props.navigation.goBack()}
				/>
				<TitleHeader text={strings.paymentForm} align="flex-start" />

				<View style={styles.containerCheckBox}>
					<View>
						<CheckBox
							title={strings.byService}
							checked={this.state.checkedPaymentForm}
							checkedIcon="dot-circle-o"
							uncheckedIcon="circle-o"
							onPress={() => this.handleTogglePaymentForm()}
							containerStyle={styles.checkBoxStyle}
						/>
						<CheckBox
							title={strings.bySubscription}
							checked={!this.state.checkedPaymentForm}
							checkedIcon="dot-circle-o"
							uncheckedIcon="circle-o"
							onPress={() => this.handleTogglePaymentForm()}
							containerStyle={styles.checkBoxStyle}
						/>
					</View>

					{!this.state.checkedPaymentForm && (
						<View
							style={{
								flex: 1,
								justifyContent: 'space-between',
							}}>
							<View style={styles.containerList}>
								<Text style={styles.listPlanTitle}>
									{strings.selectedAPlan}
								</Text>

								<FlatList
									data={this.state.plans}
									keyExtractor={(x, i) => i.toString()}
									renderItem={({item}) => (
										<TouchableOpacity
											style={styles.listPlanItem}
											onPress={() => this.handleSelectPlan(item)}>
											<Text>{item.name}</Text>
											{this.state.selectedPlan.id == item.id && (
												<View
													style={[
														styles.iconCheck,
														{backgroundColor: this.themeColor},
													]}>
													<IconCheck name="check" size={18} color="#ffffff" />
												</View>
											)}
										</TouchableOpacity>
									)}
								/>
							</View>

							<View>
								<View>
									<Text style={styles.selectPayment}>
										{strings.paymentType}
									</Text>
									<CheckBox
										title={strings.billet}
										checked={this.state.checkedPaymentType == 'billet'}
										checkedIcon="dot-circle-o"
										uncheckedIcon="circle-o"
										onPress={() => this.handleTogglePaymentType('billet')}
										containerStyle={styles.checkBoxStyle}
									/>
									<CheckBox
										title={strings.card}
										checked={this.state.checkedPaymentType == 'card'}
										checkedIcon="dot-circle-o"
										uncheckedIcon="circle-o"
										onPress={() => this.handleTogglePaymentType('card')}
										containerStyle={styles.checkBoxStyle}
									/>
								</View>
							</View>
						</View>
					)}

					<View style={styles.nextButton}>
						<TouchableOpacity
							style={[styles.nextBtn, {backgroundColor: this.themeColor}]}
							onPress={() => this.handleConfirmButton()}>
							<Text style={[styles.nextTxt, {color: this.buttonTextColor}]}>
								{strings.next}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
