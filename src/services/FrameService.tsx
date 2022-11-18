import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { environment } from "../globals/environment";
import { IFrame } from "../objs/interfaces/IFrame";

export default class FrameService{
    
    static async getFrames(uid: string, driveId: string) : Promise<IFrame[]>{
        let frames: IFrame[] = [];
        let cache = await this.getCache<IFrame[]>(uid, driveId);
        if(!cache){
            (await firestore().collection('accounts').doc(uid).collection('drives').doc(driveId).collection('frames').get()).forEach(frame=>{
                frames.push(frame.data() as IFrame);
            });
            this.setCache(uid, driveId, frames);
            return frames;
        } else {
            console.debug('got frames:' + cache.length + ' from cache');
            return cache;
        }
    }

    static async getCache<T>(uid: string, driveId: string) : Promise<T|null>{
        let json = await AsyncStorage.getItem(uid + "/" + driveId + "/frames");
        if(json)
            return JSON.parse(json) as T;
        else
            return null;
    }

    static async setCache(uid: string, driveId: string, result: IFrame[]){
        console.debug("saving frames:"+result.length+" to cache");
        return await AsyncStorage.setItem(uid + "/" + driveId + "/frames", JSON.stringify(result));
    }
}