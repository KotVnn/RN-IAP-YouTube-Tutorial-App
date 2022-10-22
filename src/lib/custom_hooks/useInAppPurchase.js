import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  consumePurchaseAndroid,
  getAvailablePurchases,
  requestPurchase,
  useIAP,
} from 'react-native-iap';
import {
  STORAGE_KEYS,
  storeBooleanData,
  getBooleanData,
} from '../functions/asyncStorage';
import {InAppPurchase} from 'react-native-iap/src/types';

const {IS_FULL_APP_PURCHASED} = STORAGE_KEYS;

// Play store item Ids
const itemSKUs = Platform.select({
  android: [
    '0_gem',
    '1_gem',
    '2_gem',
    '3_gem',
    '4_gem',
    '5_gem',
    '6_gem',
    '7_gem',
    '8_gem',
    '9_gem',
  ],
});

const useInAppPurchase = () => {
  const [isFullAppPurchased, setIsFullAppPurchased] = useState(false);
  const [connectionErrorMsg, setConnectionErrorMsg] = useState('');
  const [listItem, setListItem] = useState([]);

  const {
    connected,
    products,
    getProducts,
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  // Get data after initial render
  useEffect(() => {
    getBooleanData(IS_FULL_APP_PURCHASED).then((data) => {
      setIsFullAppPurchased(data);
    });
  }, []);

  // Get products from play store.
  useEffect(() => {
    if (connected) {
      getProducts(itemSKUs).then();
      console.log('Getting products...');
      setListItem(products);
    }
    console.log(products);
  }, [connected, getProducts, products]);

  // currentPurchase will change when the requestPurchase function is called. The purchase then needs to be checked and the purchase acknowledged so Google knows we have awared the user the in-app product.
  useEffect(() => {
    const checkCurrentPurchase = async (purchase) => {
      if (purchase) {
        const receipt = purchase.transactionReceipt;
        console.clear();
        console.log('RECEIPT: ', receipt);
        if (purchase && purchase.purchaseToken) {
          consumePurchaseAndroid(purchase.purchaseToken).then((purchaseRs) => {
            console.log('consumePurchaseAndroid', purchaseRs);
          });
        }
        // if (receipt) {
        //   // Give full app access
        //   setAndStoreFullAppPurchase(true);
        //   try {
        //     const ackResult = await finishTransaction(purchase);
        //     console.log('ackResult: ', ackResult);
        //   } catch (ackErr) {
        //     // We would need a backend to validate receipts for purhcases that pended for a while and were then declined. So I'll assume most purchase attempts go through successfully (OK ackResult) & take the hit for the ones that don't (user will still have full app access).
        //     console.log('ackError: ', ackErr);
        //   }
        // }
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase, finishTransaction]);

  // If user reinstalls app, then they can press purchase btn (SettingsScreen)  to getfull app without paying again.
  useEffect(() => {
    if (currentPurchaseError) {
      if (
        currentPurchaseError.code === 'E_ALREADY_OWNED' &&
        !isFullAppPurchased
      ) {
        setAndStoreFullAppPurchase(true);
        resetAllPurchase();
      }
    }
  }, [currentPurchaseError, isFullAppPurchased]);

  const purchaseFullApp = async (itemNum: number) => {
    // Reset error msg
    if (connectionErrorMsg !== '') setConnectionErrorMsg('');
    if (!connected) {
      setConnectionErrorMsg('Please check your internet connection');
    }
    // If we are connected & have products, purchase the item. Gohas no inteogle will handle if user rnet here.
    else if (products?.length > 0) {
      requestPurchase(itemSKUs[itemNum]).catch((error) => {
        console.log(error.message);
      });
      console.log('Purchasing products...');
    }
    // If we are connected but have no products returned, try to get products and purchase.
    else {
      console.log('No products. Now trying to get some...');
      try {
        await getProducts(itemSKUs);
        requestPurchase(itemSKUs[itemNum]).catch((error) => {
          console.log(error.message);
        });
        console.log('Got products, now purchasing...');
      } catch (error) {
        setConnectionErrorMsg('Please check your internet connection');
        console.log('Everything failed. Error: ', error);
      }
    }
  };

  const prePurchaseInApp0 = () => {
    purchaseFullApp(0);
  };

  const prePurchaseInApp1 = () => {
    purchaseFullApp(1);
  };

  const prePurchaseInApp2 = () => {
    purchaseFullApp(2);
  };

  const prePurchaseInApp3 = () => {
    purchaseFullApp(3);
  };

  const prePurchaseInApp4 = () => {
    purchaseFullApp(4);
  };

  const prePurchaseInApp5 = () => {
    purchaseFullApp(5);
  };

  const prePurchaseInApp6 = () => {
    purchaseFullApp(6);
  };

  const prePurchaseInApp7 = () => {
    purchaseFullApp(7);
  };

  const prePurchaseInApp8 = () => {
    purchaseFullApp(8);
  };

  const prePurchaseInApp9 = () => {
    purchaseFullApp(9);
  };

  const setAndStoreFullAppPurchase = (boolean) => {
    setIsFullAppPurchased(boolean);
    storeBooleanData(IS_FULL_APP_PURCHASED, boolean);
  };

  const resetAllPurchase = async () => {
    const availablePurchase = await getAvailablePurchases();
    console.clear();
    console.log('availablePurchase: ', availablePurchase);
    if (availablePurchase && availablePurchase.length) {
      for (const purChase: InAppPurchase of availablePurchase) {
        consumePurchaseAndroid(purChase.purchaseToken);
      }
    }
    const _purchase = await getAvailablePurchases();
    console.info('_purchase: ', _purchase);
  };

  return {
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
  };
};

export default useInAppPurchase;
