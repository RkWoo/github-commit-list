/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { getCommits } from '../App';

test('commits list length', () => {
  return getCommits('facebook', 'react', 25)
    .then(({ data }) => {
      expect(data.length).toBe(25);
  });
});

test('commit author name', () => {
  return getCommits('facebook', 'react', 1)
    .then(({ data }) => {
      expect (data[0].commit.author.name.length).toBeGreaterThan(0);
    });
});

test('fail invalid repo name', () => {
  expect.assertions(1);
  return getCommits('facebook', 'invalid-repo', 1)
    .catch(error => {
      expect(error.message).toMatch('Not Found');
    });
});

