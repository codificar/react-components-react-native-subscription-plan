import ConfigScreen from './src/pages/ConfigScreen';

import SubscriptionScreen from './src/pages/SubscriptionScreen';
import SubscriptionDetailsScreen from './src/pages/SubscriptionDetailsScreen';
import SubscriptionFinishScreen from './src/pages/SubscriptionFinishScreen';


const signatureNavigation = {
  ConfigScreen: {screen: ConfigScreen},
  SubscriptionScreen: {screen: SubscriptionScreen},
  SubscriptionDetailsScreen: {screen: SubscriptionDetailsScreen},
  SubscriptionFinishScreen: {screen: SubscriptionFinishScreen}
}

export default signatureNavigation;

export { newSubscriptionPlan }  from './src/services/api'
export { subscriptionDetails } from './src/services/api'
export { addCard } from './src/services/api'
export { listCards } from './src/services/api'
export { cancelSubscription } from './src/services/api'
export { plataformRequireSubscription } from './src/services/api'
