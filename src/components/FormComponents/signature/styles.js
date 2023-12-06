import {StyleSheet} from  'react-native';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

const border = '#000033';

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    marginTop: 10,
  },
  modalFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  modalFooterText: {
    fontSize: 18,
    marginLeft: 20,
  },
  signature: {
    height: 150,
    marginLeft: 10,
    width: 300,
  },
  signatureButton: {
    marginHorizontal: 0,
    marginTop: isTablet ? 0 : 10,
    paddingHorizontal: 0,
    width: 150,
  },
  signaturePad: {
    borderColor: border,
    borderWidth: 1,
    flex: 1,
  },
  signaturePadWrapper: {
    flex: 1,
  },
  signatureWrapper: {
    marginTop: 10,
  },
});

export default styles;
