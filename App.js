import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
} from 'react-native';


const App: () => React$Node = () => {
  const [repoOwnerText, setRepoOwnerText] = useState('');
  const [repoNameText, setRepoNameText] = useState('');
  
  return (
    <View style={{flex:1}}>
      <TextInput
        style={styles.repoInput}
        onChangeText={(text) => setRepoOwnerText(text)}
        placeholder='repository owner'
      >
        {repoOwnerText}
      </TextInput>
      <TextInput
        style={styles.repoInput}
        onChangeText={(text) => setRepoNameText(text)}
        placeholder='repository name'
      >
       {repoNameText}
      </TextInput>
      <Button
        title='Get Commits'
        onPress={() => onPressGetCommits()} />
      <FlatList
        style={{flex:1}}
        data={null}
        renderItem={({item}) => renderItem(item)}
      />

    </View>

  );

  function onPressGetCommits() {
  }

  function renderItem(item) {
    return (
      <View/>
    )
  }


};

const styles = StyleSheet.create({
  repoInput: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
});

export default App;