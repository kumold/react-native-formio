import React from 'react';
import renderer from 'react-test-renderer';
import H3 from '../h3/H3';
import {Text} from 'react-native';

describe('H#', () => {
  describe(' H3 component', () => {
    it('Renders a basic H3 component', () => {
      const element = renderer.create(<Text><H3>Header</H3></Text>);

      expect(element).toMatchSnapshot();
    });
  });
});
