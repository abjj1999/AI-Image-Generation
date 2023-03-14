import {surpriseMePrompts} from '../constants'

export function getRandomPrompt(p){

    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    // return surpriseMePrompts[randomIndex];

    const randomPrompt = surpriseMePrompts[randomIndex];
    if(randomPrompt === p){
        return getRandomPrompt(p);
    }
    return randomPrompt;

}