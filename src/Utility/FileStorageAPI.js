import { Storage, API, graphqlOperation } from 'aws-amplify'
import { getUser } from '../graphql/queries'
import { createUser, updateUser, deleteUser } from '../graphql/mutations'


//currently profile image specific
export const uploadToStorage =  async (imageUri, imageName, user) => {

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
        
        
       
        if(user){
           let input = {
             ...user,
             profileImageKey: objectKey.key
           };
           
        //    await API.graphql(graphqlOperation(deleteUser , {input:{id:user.id}})); 
        //    await API.graphql(graphqlOperation(createUser, {input: input }))
       const result =  await API.graphql(graphqlOperation(updateUser, {input: input}));
       console.log(result);
        
        return input;
            
        }
    }catch(err){
        console.log(err);
    }
};

export const readFromStorage = async  user => {
    try{
        
        if(user.profileImageKey.length > 0 ){
            const objectKey = user.profileImageKey;
    
            const result = await Storage.get(objectKey,{level: 'protected'});
            
            return result;
        }else{
            return '';
        }
        
    }catch(err){
        console.log(err);
    }
};