import { Storage } from 'aws-amplify'


export const uploadToStorage =  async (imageUri, imageName) => {

    if(!imageName){
        imageName = (Math.random()*1000) + '-' + (Math.random()*10000) + ".jpeg";
    }
    try{
        const response = await fetch(imageUri);
        const blob = await response.blob();
        Storage.put(imageName, blob, {
            contentType: 'image/jepg',
            level:'protected'
        });
    }catch(err){
        console.log(err);
    }
};