import { StyleSheet, View, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import ThankYouPage from './ThankYouPage';
import Page from './Page';

export default function BasicScreen({ navigation }) {
  const video1 = {uri: 'https://firebasestorage.googleapis.com/v0/b/attuned-test-23b00.appspot.com/o/Basics%2F2.1.1-Voice_and_Identity.mp4?alt=media&token=c87eada7-b732-467e-8241-96eeaed63654'}
  // const video2 = require('../../../assets/videos/2.1.2-Voice_Physiology.mp4');
  const video2 = {uri: 'https://firebasestorage.googleapis.com/v0/b/attuned-test-23b00.appspot.com/o/Basics%2F2.1.2-Voice_Physiology.mp4?alt=media&token=44feddf8-4a31-4d70-9744-f3c4c03385c1'}



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
