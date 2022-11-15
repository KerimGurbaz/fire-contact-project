import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import firebase from './firebase'


export const AddUser= (info)=>{
    const db = getDatabase(firebase);
    const userRef = ref(db , 'users/')
    const newUserRef = push(userRef);

    set(newUserRef,{
        username:info.username,
        phoneNumber : info.phoneNumber,
        gender:info.gender
    })
}


// Bilgi cagirma

export const useFetch = ()=>{
    const [isLoading, setisLoading] = useState();
    const [contactList, setContactList] = useState()

    useEffect(() =>{
        const db = getDatabase(firebase);
        const userRef = ref(db , 'users/');
        onValue(userRef,(snapshot)=>{
            const data = snapshot.val();
            const userArray=[]

            for (let id in data){
                userArray.push(id,...data[id])
                setContactList(userArray);
                setisLoading(false)
            }
        })
        return {isLoading,contactList};
    },[])


}