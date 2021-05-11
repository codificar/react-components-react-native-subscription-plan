import {StyleSheet, PixelRatio, Dimensions, Platform} from 'react-native';

const cardWidth = Dimensions.get('window').width - 50;

export default StyleSheet.create({
	//...ApplicationStyles.screen,
	parentContainer: {
		flex: 1,
		backgroundColor: '#FBFBFB',
		padding: 0,
		marginTop: Platform.OS === 'android' ? 0 : 25,
	},
	avaliation: {
		flexDirection: 'row',
	},
	txtRate: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 55,
	},
	cardPerfil: {
		width: cardWidth,
		marginBottom: 20,
		height: 100,
		backgroundColor: '#fff',
		borderRadius: 4,
		elevation: 3,
		paddingHorizontal: 16,
		alignItems: 'center',
		flexDirection: 'row',
	},
	information: {
		justifyContent: 'center',
		marginLeft: 20,
	},
	subtitle: {
		color: '#222',
		fontWeight: 'bold',
		fontSize: 16,
		marginBottom: 15,
	},
	cardAddress: {
		width: cardWidth,
		backgroundColor: '#fff',
		borderRadius: 4,
		elevation: 3,
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginBottom: 20,
	},
	cardContact: {
		width: cardWidth,
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
	leftContact: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	shield: {
		width: 22,
		height: 26,
		marginVertical: 5,
		marginRight: 20,
	},
	idioma: {
		width: 22,
		height: 25,
		marginVertical: 5,
		marginRight: 20,
	},
});
