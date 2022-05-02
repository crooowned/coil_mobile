import firestore from '@react-native-firebase/firestore';

export default class AccountDataService{
    static getAccountData(uid: string){
        return firestore().collection('accounts').doc(uid).get();
    }

    static async hasSetupAccount(uid: string){
        return (await firestore().collection('accounts').doc(uid).get()).exists;
    }

    static async setupAccount(uid: string, refreshToken: string){
        return await firestore().collection('accounts').doc(uid).set({
            refreshToken: refreshToken,
            createdAt: new Date(),
            isWorking: null
        });
    }

    


}