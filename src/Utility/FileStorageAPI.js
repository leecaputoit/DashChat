import { Storage, API, graphqlOperation } from 'aws-amplify'
import { updateUser } from '../graphql/mutations'


export const uploadToStorage =  async (uri, type, user) => {
    let updatedUserObject;

    switch(type){
        case 'PROFILE_IMAGE':
            updatedUserObject = await handleProfileImage(uri, user);
            break;
        default:
            updatedUserObject = await handleDocuments(uri, type, user);
    }
  
    return updatedUserObject;
};

export const readFromStorage = async  (type, user) => { 
    let key;

    switch(type){
        case 'PROFILE_IMAGE':
            key = user.profileImageKey;
            break;
        default:
            key = retrieveKey(user.documents, type);
    }

    try {
        if(key.length > 0){
            const uriToFile = await Storage.get(key, {level: 'protected'});
            return uriToFile;
        }else{
            return '';
        }
    } catch (error) {
        console.log("error retrieving file" + error);
    }
};


const handleProfileImage = async (uri,user) => {
   let imageName = (Math.random()*1000) + '-' + (Math.random()*10000) + ".jpeg";

   try {
       const response = await fetch(uri);
       const blob = await response.blob();
       let objectKey = await Storage.put(imageName, blob, {
           contentType: 'image/jpeg',
           level:'protected'
       });

       let input = {
               ...user,
               profileImageKey: objectKey.key
           };    

        await API.graphql(graphqlOperation(updateUser, {input: input}));

        return input;
   } catch (error) {
        console.log("error uploading profile image: " + error);
   }
}

const handleDocuments = async (uri, type, user) => {
    let fileName = type + "." + uri.split('.').slice(-1)[0];

    try{
        const response = await fetch(uri);
        const blob = await response.blob();
        let objectKey = await Storage.put(fileName, blob, {
            level: 'protected'
        });

        //remove duplicates in user object since only one instance of the specified file is stored on S3
        user.documents = user.documents.filter( docString => {
            return docString.split('^')[0] !== type;
        });

        let input = {
            ...user,
            documents: [...user.documents, type+'^'+objectKey.key]
        };    

        await API.graphql(graphqlOperation(updateUser, {input: input}));

        return input;
    }catch(error){
        console.log("error uploading document: " + error)
    }
}

const retrieveKey = async (keyArray, type) => {
    let key;

    keyArray.forEach(element => {
        if(element.split('^')[0] === type){
            key = element.split('^')[1];
        }
    });

    return key;
}