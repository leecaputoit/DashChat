import { Storage, API, graphqlOperation } from 'aws-amplify'
import { updateUser } from '../graphql/mutations'


export const uploadFileToStorage =  async (uri, name, user, fileExtension) => {
    let updatedUserObject;
    let fileName;

    if(fileExtension){
        fileName = name + '.' + fileExtension;
    }else{
       fileName =  name + '.' + uri.split('.').pop();
    }
    
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        let objectKey = await Storage.put(fileName, blob, {
            level:'protected'
        });

        let updateObject = { id: user.id };
        let update = {
            name, 
            resourceKey: objectKey.key
        };

        if(user.store){
            updateObject.store = [ ...user.store.filter(item => item.name !== name), update];
        }else {
            updateObject.store = [ update ];
        }
        
         await API.graphql(graphqlOperation(updateUser, {input: updateObject}));

         updatedUserObject = {
             ...user,
             store: updateObject.store
         };
    } catch (error) {
         console.log("error uploading file: " + JSON.stringify(error));
    }
  
    return updatedUserObject;
};

export const retrieveFileURI = async  (name, user) => { 
    let key;
    if(user.store){
        key = user.store.find(item => item.name === name).resourceKey;
    }
             
    try {
        if(key && key.length > 0){
            const uriToFile = await Storage.get(key, {level: 'protected'});
            return uriToFile;
        }else{
            return '';
        }
    } catch (error) {
        console.log("error retrieving file URI" + error);
    }
};


