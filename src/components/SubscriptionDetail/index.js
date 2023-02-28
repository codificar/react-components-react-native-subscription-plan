import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import strings from '../../lang/strings';

import styles from './styles';


const renderStatus = (signatureDetail) => {
    if (signatureDetail.expired) {
        return (<Text style={styles.statusExpired}>{strings.expired}</Text>);
    } else if (signatureDetail.is_cancelled == 1) {
        return (<Text style={styles.statusExpired}>{strings.cancelled}</Text>);
    } else if (signatureDetail.activity == 0) {
        return (<Text style={styles.statusExpired}>{strings.inactive}</Text>);
    } else {
        return (<Text style={styles.statusActive}>{strings.active}</Text>);
    }
}

export default function SubscriptionDetail({ isLoading, signatureDetail, handleClickBillet, handleClickPix, alertCancelSubscription, themeColor }) {

    if(isLoading) {
        return (
            <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <ActivityIndicator size="large" color={themeColor} />
            </View>
        );
    }

    if(!signatureDetail || !signatureDetail.paid_status) {
        return (
            <View style={styles.noSubscription}>
                <Text>{strings.no_subscription}</Text>
            </View>
        );
    }

    
    return (
        <View style={styles.containerDetails}>
            <View style={styles.detailsBox}>
                <Text
                    style={[
                        signatureDetail.paid_status != 'paid'
                            ? styles.statusOpen
                            : styles.statusPaid,
                    ]}>
                    {signatureDetail.paid_status != 'paid'
                        ? strings.open
                        : strings.paid}
                </Text>

                <Text style={styles.textDetailsBox}>
                    {signatureDetail.plan_name}
                </Text>

                <Text style={styles.planDetails}>
                    {strings.due} {'\n'}
                    <Text style={styles.fontBold}>
                        {signatureDetail.next_expiration}
                    </Text>
                </Text>
                <View style={styles.planDetails}>
                    <Text>
                        Status:
                    </Text>
                    {renderStatus(signatureDetail)}
                </View>
                
                {signatureDetail.paid_status == 'waiting_payment' && 
                    !signatureDetail.is_pix ?
                    (<View style={styles.billetView}>
                        <TouchableOpacity
                            onPress={() => handleClickBillet()}
                        >
                            <Text style={styles.billetLink}>
                                {strings.accessBillet}
                            </Text>
                        </TouchableOpacity>
                    </View>) : null
                }
                {signatureDetail.paid_status == 'waiting_payment' &&
                    signatureDetail.is_pix ?
                    (<View style={styles.pixView}>
                        <TouchableOpacity
                            onPress={() => handleClickPix()}
                        >
                            <Text style={styles.pixLink}>
                                {strings.accessQRCodePix}
                            </Text>
                        </TouchableOpacity>
                    </View>): null
                }

                <View style={styles.optionsView}>
                    {!signatureDetail.is_cancelled &&
                        <TouchableOpacity
                                onPress={() => alertCancelSubscription()}>
                            <Text style={styles.cancelText}>
                                {strings.cancel}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
}
