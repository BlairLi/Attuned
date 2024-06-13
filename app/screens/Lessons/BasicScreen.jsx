import { StyleSheet, View, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import ThankYouPage from './ThankYouPage';
import Page from './Page';

export default function BasicScreen({ navigation }) {
  // const video1 = require('../../../assets/videos/2.1.1-Voice_and_Identity.mp4');
  // const video2 = require('../../../assets/videos/2.1.2-Voice_Physiology.mp4');


  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0}>
        {/* <View style={styles.page} key="1"> */}
        {/* <View key="1">
          <Page navigation={navigation} video={video1}/>
        </View>
        <View key="2">
          <Page navigation={navigation} video={video2}/>
        </View>
        <View key="3">
          <ThankYouPage navigation={navigation}/>
        </View> */}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
