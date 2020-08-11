import { StyleSheet, Dimensions } from 'react-native';

let dimensions = {                                //get dimensions of the device to use in view styles
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };

const styles = StyleSheet.create({
    max: {
        flex: 1,
        backgroundColor: 'black',
    },
    buttonHolder: {
        height: 100,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    submitButton: {
        paddingHorizontal: 60,
        paddingVertical: 10,
        backgroundColor: '#0093E9',
        borderRadius: 25,
      },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'green',
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
    },
    fullView: {
        width: dimensions.width,
        height: dimensions.height,
    },
    halfViewRow: {
        flex: 1 / 2,
        flexDirection: 'row',
    },
    full: {
        flex: 1,
    },
    half: {
        flex: 1 / 2,
    },
    localVideoStyle: {
        width: 120,
        height: 150,
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 100,
    },
    noUserText: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: 'white',
    },
    buttonBar: {
        height: 80,
        display: 'flex',
        width: "75%",
        borderRadius: 80,
        //width: 100%,
        position: 'absolute',
        bottom: 100,
        left: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignContent: 'center',
        zIndex: 1,

    },
    iconStyle: {
        fontSize: 40,
        paddingTop: 15,
        paddingLeft: 25,
        paddingRight: 15,
        paddingBottom: 15,
        height: 80,
        width: 80,
        //borderRadius: 80,
        borderWidth: 2,
        alignContent: 'center',
        justifyContent: 'center'
        
    },
    testStyle: {
        height: 80,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        position: 'absolute',
        bottom: 0,
        top: 500,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    circle: {
        height: 80,
        width: 80,
        borderRadius: 40,
    }
});

export default styles;