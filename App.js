import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

const App: () => React$Node = () => {
  const [repoOwnerText, setRepoOwnerText] = useState('facebook');
  const [repoNameText, setRepoNameText] = useState('react');
  const [commitsResult, setCommitsResult] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  return (
    <View style={{flex:1, marginHorizontal:10}}>
      <Text style={{fontSize:16, fontWeight:'bold', marginTop:10}}>
        Select a GitHub repository
       </Text>
      <Text>
        (https://github.com/
        <Text style={styles.boldText}>owner</Text>
        /
        <Text style={styles.boldText}>name</Text>
        )
      </Text>
      <View style={{flexDirection:'row', marginTop:4}}>
        <View style={{flex:1, marginRight:10}}>
          <Text style={styles.boldText}>owner</Text>
          <TextInput
            style={styles.repoInput}
            onChangeText={(text) => setRepoOwnerText(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
            placeholder='repository owner'
          >
            {repoOwnerText}
          </TextInput>
        </View>
        <View style={{flex:1, marginLeft:10}}>
          <Text style={styles.boldText}>name</Text>
          <TextInput
            style={styles.repoInput}
            onChangeText={(text) => setRepoNameText(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
            placeholder='repository name'
          >
            {repoNameText}
          </TextInput>
        </View>
      </View>
      <View style={{marginVertical:10}}>
        <Button
          title='Get Commits'
          disabled={isWaiting || repoNameText.length==0 || repoOwnerText==0}
          onPress={() => onPressGetCommits()} />
      </View>
      { isWaiting &&
        <ActivityIndicator
          size='large'
          color='blue'
          style={{flex:1}}
        />
      }
      { !isWaiting && commitsResult!==null && commitsResult.length===0 &&
        <Text>No commits found</Text>
      }
      <FlatList
        style={{flex:1}}
        data={commitsResult}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item) => item.sha}
      />

    </View>

  );

  function onPressGetCommits() {
    Keyboard.dismiss()
    setCommitsResult(null)
    setIsWaiting(true)

    getCommits(repoOwnerText, repoNameText, 25)
      .then(({ data }) => {
        setCommitsResult(data)
      })
      .catch((error) => {
        Alert.alert(error.message, 'Unable to get the commit list. Check for correct repository owner and name.')
      })
      .finally(() => setIsWaiting(false))
  }

  function renderItem(item) {
    return (
      <View style={styles.commitItem}>
        <Text style={styles.boldText}>Author</Text>
        <Text style={styles.resultInfo}>{item.commit.author.name}</Text>

        <Text style={styles.boldText}>SHA</Text>
        <Text style={styles.resultInfo}>{item.sha}</Text>

        <Text style={styles.boldText}>Message</Text>
        <Text style={styles.resultInfo}>{item.commit.message}</Text>
      </View>
    )
  }

};

export const getCommits = (repoOwner, repoName, maxCount) => {
  return octokit.repos.listCommits(
    {
      owner: repoOwner,
      repo: repoName,
      per_page: maxCount,
    })
}

const styles = StyleSheet.create({
  repoInput: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 4,
  },
  commitItem: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: 'lightgray',
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  resultInfo: {
    paddingLeft: 10,
  },
});

export default App;
