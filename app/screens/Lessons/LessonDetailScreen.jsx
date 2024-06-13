import { StyleSheet, View, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import Page from './Page';
import ThankYouPage from './ThankYouPage';

export default function LessonDetailScreen({ navigation }) {
  const video1 = require('../../../assets/videos/1.2_Icon_Video.mp4');
  const video2 = require('../../../assets/videos/1.3_Icon_Video.mp4');
  const video3 = require('../../../assets/videos/1.4_Disclaimer_Video.mp4');


  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0}>
        {/* <View style={styles.page} key="1"> */}
        <View key="1">
          <Page navigation={navigation} video={video1}/>
        </View>
        <View key="2">
          <Page navigation={navigation} video={video2}/>
        </View>
        <View key="3">
          <Page navigation={navigation} video={video3}/>
        </View>
        <View key="4">
          <ThankYouPage navigation={navigation}/>
        </View>
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
