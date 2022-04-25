function getDateFromText(string){
    let array = string.match(/[\d\d][./][\d\d][./]\d\d\d\d/g);
    return (array !== null) ? array[0]+","+array[array.length-1] : "";
}

export default getDateFromText;