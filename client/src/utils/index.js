import {surpriseMePrompts} from '../constants'
import FileSaver from 'file-saver'
export function getRandomPrompt(p){

    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    // return surpriseMePrompts[randomIndex];

    const randomPrompt = surpriseMePrompts[randomIndex];
    if(randomPrompt === p){
        return getRandomPrompt(p);
    }
    return randomPrompt;

}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}