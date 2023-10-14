import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Login from './src/pages/Login';
import TopBar from './src/component/TopBar';
import Tasks from './src/pages/Tasks';


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Login /> */}
      <TopBar />
      <Tasks />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});