import firestore, { firebase } from '@react-native-firebase/firestore';
import Drive from '../objs/impl/Drive';
import { IDrive } from '../objs/interfaces/IDrive';
import { IFrame } from '../objs/interfaces/IFrame';

export default class DriveService{
    static async getDrives(uid: string) : Promise<Drive[]>{
        let drives: Drive[] = [];
        (await firestore().collection('accounts').doc(uid).collection('drives').orderBy(firebase.firestore.FieldPath.documentId()).get()).forEach(drive=>{
            let driveProto = drive.data() as IDrive;
            driveProto.timestamp = new Date(Number(drive.id));
            drives.push(new Drive(drive.id, driveProto));
        });
        return drives.reverse();
    }


}