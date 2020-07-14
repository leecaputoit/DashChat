import { Storage, DataStore } from 'aws-amplify'
import { User } from '../models'


export const uploadToStorage =  async (imageUri, imageName, ownerId) => {

    if(!imageName){
        imageName = (Math.random()*1000) + '-' + (Math.random()*10000) + ".jpeg";
    }
    try{
        const response = await fetch(imageUri);
        const blob = await response.blob();
        let objectKey =await Storage.put(imageName, blob, {
            contentType: 'image/jepg',
            level:'protected'

        });
        
        let exist = await DataStore.query(User, u => u.userId("eq", ownerId));
        if(exist.length > 0){
            await DataStore.save(
                User.copyOf(exist[0], updated => {
                    updated.profileImageKey = objectKey.key;
                })
            );
        }else{
            await DataStore.save(
                new User({
                    userId: ownerId,
                    profileImageKey: objectKey.key
                })
             );
        }


    }catch(err){
        console.log(err);
    }
};

export const readFromStorage = async  ownerId => {
    try{
        const user = await DataStore.query(User, u => u.userId("eq", ownerId));
        
        const objectKey = user[0].profileImageKey;
    
        const result = await Storage.get(objectKey,{level: 'protected'});
        
        return result;
    }catch(err){
        console.log(err);
    }
};