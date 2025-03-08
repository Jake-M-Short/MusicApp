import {collection, addDoc, getDocs, getFirestore} from "firebase/firestore";

export async function addSong(name, artist, id) {
    try {
        const db = getFirestore();


        const docRef = await addDoc(collection(db, "playlist"), {
            id,
            name,
            artist,
        });

        return docRef;
    } catch (error) {
        console.error(error);
    }
}
export async function getPlaylist() {
    try {
        const db = getFirestore();

        const snapshot = await getDocs(collection(db, "playlist"));

        const playlistSongs = snapshot.docs.map(docRef => ({
            id: docRef.id,
            ...docRef.data()
        }));

        console.log({
            snapshot,
            songs: playlistSongs
        });

        return playlistSongs;
    } catch (e) {
        console.error("Error obtaining the playlist:", e);
    }
}