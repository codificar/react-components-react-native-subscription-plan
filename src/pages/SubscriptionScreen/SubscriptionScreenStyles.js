import {StyleSheet, PixelRatio, Dimensions} from 'react-native';

const cardWidth = Dimensions.get('window').width - 50;

export default StyleSheet.create({
	parentContainer: {
		flex: 1,
		backgroundColor: '#FBFBFB',
		padding: 0,
	},
	containerList: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#FBFBFB',
		padding: 0,
		marginTop: 20
	},
	listPlanTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		paddingVertical: 10,
	},
	selectPayment: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		paddingVertical: 10,
	},
	listPlanItem: {
		width: '98%',
		backgroundColor: '#fff',
		borderRadius: 4,
		elevation: 3,
		paddingLeft: 20,
		paddingRight: 10,
		paddingVertical: 10,
		marginBottom: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	planDetails: {
		fontSize: 16,
		marginBottom: 5,
	},
	statusExpired: {
        backgroundColor: '#ff4040',
        width: 70,
        textAlign: 'center',
        padding: 5,
        borderRadius: 5,
        color: '#fff',
        fontWeight: 'bold'
    },
    billetLink: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 5,
        color: '#007bff'
    },
    pixView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        padding: 5,
        borderRadius: 5,
        color: '#FFF'
    },
    pixLink: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 5,
        color: '#007bff'
    },
    morePlans: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#DDD',
        borderRadius: 5,
        marginBottom: 30,
        padding: 15,
        marginLeft: 20,
        marginRight:20
    },
    statusActive: {
        backgroundColor: 'green',
        width: 70,
        textAlign: 'center',
        padding: 2,
        borderRadius: 5,
        color: '#fff',
        fontWeight: 'bold',
    },
	planDetailsTitle: {
		fontSize: 20,
		marginBottom: 15,
	},
	containerDetails: {
		flex: 1,
		backgroundColor: '#FBFBFB',
		padding: 0,
		paddingHorizontal: 25,
		justifyContent: 'space-between',
	},
	confirmButton: {
		backgroundColor: '#007bff',
		padding: 15,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	nextBtn: {
		backgroundColor: '#007bff',
		padding: 15,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	nextTxt: {
		fontSize: 17,
		fontWeight: 'bold',
		color: 'white',
	},
	addCard: {
		color: '#007bff',
		fontWeight: 'bold',
		paddingVertical: 10,
		fontSize: 16,
	},
	listTypes: {
		margin: 5,
		width: '98%',
		backgroundColor: '#fff',
		borderRadius: 4,
		borderWidth: 0,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 3,
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconCheck: {
		flex: 0.1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#007bff',
		borderRadius: 12,
        height: 20,
        width: 20
	},
	statusOpen: {
		backgroundColor: '#ff4040',
		width: 70,
		textAlign: 'center',
		padding: 5,
		borderRadius: 5,
		color: '#fff',
		fontWeight: 'bold',
	},
	statusPaid: {
		backgroundColor: 'green',
		width: 70,
		textAlign: 'center',
		padding: 5,
		borderRadius: 5,
		color: '#fff',
		fontWeight: 'bold',
	},
	checkBoxStyle: {
		borderWidth: 0,
		paddingLeft: 0,
		marginLeft: 0,
	},
	containerCheckBox: {
		flex: 1,
		padding: 0,
		paddingHorizontal: 25,
		justifyContent: 'space-between',
	},
	contentDetails: {
		backgroundColor: '#FFF',
		padding: 25,
		borderRadius: 5,
		elevation: 1
	},
	planName: {
		fontWeight: 'bold',
		fontSize: 18,
		paddingVertical: 10,
	},
	textContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	fontBold: {
		fontWeight: 'bold',
	},
	cardIcon: {
		width: 50,
		height: 30,
		resizeMode: 'contain',
	},
	nextButton: {
		marginTop: 15,
		marginBottom: 15,
	},
	detailsBox: {
		backgroundColor: '#FFF',
		padding: 25,
		borderRadius: 5,
        elevation: 1
	},
	textDetailsBox: {
		fontWeight: 'bold',
		fontSize: 18,
		paddingVertical: 10,
	},
	billetView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
	},
	optionsView: {
		flexDirection: 'row',
		marginTop: 20,
		justifyContent: 'space-around',
	},
	noSubscription: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
