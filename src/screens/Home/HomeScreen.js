import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Button from '../../lib/components/Button';
import useInAppPurchase from '../../lib/custom_hooks/useInAppPurchase';

const HomeScreen = () => {
  const {
    isFullAppPurchased,
    connectionErrorMsg,
    prePurchaseInApp0,
    prePurchaseInApp1,
    prePurchaseInApp2,
    prePurchaseInApp3,
    prePurchaseInApp4,
    prePurchaseInApp5,
    prePurchaseInApp6,
    prePurchaseInApp7,
    prePurchaseInApp8,
    prePurchaseInApp9,
    resetAllPurchase,
    listItem,
  } = useInAppPurchase();

  return (
    <View style={styles.container}>
      {isFullAppPurchased ? (
        <Text style={{...styles.msg, color: 'green'}}>
          Full app access available!!!
        </Text>
      ) : null}
      {listItem && listItem.length > 0 ? (
        <Button
          title={
            listItem[0].title.replace('(Betbrain)', '') +
            ' ' +
            listItem[0].localizedPrice
          }
          handlePress={prePurchaseInApp0}
        />
      ) : null}
      {listItem && listItem.length > 0 ? (
        <Button
          title={
            listItem[1].title.replace('(Betbrain)', '') +
            ' ' +
            listItem[1].localizedPrice
          }
          handlePress={prePurchaseInApp1}
        />
      ) : null}
      {listItem && listItem.length > 0 ? (
        <Button
          title={
            listItem[2].title.replace('(Betbrain)', '') +
            ' ' +
            listItem[2].localizedPrice
          }
          handlePress={prePurchaseInApp2}
        />
      ) : null}
      {listItem && listItem.length > 0 ? (
        <Button
          title={
            listItem[3].title.replace('(Betbrain)', '') +
            ' ' +
            listItem[3].localizedPrice
          }
          handlePress={prePurchaseInApp3}
        />
      ) : null}
      {listItem && listItem.length > 0 ? (
        <Button
          title={
            listItem[4].title.replace('(Betbrain)', '') +
            ' ' +
            listItem[4].localizedPrice
          }
          handlePress={prePurchaseInApp4}
        />
      ) : null}
      {listItem && listItem.length > 0 ? (
        <Button
          title={
            listItem[5].title.replace('(Betbrain)', '') +
            ' ' +
            listItem[5].localizedPrice
          }
          handlePress={prePurchaseInApp5}
        />
      ) : null}
      {listItem && listItem.length > 0 ? (
        <Button
          title={
            listItem[6].title.replace('(Betbrain)', '') +
            ' ' +
            listItem[6].localizedPrice
          }
          handlePress={prePurchaseInApp6}
        />
      ) : null}
      {listItem && listItem.length > 0 ? (
        <Button
          title={
            listItem[7].title.replace('(Betbrain)', '') +
            ' ' +
            listItem[7].localizedPrice
          }
          handlePress={prePurchaseInApp7}
        />
      ) : null}
      {listItem && listItem.length > 0 ? (
        <Button
          title={
            listItem[8].title.replace('(Betbrain)', '') +
            ' ' +
            listItem[8].localizedPrice
          }
          handlePress={prePurchaseInApp8}
        />
      ) : null}
      {listItem && listItem.length > 0 ? (
        <Button
          title={
            listItem[9].title.replace('(Betbrain)', '') +
            ' ' +
            listItem[9].localizedPrice
          }
          handlePress={prePurchaseInApp9}
        />
      ) : null}
      {/*<Button title="1 Turn" handlePress={prePurchaseInApp0} />*/}
      {/*<Button title="5 Turns" handlePress={prePurchaseInApp1} />*/}
      {/*<Button title="10 Turns" handlePress={prePurchaseInApp2} />*/}
      <Button title="Use all Turns" handlePress={resetAllPurchase} />
      {connectionErrorMsg ? (
        <Text style={{...styles.msg, color: 'red'}}>{connectionErrorMsg}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 16,
  },
  msg: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 16,
  },
});
export default HomeScreen;
