import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SingleRepositoryView from './SingleRepositoryView';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CreateReview from './CreateReview';
import MyReviewList from './MyReviewList';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='/repositories/:id' element={<SingleRepositoryView />} exact />
        <Route path='/signin' element={<SignIn />} exact />
        <Route path='/signup' element={<SignUp />} exact />
        <Route path='/myReviews' element={<MyReviewList />} exact />
        <Route path='/createReview' element={<CreateReview />} exact />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
