import React from 'react';
import renderer from 'react-test-renderer';
import H2 from '../h2/H2';
import {Text} from 'react-native';
import expect from 'expect';

describe('H#', () => {
  describe(' H2 component', () => {
    it('Renders a basic H2 component', () => {
      const element = renderer.create(<Text><H2>Content</H2></Text>);

      expect(element).toMatchSnapshot();
    });
  });
});
