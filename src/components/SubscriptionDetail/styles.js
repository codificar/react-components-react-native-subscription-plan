import {StyleSheet, PixelRatio, Dimensions} from 'react-native';

const cardWidth = Dimensions.get('window').width - 50;

export default StyleSheet.create({
	statusExpired: {
        backgroundColor: '#ff4040',
        width: 80,
        textAlign: 'center',
        padding: 5,
        borderRadius: 5,
        color: '#fff',
        fontWeight: 'bold'
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
	noSubscription: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerDetails: {
		flex: 1,
		backgroundColor: '#FBFBFB',
		padding: 0,
		paddingHorizontal: 25,
		justifyContent: 'space-between',
	},

	detailsBox: {
		backgroundColor: '#FFF',
		padding: 25,
		borderRadius: 5,
        elevation: 1
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
	textDetailsBox: {
		fontWeight: 'bold',
		fontSize: 18,
		paddingVertical: 10,
	},
	planDetails: {
		fontSize: 16,
		marginBottom: 5,
	},
	fontBold: {
		fontWeight: 'bold',
	},
	billetView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
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
	optionsView: {
		flexDirection: 'row',
		marginTop: 20,
		justifyContent: 'space-around',
	},
});
