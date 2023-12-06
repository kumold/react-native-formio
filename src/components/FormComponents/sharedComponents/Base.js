import React from 'react';
import {deepEqual} from '../../../util';
import PropTypes from 'prop-types';

export default class BaseComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // If a new value is set within state, re-render.
    if (this.state && Object.prototype.hasOwnProperty.call(this.state,'value') && this.state.value !== nextState.value) {
      return true;
    }

    // If the pristineness changes without a value change, re-render.
    if (this.state && Object.prototype.hasOwnProperty.call(this.state, 'isPristine') && this.state.isPristine !== nextState.isPristine) {
      return true;
    }

    // If a new value is passed in, re-render.
    if (this.props.value !== nextProps.value) {
      return true;
    }

    // If the component definition change, re-render.
    if (!deepEqual(this.props.component, nextProps.component)) {
      return true;
    }

    // If component has a custom data source, always recalculate
    if (Object.prototype.hasOwnProperty.call(this.props.component,'refreshOn') && this.props.component.refreshOn) {
      return true;
    }

    if (this.state && Object.prototype.hasOwnProperty.call(this.state,'searchTerm') && this.state.searchTerm !== nextState.searchTerm) {
      return true;
    }

    if (this.state && Object.prototype.hasOwnProperty.call(this.state,'selectItems') && !deepEqual(this.state.selectItems, nextState.selectItems)) {
      return true;
    }

    if (this.state && Object.prototype.hasOwnProperty.call(this.state,'open') && this.state.open !== nextState.open) {
      return true;
    }

    if (this.state && Object.prototype.hasOwnProperty.call(this.state,'showSignaturePad') && this.state.showSignaturePad !== nextState.showSignaturePad) {
      return true;
    }

    if (Object.prototype.hasOwnProperty.call(this.props.component,'disableOnInvalid') && this.props.isFormValid !== nextProps.isFormValid) {
      return true;
    }

    return false;
  }
}

BaseComponent.propTypes = {
  component: PropTypes.any,
  isFormValid: PropTypes.any,
  value: PropTypes.any
};
