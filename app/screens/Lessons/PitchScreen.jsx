import { StyleSheet, View, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import ThankYouPage from './ThankYouPage';
import Page from './Page';

export default function PitchScreen({ navigation }) {
  const video1 = {uri: 'https://firebasestorage.googleapis.com/v0/b/attuned-test-23b00.appspot.com/o/Pitch%2FPitch_1-start.mp4?alt=media&token=b0d56c6b-e47c-4d76-9b55-d61bdece39e8'}
  // const video2 = require('../../../assets/videos/Pitch/Pitch_3(v.2)+End_of_Pitch.mp4');
  const video2 = {uri: 'https://firebasestorage.googleapis.com/v0/b/attuned-test-23b00.appspot.com/o/Pitch%2FPitch_3(v.2)%2BEnd_of_Pitch.mp4?alt=media&token=2e31b2f2-2a4f-4087-b1f6-3f0dc1db2c01'}



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
